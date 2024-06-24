// app/api/postSubscribe/route.ts

import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const { email } = await req.json();

        if (!email) {
            return NextResponse.json(
                { error: 'Email is required in request body' },
                { status: 400 },
            );
        }

        // Check if email is already subscribed
        const existingSubscriber = await prisma.blogSubscribe.findUnique({
            where: { email },
        });

        if (existingSubscriber) {
            return NextResponse.json({ subscribed: true }, { status: 200 });
        }

        // If not subscribed, create a new subscriber
        await prisma.blogSubscribe.create({
            data: { email },
        });

        return NextResponse.json({ subscribed: true }, { status: 200 });
    } catch (error) {
        console.error('Error subscribing:', error);
        return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 });
    }
}
