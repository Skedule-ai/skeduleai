// pages/api/sendWelcomeEmail.js
import sgMail from '@sendgrid/mail';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const { email, firstName, lastName } = await req.json();

        // Ensure SENDGRID_API_KEY is defined and of type string
        const apiKey = process.env.SENDGRID_API_KEY ?? '';
        sgMail.setApiKey(apiKey);

        const msg = {
            to: email,
            from: 'naveen@emoment.in', // Use your verified SendGrid sender email
            templateId: 'd-a5b4257cbfc6479eb07d50c16de886bb', // Your dynamic template ID
            dynamic_template_data: {
                name: `${firstName} ${lastName}`,
            },
        };

        const ack = await sgMail.send(msg);
        return NextResponse.json(
            { ack, message: 'Welcome email sent successfully' },
            { status: 201 },
        );
    } catch (error) {
        console.error('Error sending welcome email:', error);
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
