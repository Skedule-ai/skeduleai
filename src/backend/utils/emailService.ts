// utils/emailService.ts

import sgMail from '@sendgrid/mail';

// Set SendGrid API Key
sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

interface EmailPayload {
    to: string;
    from: string;
    templateId: string;
    dynamicTemplateData: Record<string, any>;
}

export async function sendEmail({ to, from, templateId, dynamicTemplateData }: EmailPayload) {
    try {
        const msg = {
            to,
            from,
            templateId,
            dynamicTemplateData,
        };
        await sgMail.send(msg);
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Failed to send email');
    }
}
