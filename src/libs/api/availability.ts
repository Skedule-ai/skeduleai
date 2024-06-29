import { post } from '../utils/client';

export const createAvailabilityUrl = '/api/availability';

export const createAvailability = async (data: {
    organizationId: string;
    availabilityConfiguration: {
        timezone: string;
        startTime: string;
        endTime: string;
        duration: number;
        days: number[];
    };
}) => {
    return post(createAvailabilityUrl, data);
};
