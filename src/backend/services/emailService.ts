import { ErrorMessages } from '@/libs/message/error';
import { WebhookEvent } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { Webhook } from 'svix';
import { handleWelcomeEmail } from '../controllers/emailController';

import sgMail from '@sendgrid/mail';

const apiKey = process.env.SENDGRID_API_KEY ?? '';
const senderEmail = process.env.SENDGRID_SENDER_EMAIL ?? '';
const acceptMailTemp = process.env.ACCEPTMAIL_TEMPLATE_ID ?? '';
const welcomeMailTemp = process.env.WELCOMEMAIL_TEMPLATE_ID ?? '';
const rejectMailTemp = process.env.REJECTMAIL_TEMPLATE_ID ?? '';
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

export async function sendWelcomeEmails(
    emailDataList: {
        email: string;
        userName: string;
    }[],
) {
    sgMail.setApiKey(apiKey);
    const sgMailDataList = emailDataList.map(({ email, userName }) => ({
        to: email,
        from: senderEmail,
        templateId: welcomeMailTemp,
        dynamic_template_data: {
            firstName: userName,
        },
    }));

    try {
        const ack = await sgMail.send(sgMailDataList);
        return ack;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Error sending welcome email: ${error.message}`);
        }
    }
}

export async function sendAppointmentAcceptedEmailService(
    customerEmail: string,
    customerName: string,
    appointmentDate: string,
    appointmentTime: string,
) {
    try {
        sgMail.setApiKey(apiKey);

        const emailData = {
            to: customerEmail,
            from: senderEmail,
            templateId: acceptMailTemp,
            dynamicTemplateData: {
                serviceProviderName: customerName,
                date: appointmentDate,
                time: appointmentTime,
            },
        };
        console.log(emailData);
        const ack = await sgMail.send(emailData);
        return { ack, message: 'Appointment accepted email sent successfully' };
    } catch (error) {
        console.error('sendAppointmentAcceptedMail', error);
        throw new Error(ErrorMessages.FAILED_TO_SEND_EMAIL);
    }
}

export async function sendAppointmentRejectEmailService(
    customerEmail: string,
    customerName: string,
) {
    try {
        sgMail.setApiKey(apiKey);

        const emailData1 = {
            to: customerEmail,
            from: senderEmail,
            templateId: rejectMailTemp,
            dynamicTemplateData: {
                ser: customerName,
            },
        };

        const ack = await sgMail.send(emailData1);

        return { ack, message: 'Appointment reject email sent successfully' };
    } catch (error) {
        console.error('sendAppointmentRejectMail', error);
        throw new Error(ErrorMessages.FAILED_TO_SEND_EMAIL);
    }
}

export async function handleWebhook(req: Request) {
    const body = await req.text();
    const reqData = JSON.parse(body);

    if (!WEBHOOK_SECRET) {
        throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local');
    }

    const headerPayload = req.headers;
    const svix_id = headerPayload.get('svix-id');
    const svix_timestamp = headerPayload.get('svix-timestamp');
    const svix_signature = headerPayload.get('svix-signature');

    if (!svix_id || !svix_timestamp || !svix_signature) {
        return NextResponse.json('Error occurred -- no svix headers', {
            status: 400,
        });
    }

    const wh = new Webhook(WEBHOOK_SECRET);

    let evt: WebhookEvent;

    try {
        evt = wh.verify(body, {
            'svix-id': svix_id,
            'svix-timestamp': svix_timestamp,
            'svix-signature': svix_signature,
        }) as WebhookEvent;
    } catch (err) {
        console.error('Error verifying webhook:', err);
        return NextResponse.json('Error verifying webhook', {
            status: 400,
        });
    }

    if (evt.type === 'user.created' || evt.type === 'email.created') {
        try {
            const welcomeEmailResponse = await handleWelcomeEmail(reqData);
            return welcomeEmailResponse;
        } catch (error) {
            console.error('Error sending welcome email:', error);
            return NextResponse.json('Failed to send welcome email', { status: 500 });
        }
    }

    return NextResponse.json('', { status: 200 });
}
