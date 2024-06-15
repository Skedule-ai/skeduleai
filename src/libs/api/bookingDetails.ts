// src/libs/api/bookingDetails.ts
export const getBookingDetails = async (organizationId: string) => {
    const response = await fetch(
        `${process.env.APP_URL}/api/configuration/booking?organizationId=${organizationId}`,
    );

    if (!response.ok) {
        throw new Error('Failed to fetch booking details');
    }

    return response.json();
};
