import { NextResponse } from 'next/server';
import { findBookingDetailsByBookingIdController } from '@/backend/controllers/appointmentController';

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const bookingId = params.id;
        const bookingDetailsResponse = await findBookingDetailsByBookingIdController(bookingId!);
        return NextResponse.json(bookingDetailsResponse, { status: 200 });
    } catch (err) {
        if (err instanceof Error) {
            return NextResponse.json({ error: err.message }, { status: 400 });
        }
    }
}
