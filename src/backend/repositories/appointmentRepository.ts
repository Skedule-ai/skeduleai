import { prisma } from '@/backend/utils/db';
import { Prisma } from '@prisma/client';
import { BookingDetailsDTO } from '../interfaces/bookingServiceDTO';
import { AppointmentStatus } from '../utils/enum';

export async function createAppoinmentRepository(data: Prisma.bookingDetailsCreateInput) {
    return await prisma.bookingDetails.create({ data });
}

<<<<<<< Updated upstream
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
export async function findAppointmentRepository(filter: Pick<BookingDetailsDTO, 'id'>) {
    return await prisma.bookingDetails.findFirst({ where: filter });
}

export async function findAllAppointmentRepositoryByServiceId(
    filter: Pick<BookingDetailsDTO, 'serviceId'>,
) {
    return await prisma.bookingDetails.findMany({ where: filter });
}

export async function findBookingDetails(id: string, serviceId: string) {
    // Find the booking service
    return await prisma.bookingDetails.findFirst({
        where: { id, serviceId },
=======
>>>>>>> Stashed changes
export async function findBookingDetails(id: string) {
    // Find the booking service
    return await prisma.bookingDetails.findFirst({
        where: { id, status: AppointmentStatus.PENDING },
    });
}

export async function updateBookingStatusRepo(id: string, status: AppointmentStatus) {
    // Find the booking service
    return await prisma.bookingDetails.update({
        where: { id },
        data: { status }, // Include related bookingDetails
    });
}
