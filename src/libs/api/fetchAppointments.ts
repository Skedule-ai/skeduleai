export const fetchAppointments = async (token: string) => {
    const response = await fetch(`${process.env.APP_URL}/api/booking_service/appointment`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch appointments');
    }

    return response.json();
};
