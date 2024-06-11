import { createAppoinmentRepository } from '@/backend/repositories/appointmentRepository';
import { AppointmentDTO } from '../interfaces/appointmentDTO';
import { getClerkClient } from '../utils/clerkClient';
import { BookingDetailsDTO } from '../interfaces/bookingServiceDTO';
import { nanoid } from 'nanoid';
import { AppointmentStatus } from '../utils/enum';

export async function createAppointmentService(data: AppointmentDTO) {
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




