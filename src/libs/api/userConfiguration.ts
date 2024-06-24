import {
    MutationHelperResolvers,
    QueryHelperResolvers,
    useMutation,
    useQuery,
} from '../utils/client';
import { CreateUserConfigurationArgs } from './types';

const endpoint = '/api/user_configuration';

export const useFetchUserConfigurationQuery = (options?: QueryHelperResolvers) => {
    const { data, error, isLoading } = useQuery(endpoint, options);
    return { data, error, isLoading };
};

export const useUpdateUserConfigurationMutation = (
    queryHelpers?: MutationHelperResolvers,
): [
    (data: CreateUserConfigurationArgs) => Promise<any>,
    {
        data: any;
        error: any;
        isLoading: boolean;
    },
] => {
    const [createUserConfiguration, swrResponse] = useMutation(endpoint, queryHelpers);
    return [createUserConfiguration, swrResponse];
};
