// src/app/api/postSubscribe/route.ts

import { handlePostSubscribe } from '@/backend/controllers/blogSubscribeController';

export async function POST(req: Request) {
    return handlePostSubscribe(req);
}
