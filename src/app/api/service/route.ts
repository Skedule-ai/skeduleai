import { NextResponse } from 'next/server';
import { createBookingServiceController } from '@/backend/controllers/bookingServiceController';

export const POST = async (request: Request) => {
    try {
        const data = await request.json();
        const bookingService = await createBookingServiceController(data);
        return NextResponse.json(bookingService, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
};
