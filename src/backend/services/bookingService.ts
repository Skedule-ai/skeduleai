import {
    createBookingServiceRepo,
    findBookingServiceRepo,
    findBookingServiceRepoByUser,
} from '@/backend/repositories/bookingServiceRepository';
import { ErrorMessages } from '@/libs/message/error';
import { DAYS_LIST, getTimeStops } from '@/libs/utils/datetime-helpers';
import { Organization, User, currentUser } from '@clerk/nextjs/server';
import { Prisma } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { nanoid } from 'nanoid';
import { findAllAvailabilityConfigurationRepository } from '../repositories/availabilityConfigurationRepository';
import { getFormattedImagePath, getUser, getUserOrganization } from './clerkService';
// import { availabilityDetailsSchema } from '@/components/organisms/validations/organization-form-validation';

const getBookingPageURL = (id: string) => {
    const appUrl = process.env.APP_URL ?? '';
    return appUrl.concat('/booking/', id);
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
            image: getFormattedImagePath(organization?.imageUrl),
        },
    };
};

// Define the type for the create booking service data
export type CreateBookingServiceDataType = Partial<
    Pick<Prisma.bookingServiceCreateInput, 'organizationId'> & {
        date: string;
        startTime: string;
        endTime: string;
    }
>;

// export type CreateBookingServiceDataType = Partial<
//     Pick<Prisma.bookingServiceCreateInput, 'organizationId'| 'date' | 'startTime' | 'endTime'>
// >;
export async function createBookingService(data: CreateBookingServiceDataType) {
    try {
        // Step 1: Validate if user is authenticated
        const user = await currentUser();
        if (!user?.id) {
            throw new Error(ErrorMessages.UNAUTHORIZED);
        }

        // Validate date and time
        // const { date, startTime, endTime } = data;
        // if (!date || !startTime || !endTime) {
        //     throw new Error(ErrorMessages.REQUIRED_INPUT);
        // }

        // const selectedDate = new Date(date);
        // const today = new Date();
        // if (selectedDate < today) {
        //     throw new Error(ErrorMessages.INVALID_DATE);
        // }

        // if (startTime >= endTime) {
        //     throw new Error(ErrorMessages.INVALID_TIME);
        // }

        // Step 2: Generate unique booking id
        const id = nanoid(12);

        // Step 3: Add booking id to booking service table.
        const createBookingServiceInfo = await createBookingServiceRepo({
            id,
            userId: user.id,
            organizationId: data.organizationId ?? '',
            // startTime,
            // endTime,
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
        } else if (err instanceof Error) {
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

export async function findBookingServiceById(bookingServiceId: string) {
    try {
        // Step 1: Check for booking service id input
        if (!bookingServiceId) {
            throw new Error(ErrorMessages.REQUIRED_INPUT);
        }

        // Step 2: Get booking service data
        const userBookingServiceInfo = await findBookingServiceRepo(bookingServiceId);
        if (!userBookingServiceInfo?.id) {
            throw new Error(ErrorMessages.INVALID_BOOKING_URL);
        }

        // To Validate that the booking is not in the past
        const currentDateTime = new Date();
        const bookingStartTime = new Date(userBookingServiceInfo.startTime);
        const bookingEndTime = new Date(userBookingServiceInfo.endTime);

        if (bookingEndTime < currentDateTime) {
            throw new Error(ErrorMessages.INVALID_BOOKING_URL); // Custom error for past bookings
        }

        // Step 3: Get organization info if organization id is present
        let organization: Organization | undefined;
        if (userBookingServiceInfo.organizationId) {
            organization = await getUserOrganization(
                userBookingServiceInfo.organizationId,
                userBookingServiceInfo.id,
            );
        }

        // Step 4: Get user info
        const user = await getUser(userBookingServiceInfo.userId);

        // Step 5: Get time slots
        const availabilityConfigurations = await findAllAvailabilityConfigurationRepository(
            userBookingServiceInfo.userId,
            userBookingServiceInfo.organizationId,
        );
        if (!availabilityConfigurations?.length) {
            throw new Error(ErrorMessages.MISSING_AVAILABILITY_CONFIGURATION);
        }

        const timeSlots: {
            day: number;
            slots: {
                startTime: string;
                endTime: string;
            }[];
        }[] = [];

        const availabilityConfigMap = new Map();
        availabilityConfigurations.forEach((data) => availabilityConfigMap.set(data.day, data));

        DAYS_LIST.forEach((day) => {
            const availabilityConfiguration = availabilityConfigMap.get(day);
            if (availabilityConfiguration) {
                timeSlots.push({
                    day: availabilityConfiguration.day,
                    slots: getTimeStops(
                        availabilityConfiguration.startTime.toISOString() ?? '',
                        availabilityConfiguration.endTime.toISOString() ?? '',
                        availabilityConfiguration.duration ?? 0,
                    ),
                });
            } else {
                timeSlots.push({ day, slots: [] });
            }
        });

        if (user?.id) {
            const formatResponse = await generateBookingServiceResponse(
                userBookingServiceInfo,
                user,
                organization,
            );
            return { bookingService: { ...formatResponse, timeSlots } };
        }
    } catch (err) {
        console.log('findBookingServiceById: ', err);
        if (err instanceof Error) {
            throw new Error(err.message);
        }
    }
}
