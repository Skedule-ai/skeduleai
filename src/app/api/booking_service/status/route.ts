import { NextResponse } from 'next/server';

import { updateAppointmentStatusController } from '@/backend/controllers/appointmentController';
import { ErrorMessages } from '@/libs/message/error';

export async function POST(req: Request) {
    try {
        const data = await req.json().catch(() => {
            throw new Error(ErrorMessages.INVALID_INPUT);
        });

        const bookingDetails = await updateAppointmentStatusController(data);
        return NextResponse.json({ bookingDetails }, { status: 201 });
    } catch (error) {
        console.error('Error updating booking status:', error);
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }
    }
}
