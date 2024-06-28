import { findAppointmentsController } from '@/backend/controllers/appointmentController';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const appointment = await findAppointmentsController(searchParams?.get('id'));
        return NextResponse.json(appointment, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
