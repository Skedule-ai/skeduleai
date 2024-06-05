import { NextResponse } from 'next/server';
import { createOrganizationController } from '@/backend/controllers/organizationController';

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const user = await createOrganizationController(data);
        return NextResponse.json(user, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
