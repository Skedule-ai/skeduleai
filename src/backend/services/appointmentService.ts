import { User, currentUser } from '@clerk/nextjs/server';
import { object, string } from 'yup';
import { nanoid } from 'nanoid';
import { Prisma } from '@prisma/client';

import {
    createAppoinmentRepository,
    findBookingDetails,
    findAppointmentsRepositoryByServiceId,
    updateBookingStatusRepo,
} from '@/backend/repositories/appointmentRepository';

import { AppointmentStatus } from '../utils/enum';
import { formatTime } from '@/libs/utils/datetime-helpers';
import { findBookingServiceRepoByUser } from '../repositories/bookingServiceRepository';

import { getClerkClient } from '../utils/clerkClient';
import { ErrorMessages } from '@/libs/message/error';

const validateAppointmentBooking = object({
    timezone: string().required(ErrorMessages.REQUIRED_INPUT),
    startTime: string().required(ErrorMessages.REQUIRED_INPUT),
    endTime: string().required(ErrorMessages.REQUIRED_INPUT),
    name: string(),
    email: string(),
    phoneNumber: string(),
});

const validateGuestUserData = object({
    name: string().required(ErrorMessages.REQUIRED_INPUT),
    email: string().email().required(ErrorMessages.REQUIRED_INPUT),
    phoneNumber: string().required(ErrorMessages.REQUIRED_INPUT),
});

export type CreateAppointmentInputDataType = Pick<
    Prisma.bookingDetailsCreateInput,
    'startTime' | 'endTime'
> &
    Pick<Prisma.guestUserCreateInput, 'name' | 'email' | 'phoneNumber'>;

export async function createAppointmentService(
    serviceId: string,
    data: CreateAppointmentInputDataType,
) {
    try {
        // Step 1: Validate input data
        const validatedData = await validateAppointmentBooking.validate(data);
        const { name, email, phoneNumber, ...appointmentData } = validatedData;

        // Step 2: Check if user is logged in.
        let user: User | null | undefined = await currentUser();
        const client = getClerkClient();

        // Step 3: If not a logged in user, Make basic info of user required.
        if (!user) {
            await validateGuestUserData.validate(validatedData);
        }

        // Step 4: Check if given basic info is part of our users list.
        if (!user && email && phoneNumber) {
            const userList = await client.users.getUserList({
                emailAddress: [email],
                phoneNumber: [phoneNumber],
            });

            user = userList.data.find((data, inx) => inx === 0);
        }

        // Step 5: Generate booking details.
        const bookingDetails: Prisma.bookingDetailsCreateInput = {
            id: nanoid(8),
            customerId: user?.id ?? '',
            startTime: appointmentData.startTime,
            endTime: appointmentData.endTime,
            timezone: appointmentData.timezone,
            status: AppointmentStatus.PENDING,
        };

        // Step 6: If user record is not found, Register as guest user.
        if (!user && name && email && phoneNumber) {
            bookingDetails.guest = {
                connectOrCreate: {
                    where: {
                        email_phoneNumber: {
                            email,
                            phoneNumber,
                        },
                    },
                    create: {
                        name,
                        email,
                        phoneNumber,
                    },
                },
            };
        }

        // Step 7: Validate if booking service for given serviceid
        if (serviceId) {
            bookingDetails.service = {
                connect: {
                    id: serviceId,
                },
            };
        }

        // Step 8: Add booking details to DB
        const appointment = await createAppoinmentRepository(bookingDetails);

        // Step 9: return booking details
        return { appointment };
    } catch (err) {
        console.log(err);
        if (err instanceof Error) {
            throw new Error(err.message);
        }
    }
}

export async function getAppointmentsService(organizationId: string | null = '') {
    try {
        // Step 1: Check if user is logged in.
        const user = await currentUser();
        if (!user?.id) {
            throw new Error(ErrorMessages.UNAUTHORIZED);
        }

        // Step 2: Get user bookin service data for service id
        const bookingService = await findBookingServiceRepoByUser(user.id, organizationId ?? '');
        if (!bookingService) {
            return { appointments: [] };
        }

        // Step 3: Fetch user appointments
        const appointmentList = await findAppointmentsRepositoryByServiceId(bookingService.id);

        // Step 4: format appointment and return it
        const formattedAppointments = appointmentList.map((data) => {
            return {
                id: data.id,
                startTime: formatTime(data.startTime.toISOString()),
                endTime: formatTime(data.endTime.toISOString()),
            };
        });

        return { appointments: formattedAppointments };
    } catch (error) {
        console.error('Error finding appointment:', error);
        throw error;
    }
}

export async function updateAppointmentStatusService(
    bookingId: string,
    accepted: boolean,
    organizationId = '',
) {
    try {
        // Step 1: Check if user is logged in.
        const user = await currentUser();
        if (!user?.id) {
            throw new Error(ErrorMessages.UNAUTHORIZED);
        }

        // Step 2: Get user booking service details.
        const bookingService = await findBookingServiceRepoByUser(user.id, organizationId);
        if (!bookingService?.id) {
            throw new Error(ErrorMessages.BOOKING_DETAILS_NOT_FOUND);
        }

        // Step 3: Get booking details for given booking id.
        const bookingDetails = await findBookingDetails(bookingId, bookingService.id);
        if (!bookingDetails) {
            throw new Error(ErrorMessages.BOOKING_DETAILS_NOT_FOUND);
        }

        // Step 4: Get booking details accept status.
        const acceptStatus = accepted ? AppointmentStatus.ACCEPTED : AppointmentStatus.REJECT;
        if (bookingDetails.status === acceptStatus) {
            return { bookingDetails };
        }

        // Step 5: Update booking details
        const updatedBookingDetails = await updateBookingStatusRepo(bookingId, acceptStatus);

        // Step 6: ToDo: Send email notification.

        // Step 7: Return formatted booking detials.
        return { bookingDetails: updatedBookingDetails };
    } catch (error) {
        console.error('updateAppointmentStatusService', error);
        if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
}
