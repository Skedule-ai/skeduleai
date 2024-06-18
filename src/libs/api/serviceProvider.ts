// src/libs/api/serviceProvider.ts
export const getServiceProviderDetails = async (token: string) => {
    const response = await fetch(`${process.env.APP_URL}/api/configuration/booking`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ organizationId: '' }),
    });

    if (!response.ok) {
        throw new Error('Failed to fetch service provider details');
    }

    return response.json();
};
