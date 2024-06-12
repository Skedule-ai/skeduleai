import { createAppoinmentRepository } from '@/backend/repositories/appointmentRepository';
import { AppointmentDTO } from '../interfaces/appointmentDTO';
import { getClerkClient } from '../utils/clerkClient';
import { BookingDetailsDTO } from '../interfaces/bookingServiceDTO';
import { nanoid } from 'nanoid';
import { AppointmentStatus } from '../utils/enum';
import { formatDate, formatTime } from '@/libs/utils/datetime-helpers';
import { createGuestUserRepository } from '../repositories/guestUserRepository';
import { GuestUserDTO } from '../interfaces/guestUserDTO';

export async function createAppointmentService(data: AppointmentDTO) {
    try {
        const { name, email, phoneNumber, ...appointmentData } = data;
        const client = getClerkClient();
        if (!name || !email || !phoneNumber) {
            throw new Error('Missing required fields');
        }

        const userList = await client.users.getUserList({
            emailAddress: [email],
            phoneNumber: [phoneNumber],
        });

        const user = userList.data.find((data, inx) => inx === 0);
        let guest: GuestUserDTO | undefined;
        if (!user) {
            guest = await createGuestUserRepository({
                name,
                email,
                phoneNumber,
            });
        }

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

        const appointment = await createAppoinmentRepository(bookingDetails);
        return { appointment };
    } catch (err) {
        console.log(err);
        if (err instanceof Error) {
            throw new Error(err.message);
        }
    }
}


export async function findAppointmentService(data: AppointmentDTO) {
    const { name, email, phoneNumber, ...appointmentData } = data;
    const client = getClerkClient();
    if (!name || !email || !phoneNumber) {
        throw new Error('Missing required fields');
    }

    const user = await client.users.createUser({
        firstName: name,
        lastName: '',
        emailAddress: [email],
        phoneNumber: [phoneNumber],
    });

    if (user) {
        const bookingDetails: BookingDetailsDTO = {
            id: nanoid(8),
            customerId: user.id,
            serviceId: appointmentData.serviceId,
            date: appointmentData.date,
            duration: appointmentData.time,
            status: AppointmentStatus.PENDING,
        };

        const appointment = await createAppoinmentRepository(bookingDetails);
        return { appointment };
    }
}




