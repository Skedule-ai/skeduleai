import { useMutation, MutationHelperResolvers } from '../utils/client';
import { createAvailabilityUrl } from '../api/availability';

export type AvailabilityData = {
    organizationId: string;
    availabilityConfiguration: {
        timezone: string;
        startTime: string;
        endTime: string;
        duration: number;
        days: number[];
    };
};

const useAvailability = (queryHelpers?: MutationHelperResolvers) => {
    const [mutate, { data, error, isLoading }] = useMutation(createAvailabilityUrl, queryHelpers);

    const submitAvailability = async (data: AvailabilityData) => {
        try {
            return await mutate(data);
        } catch (error) {
            console.error('Error in submitAvailability:', error);
            throw error;
        }
    };

    return { submitAvailability, data, error, isLoading };
};

export default useAvailability;
