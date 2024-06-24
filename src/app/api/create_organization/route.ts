import { NextResponse } from 'next/server';
import { ErrorMessages } from '@/libs/message/error';
import { fetchOrganizationsByUserId } from '@/backend/services/availabilityConfigurationService';

export async function POST(request: Request) {
    try {
        // Log the request to debug
        console.log('Incoming request:', request);
        const { userId } = await request.json().catch(() => {
            throw new Error(ErrorMessages.INVALID_INPUT);
        });
        // Log the extracted userId
        console.log('Extracted userId:', userId);
        if (!userId) {
            throw new Error('User ID is required');
        }
        const organizationNames = await fetchOrganizationsByUserId(userId);
        return NextResponse.json({ organizationNames }, { status: 200 });
    } catch (error: any) {
        console.error('Error in POST request:', error);
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
