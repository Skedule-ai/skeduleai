import { prisma } from '@/backend/utils/db';
import { Prisma } from '@prisma/client';
import { AppointmentStatus } from '../utils/enum';

export async function createAppoinmentRepository(data: Prisma.bookingDetailsCreateInput) {
    return await prisma.bookingDetails.create({ data });
}

export async function findAppointmentRepository(
    filter: Pick<Prisma.bookingDetailsCreateInput, 'id'>,
) {
    return await prisma.bookingDetails.findFirst({ where: filter });
}

export async function findAppointmentsRepositoryByServiceId(serviceId: string) {
    return await prisma.bookingDetails.findMany({
        where: {
            serviceId,
        },
    });
}

export async function findBookingDetails(id: string, serviceId: string) {
    // Find the booking service
    return await prisma.bookingDetails.findFirst({
        where: { id, serviceId },
    });
}

export async function updateBookingStatusRepo(id: string, status: AppointmentStatus) {
    // Find the booking service
    return await prisma.bookingDetails.update({
        where: { id },
        data: { status }, // Include related bookingDetails
    });
}
export async function findGuestUserDetails(guestUserId: number) {
    try {
        return await prisma.guestUser.findUnique({
            where: { id: guestUserId },
            select: {
                name: true,
                email: true,
                phoneNumber: true,
            },
        });
    } catch (error) {
        console.error('Error fetching guest user details:', error);
        throw new Error('Failed to fetch guest user details');
    }
}
