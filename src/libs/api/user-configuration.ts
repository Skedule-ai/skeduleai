import { QueryHelperResovers, useMutation, useQuery } from '../utils/client';
import { CreateUserConfigurationArgs } from './types';

const endpoint = '/api/configuration';
export const useFetchUserConfigurationQuery = (options?: QueryHelperResovers) => {
    const { data, error, isLoading } = useQuery(endpoint, options);
    return { data, error, isLoading };
};

export const useUpdateUserConfigurationMutation = (
    initialData?: CreateUserConfigurationArgs,
): [
    (data: CreateUserConfigurationArgs) => Promise<any>,
    {
        data: any;
        error: any;
        isLoading: boolean;
    },
] => {
    const [createUserConfiguration, swrResponse] = useMutation(endpoint, initialData);
    return [createUserConfiguration, swrResponse];
};
