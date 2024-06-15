import { NextResponse } from 'next/server';
import {
    createBookingServiceController,
    findBookingServiceController,
} from '@/backend/controllers/bookingServiceController';
import { BookingServiceDTO } from '@/backend/interfaces/bookingServiceDTO';

export const POST = async (request: Request) => {
    try {
        const data = await request.json();
        const bookingService = await createBookingServiceController(data);
        return NextResponse.json(bookingService, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
};

export const GET = async (
    request: Request,
    { params }: { params: Partial<Pick<BookingServiceDTO, 'organizationId'>> },
) => {
    try {
        console.log('Request');
        const bookingService = await findBookingServiceController(params);
        return NextResponse.json(bookingService, { status: 201 });
    } catch (error: any) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
};
