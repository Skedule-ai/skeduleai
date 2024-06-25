import { subscribeEmail } from '@/backend/services/blogSubscribeService';
import { NextResponse } from 'next/server';

export async function handlePostSubscribe(req: Request) {
    try {
        const { email } = await req.json();

        if (!email) {
            return NextResponse.json(
                { error: 'Email is required in request body' },
                { status: 400 },
            );
        }

        const result = await subscribeEmail(email);
        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        console.error('Error subscribing:', error);
        return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 });
    }
}
