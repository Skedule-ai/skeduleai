import { prisma } from '@/backend/utils/db';
import { BookingDetailsDTO } from '../interfaces/bookingServiceDTO';

export async function createAppoinmentRepository(data: BookingDetailsDTO) {
    return await prisma.bookingDetails.create({ data });
}

export async function findAppointmentRepository(filter: Pick<BookingDetailsDTO, 'id'>,) {
    return await prisma.bookingDetails.findFirst({ where: filter }); 
}

