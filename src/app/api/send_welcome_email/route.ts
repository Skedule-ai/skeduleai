import { handleWebhook } from '@/backend/services/emailService';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
    return await handleWebhook(req);
}
