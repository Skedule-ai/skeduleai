import { currentUser, User, Organization } from '@clerk/nextjs/server';
import { nanoid } from 'nanoid';

import {
    createBookingServiceRepo,
    findBookingServiceRepo,
    findBookingServiceRepoByUser,
} from '@/backend/repositories/bookingServiceRepository';
import { BookingServiceDTO } from '../interfaces/bookingServiceDTO';
import { getClerkClient as getClient } from '../utils/clerkClient';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { getTimeStops } from '@/libs/utils/datetime-helpers';

const getBookingPageURL = (id: string) => {
    const appUrl = process.env.APP_URL ?? '';
    return appUrl.concat('/booking/', id);
};

const getClerkImagePath = (imageUrl: string = '') => {
    const path = imageUrl.split('https://img.clerk.com').find((path, inx) => inx === 1) ?? '';
    return path;
};

const getFormattedImagePath = (imageUrl: string = '') => {
    const path = getClerkImagePath(imageUrl);
    return imageUrl ? '/profile'.concat(path) : '';
};

const generateBookingServiceResponse = async (
    bookingService: BookingServiceDTO,
    user: User,
    organization?: Organization,
) => {
    const bookingUrl = getBookingPageURL(bookingService.id);
    return {
        bookingUrl,
        serviceProvider: {
            name: user.fullName,
            image: getFormattedImagePath(user.imageUrl),
        },
        organization: {
            name: organization?.name,
            img: getFormattedImagePath(organization?.imageUrl),
        },
    };
};

const getUser = async (id: string) => {
    const client = getClient();
    const user = await client.users.getUser(id);
    return user;
};

const getUserOrganization = async (organizationId: string, userId: string) => {
    const client = getClient();
    const organizationMembers = await client.users.getOrganizationMembershipList({ userId });
    const organizationMembership = organizationMembers.data.find(
        (data) => data.id === organizationId,
    );
    if (!organizationMembership) {
        throw new Error('Invalid organization');
    }
    return organizationMembership.organization;
};

export async function createBookingService(
    data: Partial<Pick<BookingServiceDTO, 'organizationId'>>,
) {
    try {
        const user = await currentUser();

        if (!user?.id) {
            throw new Error('Unauthorized');
        }

        const id = nanoid(12);
        const createBookingServiceInfo = await createBookingServiceRepo({
            id,
            userId: user.id,
            organizationId: data.organizationId ?? '',
        });

        const formatResponse = await generateBookingServiceResponse(createBookingServiceInfo, user);

        return { bookingService: formatResponse };
    } catch (err) {
        console.log('err: ', err);
        if (err instanceof PrismaClientKnownRequestError) {
            if (err.code == 'P2002') {
                return { message: 'Booking URL for user already exists.' };
            }
            console.error(JSON.stringify(err));
            throw new Error(err.message);
        }
    }
}

export async function findBookingService(data: Partial<Pick<BookingServiceDTO, 'organizationId'>>) {
    try {
        const user = await currentUser();

        if (!user?.id) {
            throw new Error('Unauthorized');
        }
        const userBookingServiceInfo = await findBookingServiceRepoByUser(
            user.id,
            data?.organizationId,
        );

        let organization: Organization | undefined;
        if (userBookingServiceInfo) {
            if (userBookingServiceInfo?.organizationId) {
                organization = await getUserOrganization(
                    userBookingServiceInfo.organizationId,
                    user.id,
                );
            }

            const formatResponse = await generateBookingServiceResponse(
                userBookingServiceInfo,
                user,
                organization,
            );
            return { bookingService: formatResponse };
        }
    } catch (err) {
        console.log(err);
        if (err instanceof Error) {
            throw new Error(err.message);
        }
    }
}

export async function findBookingServiceById(id: string) {
    try {
        if (id) {
            const userBookingServiceInfo = await findBookingServiceRepo(id);
            let organization: Organization | undefined;
            if (userBookingServiceInfo) {
                // Step 1: Get user info
                const user = await getUser(userBookingServiceInfo.userId);

                // Step 2: Get organization info
                if (userBookingServiceInfo.organizationId) {
                    organization = await getUserOrganization(
                        userBookingServiceInfo.organizationId,
                        user.id,
                    );
                }

                // Step 3: Get time slots
                // ToDo: To be fixed once availability API configuration is fixed
                const timeSlots = getTimeStops('09:00 AM', '05:00 PM', 30);

                if (user?.id) {
                    const formatResponse = await generateBookingServiceResponse(
                        userBookingServiceInfo,
                        user,
                        organization,
                    );
                    return { bookingService: { ...formatResponse, timeSlots } };
                }
            }
        }
    } catch (err) {
        if (err instanceof Error) {
            throw new Error(err.message);
        }
    }
}
