import { handleOrganizationDetails } from '@/backend/controllers/organizationController';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        return await handleOrganizationDetails(req);
    } catch (error) {
        console.error('Error handling organization details:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
