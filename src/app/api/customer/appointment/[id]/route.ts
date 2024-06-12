import { NextResponse } from 'next/server';
import { findBookingServiceByIdController } from '@/backend/controllers/bookingServiceController';

export const GET = async (request: Request, { params }: { params: { id: string } }) => {
    try {
        const bookingService = await findBookingServiceByIdController(params);
        return NextResponse.json(bookingService, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
};
