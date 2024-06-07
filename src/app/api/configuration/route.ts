import { NextResponse } from 'next/server';
import {
    createUserConfiguration,
    findUserConfiguration,
} from '@/backend/controllers/userConfigurationController';

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const userConfiguration = await createUserConfiguration(data);
        return NextResponse.json(userConfiguration, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}

export async function GET() {
    try {
        const userConfiguration = await findUserConfiguration();
        return NextResponse.json(userConfiguration, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
