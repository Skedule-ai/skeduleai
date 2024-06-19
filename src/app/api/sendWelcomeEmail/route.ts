import { handleWelcomeEmail } from '@/backend/controllers/emailController';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    if (req.method !== 'POST') {
        return NextResponse.json({ error: `Method ${req.method} Not Allowed` }, { status: 405 });
    }

    return await handleWelcomeEmail(req);
}
