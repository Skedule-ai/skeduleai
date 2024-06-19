import sgMail from '@sendgrid/mail';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const reqData = await req.json();
        const { type, object, data } = reqData;
        if (object !== 'event' && type !== 'user.created') {
            return NextResponse.json({ error: 'Invalid event type' }, { status: 400 });
        }

        // Ensure SENDGRID_API_KEY is defined and of type string
        const apiKey = process.env.SENDGRID_API_KEY ?? '';
        const senderEmail = process.env.SENDGRID_SENDER_EMAIL ?? '';
        sgMail.setApiKey(apiKey);

        const emailDataList: sgMail.MailDataRequired[] = [];

        data.email_addresses?.forEach((val) => {
            const email = val.email_address,
                firstName = val.first_name,
                lastName = val.last_name;

            emailDataList.push({
                to: email,
                from: senderEmail,
                templateId: 'd-a5b4257cbfc6479eb07d50c16de886bb',
                dynamic_template_data: {
                    name: `${firstName} ${lastName}`,
                },
            });
        });

        const ack = await sgMail.send(emailDataList);
        return NextResponse.json(
            { ack, message: 'Welcome email sent successfully' },
            { status: 201 },
        );
    } catch (error) {
        console.error('Error sending welcome email:', error);
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
