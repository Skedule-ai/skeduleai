import { sendAppointmentAcceptedEmailController } from '@/backend/controllers/emailController';

export async function POST(req: Request) {
    const data = await req.json();
    return await sendAppointmentAcceptedEmailController(data);
}
