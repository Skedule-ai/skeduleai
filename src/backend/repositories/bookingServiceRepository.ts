import { prisma } from '@/backend/utils/db';
import { Prisma } from '@prisma/client';

export async function createBookingServiceRepo(data: Prisma.bookingServiceCreateInput) {
    const createdData = await prisma.bookingService.create({ data });
    return createdData;
}

export async function findBookingServiceRepo(id: string) {
    return await prisma.bookingService.findFirst({ where: { id } });
}

export async function findBookingServiceRepoByUser(userId: string, organizationId?: string) {
    console.log(userId, organizationId);
    return await prisma.bookingService.findFirst({ where: { userId, organizationId } });
}
