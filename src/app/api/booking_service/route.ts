import {
    createBookingServiceController,
    findBookingServiceController,
} from '@/backend/controllers/bookingServiceController';
import { FindBookingServiceDataType } from '@/backend/services/bookingService';
import { NextResponse } from 'next/server';

export const POST = async (request: Request) => {
    try {
        const data = await request.json();
        const bookingService = await createBookingServiceController(data);
        return NextResponse.json(bookingService, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
};

export const GET = async (request: Request, { params }: { params: FindBookingServiceDataType }) => {
    try {
        console.log('Request');
        const bookingService = await findBookingServiceController(params);
        return NextResponse.json(bookingService, { status: 201 });
    } catch (error: any) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
};
