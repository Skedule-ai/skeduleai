import { MutationHelperResolvers, useMutation } from '../utils/client';
import { CreateAvailabilityConfigurationInput } from './types';

export const endpoint = '/api/availability';

export const useCreateAvailabilityConfiguration = (
    queryHelpers?: MutationHelperResolvers,
): [
    (data: CreateAvailabilityConfigurationInput) => Promise<any>,
    {
        data: any;
        error: any;
        isLoading: boolean;
    },
] => {
    const [createAvailabilityConfiguration, availabilityConfigurationResponse] = useMutation(
        endpoint,
        queryHelpers,
    );
    return [createAvailabilityConfiguration, availabilityConfigurationResponse];
};
