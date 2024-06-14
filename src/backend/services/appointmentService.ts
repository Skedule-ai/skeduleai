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
import { createGuestUserRepository } from '../repositories/guestUserRepository';
import { getClerkClient } from '../utils/clerkClient';
import { AppointmentStatus } from '../utils/enum';

export async function createAppointmentService(data: AppointmentDTO) {
    try {
        const { name, email, phoneNumber, ...appointmentData } = data;
        // Step 1: Check if user is logged in.
        let user: User | null | undefined = await currentUser();
        const client = getClerkClient();

        // Step 2: If not a logged in user, Make basic info of user required.
        if (!user && (!name || !email || !phoneNumber)) {
            throw new Error('Missing required fields');
        }

        // Step 3: Check if given basic info is part of our users list.
        if (!user) {
            const userList = await client.users.getUserList({
                emailAddress: [email],
                phoneNumber: [phoneNumber],
            });

            user = userList.data.find((data, inx) => inx === 0);
        }

        // Step 4: If user record is not found, Register as guest user.
        let guest: GuestUserDTO | undefined;
        if (!user) {
            guest = await createGuestUserRepository({
                name,
                email,
                phoneNumber,
            });
        }

        // Step 5: Generate booking details.
        const bookingDetails: BookingDetailsDTO = {
            id: nanoid(8),
            customerId: user?.id ?? '',
            guestUserId: guest?.id ?? null,
            serviceId: appointmentData.serviceId,
            date: formatDate(appointmentData.date),
            time: formatTime(appointmentData.time),
            duration: formatTime('00:30'), // ToDo: To be fixed once availability API configuration is fixed
            status: AppointmentStatus.PENDING,
        };

        // Step 5: Add booking details to DB
        const appointment = await createAppoinmentRepository(bookingDetails);

        // Step 5: return booking details
        return { appointment };
    } catch (err) {
        console.log(err);
        if (err instanceof Error) {
            throw new Error(err.message);
        }
    }
}

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
        if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
}
