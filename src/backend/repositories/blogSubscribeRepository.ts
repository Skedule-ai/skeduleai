// src/repositories/subscribeRepository.ts

import { prisma } from '@/backend/utils/db';

export async function findSubscriberByEmail(email: string) {
    return prisma.blogSubscribe.findUnique({
        where: { email },
    });
}

export async function createSubscriber(email: string) {
    return prisma.blogSubscribe.create({
        data: { email },
    });
}
