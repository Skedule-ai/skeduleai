import sgMail from '@sendgrid/mail';

export async function sendAppointmentAcceptedEmail(customerEmail: string, customerName: string) {
    try {
        const apiKey = process.env.SENDGRID_API_KEY ?? '';
        sgMail.setApiKey(apiKey);

        const emailData = {
            to: customerEmail,
            from: 'naveen@emoment.in', // Replace with your verified SendGrid sender email
            templateId: 'd-222dd33144744f1e9994f425f0a276e5',
            dynamicTemplateData: {
                customerName,
            },
        };

        const ack = await sgMail.send(emailData);
        console.log('Appointment accepted email sent:', ack);

        return { ack, message: 'Appointment accepted email sent successfully' };
    } catch (error) {
        console.error('Error sending appointment accepted email:', error);
        throw new Error('Failed to send appointment accepted email');
    }
}
