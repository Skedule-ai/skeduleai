import { updateAppointmentStatusController } from '@/backend/controllers/appointmentController';
import { sendEmail } from '@/backend/utils/emailService';
import { currentUser } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    // Route code
    let params;
    try {
        params = await req.json();
    } catch (err) {
        console.log('Invalid JSON input recieved.');
    }

    try {
        // Controller
        if (!params?.id) {
            throw new Error('Missing required input.');
        }

        const { id, accepted } = params;

        // Service
        const user = await currentUser();
        if (!user?.id) {
            throw new Error('Unauthorized');
        }

        // Update the status of the appointment
        const bookingDetails = await updateAppointmentStatusController(id, accepted);

        if (accepted) {
            // Send email to customer if appointment is accepted
            const { customerEmail, customerName } = await fetchCustomerDetails(
                bookingDetails.customerId,
            );
            // Implement this function
            if (!customerEmail || !customerName) {
                throw new Error('Customer email or name not found.');
            }

            await sendEmail({
                to: customerEmail,
                from: 'naveen@emoment.in', // Replace with your verified sender
                templateId: ' d-222dd33144744f1e9994f425f0a276e5 ', // Replace with your SendGrid template ID
                dynamicTemplateData: {
                    subject: 'Appointment Accepted',
                    customerName,
                },
            });
        }

        console.log('Result from service:', bookingDetails);
        return NextResponse.json({ bookingDetails }, { status: 201 });
    } catch (error) {
        console.error('Error updating booking status:', error);
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }
    }
}
<<<<<<< Updated upstream
=======

async function fetchCustomerDetails(customerId: string) {
    const client = getClerkClient();
    const customer = await client.users.getUser(customerId);

    const customerEmail = customer.emailAddresses.find((email) => email.id)?.emailAddress;

    return {
        customerEmail: customerEmail || '',
        customerName: `${customer.firstName} ${customer.lastName}`,
    };

    // For demonstration purpose, mock implementation:
    //  return {
    //   customerEmail: 'customer@example.com',
    //  customerName: 'John Doe',
    // };
}
>>>>>>> Stashed changes
