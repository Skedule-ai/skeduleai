// src/libs/api/validateBooking.ts
export const validateBookingUrl = async (uniqueUrl: string) => {
    const response = await fetch(`${process.env.APP_URL}/api/customer/appointment/${uniqueUrl}`);

    if (!response.ok) {
        throw new Error('Failed to validate booking URL');
    }

    return response.json();
};
