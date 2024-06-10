import { createClerkClient } from '@clerk/nextjs/server';

export const getClerkClient = () => {
    const client = createClerkClient({
        secretKey: process.env.CLERK_SECRET_KEY,
    });
    return client;
};
