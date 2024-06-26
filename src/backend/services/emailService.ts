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
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET || '';

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

export async function handleWebhookVerifyService(req: Request) {
    const body = await req.text();
    const reqData = JSON.parse(body);

    validateWebhookSecret(WEBHOOK_SECRET);

    const { svix_id, svix_timestamp, svix_signature } = extractSvixHeaders(req.headers);

    const evt = verifyWebhook(WEBHOOK_SECRET, body, svix_id, svix_timestamp, svix_signature);

    return await processWebhookEvent(evt, reqData);
}

function validateWebhookSecret(secret: string | undefined) {
    if (!secret) {
        throw new Error(ErrorMessages.MISSING_WEBHOOK_SECRET);
    }
}

function extractSvixHeaders(headers: Headers) {
    const svix_id = headers.get('svix-id');
    const svix_timestamp = headers.get('svix-timestamp');
    const svix_signature = headers.get('svix-signature');

    if (!svix_id || !svix_timestamp || !svix_signature) {
        throw new Error(ErrorMessages.MISSING_SVIX_HEADERS);
    }

    return { svix_id, svix_timestamp, svix_signature };
}

function verifyWebhook(
    secret: string,
    body: string,
    svix_id: string,
    svix_timestamp: string,
    svix_signature: string,
): WebhookEvent {
    const wh = new Webhook(secret);

    try {
        return wh.verify(body, {
            'svix-id': svix_id,
            'svix-timestamp': svix_timestamp,
            'svix-signature': svix_signature,
        }) as WebhookEvent;
    } catch (err) {
        console.error('Error verifying webhook:', err);
        throw new Error(ErrorMessages.WEBHOOK_VERIFICATION);
    }
}

async function processWebhookEvent(evt: WebhookEvent, reqData: any) {
    if (evt.type === 'user.created' || evt.type === 'email.created') {
        try {
            const welcomeEmailResponse = await handleWelcomeEmail(reqData);
            return welcomeEmailResponse;
        } catch (error) {
            console.error('Error sending welcome email:', error);
            return NextResponse.json(
                { error: ErrorMessages.FAILED_TO_SEND_WELCOME_EMAIL },
                { status: 500 },
            );
        }
    }

    return NextResponse.json('', { status: 200 });
}
