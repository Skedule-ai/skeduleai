import { handleWebhookRequestController } from '@/backend/controllers/emailController';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
    return await handleWebhookRequestController(req);
}
