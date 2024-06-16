import { NextResponse } from 'next/server';
import { findBookingServiceByIdController } from '@/backend/controllers/bookingServiceController';
import { createAppointmentController } from '@/backend/controllers/appointmentController';
import { ErrorMessages } from '@/libs/message/error';

export const GET = async (request: Request, { params }: { params: { id: string } }) => {
    try {
        const bookingService = await findBookingServiceByIdController(params);
        return NextResponse.json(bookingService, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
};

export async function POST(request: Request, { params }: { params: { id: string } }) {
    try {
        const data = await request.json().catch(() => {
            throw new Error(ErrorMessages.INVALID_INPUT);
        });
        const appointment = await createAppointmentController(params, data);
        return NextResponse.json(appointment, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
