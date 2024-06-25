import { handleWelcomeEmail } from '@/backend/controllers/emailController';

export async function POST(req: Request) {
    const reqData = await req.json();

    return await handleWelcomeEmail(reqData);
}
