// pages/api/sendWelcomeEmail.js
import sgMail from '@sendgrid/mail';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const reqData = await req.json();
        const { type, object, data } = reqData;

        // Ensure this is a 'user.created' event
        if (object !== 'event' && type !== 'user.created') {
            return NextResponse.json({ error: 'Invalid event type' }, { status: 400 });
        }

        // Ensure SENDGRID_API_KEY is defined and of type string
        const apiKey = process.env.SENDGRID_API_KEY ?? '';
        sgMail.setApiKey(apiKey);

        const emailDataList: sgMail.MailDataRequired[] = [];

        data.email_addresses?.forEach((val) => {
            const email = val.email_address,
                firstName = val.first_name,
                lastName = val.last_name;

            emailDataList.push({
                to: email,
                from: 'naveen@emoment.in', // Use your verified SendGrid sender email
                templateId: 'd-a5b4257cbfc6479eb07d50c16de886bb', // Your dynamic template ID
                dynamic_template_data: {
                    name: `${firstName} ${lastName}`,
                },
            });
        });

        // if (!email || !firstName || !lastName) {
        //     console.error('Missing required fields');
        //     return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        // }

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
