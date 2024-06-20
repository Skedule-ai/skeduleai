import { sendWelcomeEmails } from '@/backend/services/emailService';
import { NextResponse } from 'next/server';

export async function handleWelcomeEmail(req: Request) {
    try {
        const reqData = await req.json();
        const { type, object, data } = reqData;

        if (object !== 'event' && type !== 'user.created') {
            return NextResponse.json({ error: 'Invalid event type' }, { status: 400 });
        }

        const emailDataList = data.email_addresses?.map((val) => ({
            email: val.email_address,
            firstName: val.first_name,
            lastName: val.last_name,
        }));

        const ack = await sendWelcomeEmails(emailDataList);

        return NextResponse.json(
            { ack, message: 'Welcome email sent successfully' },
            { status: 201 },
        );
    } catch (error) {
        console.error('Error sending welcome email:', error);
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }
    }
}
