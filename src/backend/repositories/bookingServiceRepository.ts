import { BookingServiceDTO } from '@/backend/interfaces/bookingServiceDTO';
import { prisma } from '@/backend/utils/db';

export async function createBookingServiceRepo(data: BookingServiceDTO) {
    return await prisma.bookingService.create({ data });
}

export async function findBookingServiceRepo(id: string) {
    return await prisma.bookingService.findFirst({ where: { id } });
}

export async function findBookingServiceRepoByUser(userId: string, organizationId?: string) {
    return await prisma.bookingService.findFirst({ where: { userId, organizationId } });
}
