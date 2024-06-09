import { currentUser, User, Organization } from '@clerk/nextjs/server';
import { nanoid } from 'nanoid';

import {
    createBookingServiceRepo,
    findBookingServiceRepo,
} from '@/backend/repositories/bookingServiceRepository';
import { BookingServiceDTO } from '../interfaces/bookingServiceDTO';
import { getClerkClient as getClient } from '../utils/clerkClient';

const getBookingPageURL = (id: string) => {
    const appUrl = process.env.APP_URL ?? '';
    return appUrl.concat('/booking/', id);
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
        },
        organization: {
            name: organization?.name,
            img: organization?.imageUrl,
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
        if (user?.id) {
            const id = nanoid(12);

            const createBookingServiceInfo = await createBookingServiceRepo({
                id,
                userId: user.id,
                organizationId: data.organizationId ?? '',
            });

            const formatResponse = generateBookingServiceResponse(createBookingServiceInfo, user);

            return { bookingService: formatResponse };
        }
    } catch (err) {
        if (err instanceof Error) {
            throw new Error(err.message);
        }
    }
}

export async function findBookingService(data: Partial<Pick<BookingServiceDTO, 'id'>>) {
    try {
        if (data?.id) {
            const userBookingServiceInfo = await findBookingServiceRepo(data.id);
            let user = await currentUser();
            let organization: Organization | undefined;
            if (userBookingServiceInfo) {
                if (!user || user.id !== userBookingServiceInfo.userId) {
                    user = await getUser(userBookingServiceInfo.id);
                    if (userBookingServiceInfo.organizationId) {
                        organization = await getUserOrganization(
                            userBookingServiceInfo.organizationId,
                            user.id,
                        );
                    }
                }

                if (user?.id) {
                    const formatResponse = await generateBookingServiceResponse(
                        userBookingServiceInfo,
                        user,
                        organization,
                    );
                    return { bookingService: formatResponse };
                }
            }
        }
    } catch (err) {
        if (err instanceof Error) {
            throw new Error(err.message);
        }
    }
}
