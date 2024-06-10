import { NextResponse } from 'next/server';
import {registerAvailabilityConfiguration,
    findAvailabilityConfiguration,
} from '@/backend/controllers/availabilityConfigurationController';

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const availabilityConfiguration = await registerAvailabilityConfiguration(data);
        return NextResponse.json(availabilityConfiguration, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}

export async function GET() {
    try {
        const availabilityConfiguration = await findAvailabilityConfiguration();
        console.log(availabilityConfiguration)
        return NextResponse.json({availabilityConfiguration}, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}