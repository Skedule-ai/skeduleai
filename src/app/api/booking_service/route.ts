import { updateAppointmentStatusController } from '@/backend/controllers/appointmentController';
import {
    findBookingServiceController
} from '@/backend/controllers/bookingServiceController';
import { FindBookingServiceDataType } from '@/backend/services/bookingService';
import { currentUser } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    // Route code
    let params;
    try {
        params = await req.json();
    } catch (err) {
        console.log('Invalid JSON input recieved.');
    }

export const GET = async (request: Request, { params }: { params: FindBookingServiceDataType }) => {
    try {
        const bookingService = await findBookingServiceController(params);
        return NextResponse.json(bookingService, { status: 201 });
    } catch (error: any) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 400 });
        // Controller
        if (!params?.id) {
            throw new Error('Missing required input.');
        }

        const { id, accepted } = params;

        // Service
        const user = await currentUser();
        if (!user?.id) {
            throw new Error('Unauthorized');
        }

        // Update the status of the appointment
        const bookingDetails = await updateAppointmentStatusController(id, accepted);
        console.log('Result from service:', bookingDetails);
        return NextResponse.json({ bookingDetails }, { status: 201 });
    } catch (error) {
        console.error('Error updating booking status:', error);
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }
    }
}
}