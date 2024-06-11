import { NextResponse } from 'next/server';
import { createAppointmentController } from '@/backend/controllers/appointmentController';

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const appointment = await createAppointmentController(data);
        return NextResponse.json(appointment, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}


export async function GET(request: Request) {
    try {
        const data = await request.json();
        const appointment = await createAppointmentController(data);
        return NextResponse.json(appointment, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}