import { ErrorMessages } from '@/libs/message/error';
import sgMail from '@sendgrid/mail';

export async function sendAppointmentAcceptedEmail(customerEmail: string, customerName: string) {
    try {
        const apiKey = process.env.SENDGRID_API_KEY ?? '';
        const senderEmail = process.env.SENDGRID_SENDER_EMAIL ?? '';
        sgMail.setApiKey(apiKey);

        const emailData = {
            to: customerEmail,
            from: senderEmail,
            templateId: 'd-222dd33144744f1e9994f425f0a276e5',
            dynamicTemplateData: {
                customerName,
            },
        };

        const ack = await sgMail.send(emailData);

        return { ack, message: 'Appointment accepted email sent successfully' };
    } catch (error) {
        console.error('Error sending appointment accepted email:', error);
        throw new Error(ErrorMessages.FAILED_TO_SEND_EMAIL);
    }
}
