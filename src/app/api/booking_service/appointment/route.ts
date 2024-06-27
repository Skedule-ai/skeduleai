import { findAppointmentsController } from '@/backend/controllers/appointmentController';
import moment from 'moment';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        console.log(searchParams);
        const organizationId = searchParams?.get('id');
        const dateParam = searchParams?.get('date');

        let date: Date | string;
        if (dateParam) {
            date = moment(dateParam, 'DD-MM-YYYY').toISOString();
        } else {
            date = new Date().toISOString(); // Default to today's date if no date param provided
        }

        const appointments = await findAppointmentsController(organizationId, date);
        return NextResponse.json(appointments, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
