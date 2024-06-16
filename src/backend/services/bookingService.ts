import { currentUser, User, Organization } from '@clerk/nextjs/server';
import { nanoid } from 'nanoid';

import {
    createBookingServiceRepo,
    findBookingServiceRepo,
    findBookingServiceRepoByUser,
} from '@/backend/repositories/bookingServiceRepository';
import { getClerkClient as getClient } from '../utils/clerkClient';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { getTimeStops } from '@/libs/utils/datetime-helpers';
import { findAvailabilityConfigurationService } from './availabilityConfigurationService';
import { ErrorMessages } from '@/libs/message/error';
import { Prisma } from '@prisma/client';
// import { availabilityDetailsSchema } from '@/components/organisms/validations/organization-form-validation';

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
    bookingService: Prisma.bookingServiceGetPayload<Prisma.bookingServiceDefaultArgs>,
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

export type CreateBookingServiceDataType = Partial<
    Pick<Prisma.bookingServiceCreateInput, 'organizationId'>
>;
export async function createBookingService(data: CreateBookingServiceDataType) {
    try {
        // Step 1: Validate if user is authenticated
        const user = await currentUser();
        if (!user?.id) {
            throw new Error(ErrorMessages.UNAUTHORIZED);
        }

        // Step 2: Generate unique booking id
        const id = nanoid(12);

        // Step 3: Add booking id to booking service table.
        const createBookingServiceInfo = await createBookingServiceRepo({
            id,
            userId: user.id,
            organizationId: data.organizationId ?? '',
        });

        // Step 4: Format and generate booking service data.
        const formatResponse = await generateBookingServiceResponse(createBookingServiceInfo, user);

        return { bookingService: formatResponse };
    } catch (err) {
        console.log('createBookingService: ', err);
        if (err instanceof PrismaClientKnownRequestError) {
            if (err.code == 'P2002') {
                return { message: ErrorMessages.BOOKING_CREATE_ERROR };
            }
            console.error(JSON.stringify(err));
            throw new Error(err.message);
        }
    }
}

export type FindBookingServiceDataType = Partial<
    Pick<Prisma.bookingServiceCreateInput, 'organizationId'>
>;
export async function findBookingService(data: FindBookingServiceDataType) {
    try {
        // Step 1: Validate if user is authenticated
        const user = await currentUser();
        if (!user?.id) {
            throw new Error('Unauthorized');
        }

        // Step 2: Get booking service details for given user and organization
        const userBookingServiceInfo = await findBookingServiceRepoByUser(
            user.id,
            data?.organizationId,
        );

        // Step 3: Validate and fetch user organization details if exists
        let organization: Organization | undefined;
        if (userBookingServiceInfo?.organizationId) {
            organization = await getUserOrganization(
                userBookingServiceInfo.organizationId,
                user.id,
            );
        }

        // Step 4: Format and return the booking service data.
        if (userBookingServiceInfo) {
            const formatResponse = await generateBookingServiceResponse(
                userBookingServiceInfo,
                user,
                organization,
            );
            return { bookingService: formatResponse };
        }
    } catch (err) {
        console.log('findBookingService: ', err);
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
                const availabilityConfigurations = await findAvailabilityConfigurationService();
                const today = new Date();
                const availabilityConfiguration = availabilityConfigurations.find(
                    (data) => data.day === today.getDay() + 1,
                );

                // const timeSlots = getTimeStops(
                //     data?.availabilityConfiguration?.startTime,
                //     data?.availabilityConfiguration?.endTime,
                //     data?.availabilityConfiguration?.duration,
                // );

                const timeSlots = getTimeStops(
                    String(availabilityConfiguration?.startTime),
                    String(availabilityConfiguration?.endTime),
                    Number(availabilityConfiguration?.duration),
                );

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
        console.log('findBookingServiceById: ', err);
        if (err instanceof Error) {
            throw new Error(err.message);
        }
    }
}
