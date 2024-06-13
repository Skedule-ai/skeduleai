// src/libs/api/bookAppointment.ts
export const bookAppointment = async (appointmentData: {
    serviceId: string;
    name: string;
    email: string;
    phoneNumber: string;
    date: string;
    time: string;
}) => {
    const response = await fetch(`${process.env.APP_URL}/api/customer/appointment`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointmentData),
    });

    if (!response.ok) {
        throw new Error('Failed to book appointment');
    }

    return response.json();
};
