import { prisma } from '@/backend/utils/db';
import { Prisma } from '@prisma/client';
import moment from 'moment';
import { AppointmentStatus } from '../utils/enum';

export async function createAppoinmentRepository(data: Prisma.bookingDetailsCreateInput) {
    return await prisma.bookingDetails.create({ data });
}

export async function findAppointmentRepository(
    filter: Pick<Prisma.bookingDetailsCreateInput, 'id'>,
) {
    return await prisma.bookingDetails.findFirst({ where: filter });
}

export async function findAppointmentsRepositoryByServiceId(
    serviceId: string,
    startOfDay?: Date | string,
    endOfDay?: Date | string,
) {
    // if (startTime && typeof startTime === 'string') {
    //     const dateRegex = /^[0-9]{2}-[0-9]{2}-[0-9]{4}$/;
    //     if (!dateRegex.test(startTime)) {
    //         throw new Error('Invalid date format. Use DD-MM-YYYY.');
    //     }
    //     startTime = new Date(startTime.replace(/-/g, '/')); // Convert DD-MM-YYYY to Date object
    // }

    // if (startTime instanceof Date === false && startTime !== undefined) {
    //     throw new Error('Invalid startTime format. Expected string or Date.');
    // }
    let startDate: string | undefined = undefined;
    let endDate: string | undefined = undefined;

    if (startOfDay) {
        if (typeof startOfDay === 'string') {
            startDate = moment(startOfDay, 'DD-MM-YYYY').startOf('day').toISOString();
        } else {
            startDate = moment(startOfDay).startOf('day').toISOString();
        }
    }
    if (endOfDay) {
        if (typeof endOfDay === 'string') {
            endDate = moment(endOfDay, 'DD-MM-YYYY').endOf('day').toISOString();
        } else {
            endDate = moment(endOfDay).endOf('day').toISOString();
        }
    }

    console.log('Start Date:', startDate);
    console.log('End Date:', endDate);

    return await prisma.bookingDetails.findMany({
        where: {
            // AND: [
            //     { serviceId },
            //     { startTime: { lte: startDate?.toISOString() } },
            //     { endTime: { lte: endDate?.toISOString() } },
            // ],
            serviceId,
            startTime: {
                gte: startDate,
                lte: endDate,
            },
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
