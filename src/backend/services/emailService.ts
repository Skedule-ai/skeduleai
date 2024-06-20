import { ErrorMessages } from '@/libs/message/error';
import sgMail from '@sendgrid/mail';

const apiKey = process.env.SENDGRID_API_KEY ?? '';
const senderEmail = process.env.SENDGRID_SENDER_EMAIL ?? '';
const tempId = process.env.ACCEPTMAIL_TEMPLATE_ID ?? '';
const templId = process.env.WELCOMEMAIL_TEMPLATE_ID ?? '';
const templId1 = process.env.REJECTMAIL_TENPLATE_ID ?? '';

export async function sendWelcomeEmails(
    emailDataList: {
        email: string;
        firstName: string;
        lastName: string;
    }[],
) {
    sgMail.setApiKey(apiKey);
    const sgMailDataList = emailDataList.map(({ email, firstName, lastName }) => ({
        to: email,
        from: senderEmail,
        templateId: templId,
        dynamic_template_data: {
            name: `${firstName} ${lastName}`,
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
) {
    try {
        sgMail.setApiKey(apiKey);

        const emailData = {
            to: customerEmail,
            from: senderEmail,
            templateId: tempId,
            dynamicTemplateData: {
                customerName,
            },
        };

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

        const emailData = {
            to: customerEmail,
            from: senderEmail,
            templateId: templId1,
            dynamicTemplateData: {
                customerName,
            },
        };

        const ack = await sgMail.send(emailData);

        return { ack, message: 'Appointment reject email sent successfully' };
    } catch (error) {
        console.error('sendAppointmentRejectMail', error);
        throw new Error(ErrorMessages.FAILED_TO_SEND_EMAIL);
    }
}