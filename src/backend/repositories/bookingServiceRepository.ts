import { prisma } from '@/backend/utils/db';
import { BookingServiceDTO } from '../interfaces/bookingServiceDTO';

export async function createBookingServiceRepo(data: BookingServiceDTO) {
    return await prisma.bookingService.create({ data });
}

export async function findBookingServiceRepo(id: string) {
    return await prisma.bookingService.findFirst({ where: { id } });
}
