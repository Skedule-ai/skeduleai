import { sendWelcomeEmails } from '@/backend/services/emailService';
import { NextResponse } from 'next/server';

type SendGridHookRequestData = {
    type: string;
    object: string;
    data: {
        email_addresses: {
            email_address: string;
            user_name: string;
        }[];
    };
};

export async function handleWelcomeEmail(sendGridData: SendGridHookRequestData) {
    try {
        const { type, object, data } = sendGridData;

        if (object !== 'event' && type !== 'user.created') {
            return NextResponse.json({ error: 'Invalid event type' }, { status: 400 });
        }

        const emailDataList = data.email_addresses?.map((val) => ({
            email: val.email_address,
            userName: val.user_name || '',
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
