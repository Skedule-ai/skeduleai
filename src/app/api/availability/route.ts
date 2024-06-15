import { NextResponse } from 'next/server';
import {
    findAvailabilityConfigurationController,
    addAvailabilitConfigurationController,
    updateAvailabilityConfigurationController,
} from '@/backend/controllers/availabilityConfigurationController';
import { ErrorMessages } from '@/libs/message/error';

export async function POST(request: Request) {
    try {
        const data = await request.json().catch(() => {
            throw new Error(ErrorMessages.INVALID_INPUT);
        });
        const availabilityConfiguration = await addAvailabilitConfigurationController(data);
        return NextResponse.json(availabilityConfiguration, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}

export async function GET() {
    try {
        const response = await findAvailabilityConfigurationController();
        return NextResponse.json(response, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}

export async function PATCH(request: Request) {
    try {
        const data = await request.json().catch(() => {
            throw new Error(ErrorMessages.INVALID_INPUT);
        });
        console.log('data: ', data);
        const availabilityConfiguration = await updateAvailabilityConfigurationController(data);
        return NextResponse.json(availabilityConfiguration, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
