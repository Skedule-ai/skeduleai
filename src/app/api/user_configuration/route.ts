import { NextResponse } from 'next/server';
import {
    createUserConfigurationController,
    findUserConfigurationByUserIdController,
} from '@/backend/controllers/userConfigurationController';

export async function GET() {
    try {
        const userConfiguration = await findUserConfigurationByUserIdController();
        return NextResponse.json(userConfiguration, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const userConfiguration = await createUserConfigurationController(data);
        return NextResponse.json(userConfiguration, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
