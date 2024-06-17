<<<<<<< Updated upstream
<<<<<<< Updated upstream
import { User, currentUser } from '@clerk/nextjs/server';
import { Prisma } from '@prisma/client';
import { nanoid } from 'nanoid';
import { object, string } from 'yup';

import {
    createAppoinmentRepository
} from '@/backend/repositories/appointmentRepository';

import {
    findAppointmentsRepositoryByServiceId,
    findBookingDetails,
    updateBookingStatusRepo,
} from '@/backend/repositories/appointmentRepository';

import { formatTime } from '@/libs/utils/datetime-helpers';
import { findBookingServiceRepoByUser } from '../repositories/bookingServiceRepository';
import { AppointmentStatus } from '../utils/enum';

import { ErrorMessages } from '@/libs/message/error';
import { getClerkClient } from '../utils/clerkClient';

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
=======
import {
    createAppoinmentRepository,
    findBookingDetails,
    updateBookingStatusRepo,
} from '@/backend/repositories/appointmentRepository';
import { formatDate, formatTime } from '@/libs/utils/datetime-helpers';
import { User, currentUser } from '@clerk/nextjs/server';
import { nanoid } from 'nanoid';
import { AppointmentDTO } from '../interfaces/appointmentDTO';
import { BookingDetailsDTO } from '../interfaces/bookingServiceDTO';
import { GuestUserDTO } from '../interfaces/guestUserDTO';

=======
import {
    createAppoinmentRepository,
    findBookingDetails,
    updateBookingStatusRepo,
} from '@/backend/repositories/appointmentRepository';
import { formatDate, formatTime } from '@/libs/utils/datetime-helpers';
import { User, currentUser } from '@clerk/nextjs/server';
import { nanoid } from 'nanoid';
import { AppointmentDTO } from '../interfaces/appointmentDTO';
import { BookingDetailsDTO } from '../interfaces/bookingServiceDTO';
import { GuestUserDTO } from '../interfaces/guestUserDTO';

>>>>>>> Stashed changes
import { createGuestUserRepository } from '../repositories/guestUserRepository';
import { getClerkClient } from '../utils/clerkClient';
import { AppointmentStatus } from '../utils/enum';
export async function createAppointmentService(data: AppointmentDTO) {
>>>>>>> Stashed changes
    try {
        // Step 1: Validate input data
        const validatedData = await validateAppointmentBooking.validate(data);
        const { name, email, phoneNumber, ...appointmentData } = validatedData;

        // Step 2: Check if user is logged in.
        const { name, email, phoneNumber, ...appointmentData } = data;
        // Step 1: Check if user is logged in.
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

<<<<<<< Updated upstream
<<<<<<< Updated upstream
export async function getAppointmentsService(organizationId: string | null = '') {
export async function getAppointmentService() {
    try {
        // Step 1: Check if user is logged in.
        const user = await currentUser();
        if (user?.id) {
            const bookingService = await findBookingServiceRepoByUser(user.id);
            if (bookingService) {
                const getAppointment = await findAllAppointmentRepositoryByServiceId({
                    serviceId: bookingService.id,
                });
                const formattedAppointments = getAppointment.map((data, inx) => {
                    return {
                        id: data.id,
                        startTime: formatTime(data.time.toISOString()),
                        endTime: addDuration(data.time.toISOString(), data.duration.toISOString()),
                    };
                });
                return { formattedAppointments, title: 'Appointment' };
            }
            return { getAppointment: [] };
        } else {
            throw new Error('User not found or missing ID');
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

<<<<<<< Updated upstream
export async function updateAppointmentStatusService(
    bookingId: string,
    accepted: boolean,
    organizationId = '',
) {
=======
export async function updateAppointmentStatusService(id: string, accepted: boolean) {
>>>>>>> Stashed changes
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
=======
=======
>>>>>>> Stashed changes
export async function updateAppointmentStatusService(id: string, accepted: boolean) {
    try {
        const bookingDetails = await findBookingDetails(id);
        if (!bookingDetails) {
            throw new Error('Invalid update.');
        }

        const updatedBookingDetails = await updateBookingStatusRepo(
            id,
            accepted ? AppointmentStatus.ACCEPTED : AppointmentStatus.REJECT,
        );

        return { bookingDetails: updatedBookingDetails };
    } catch (error) {
        console.error('Error updating booking status:', error);
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
        if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
}
