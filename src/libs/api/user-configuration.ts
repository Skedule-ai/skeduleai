import { QueryHelperResovers, useMutation, useQuery } from '../utils/client';
import { CreateUserConfigurationArgs } from './types';

const endpoint = '/api/configuration';
export const useFetchUserConfigurationQuery = (options?: QueryHelperResovers) => {
    const { data, error, isLoading } = useQuery(endpoint, options);
    return { data, error, isLoading };
};

export const useCreateUserConfigurationMutation = (data: CreateUserConfigurationArgs) => {
    const [createUserConfiguration, swrResponse] = useMutation(endpoint, data);
    return [createUserConfiguration, swrResponse];
};
