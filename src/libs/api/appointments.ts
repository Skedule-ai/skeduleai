import { useMutation, useQuery } from '../utils/client';
import { CreateAppointmentArgs } from './types';

const endpoint = '/api/customer/appointment';

export const useCreateAppointmentMutation = (
    initialData?: CreateAppointmentArgs,
): [
    (data: CreateAppointmentArgs) => Promise<any>,
    {
        data: any;
        error: any;
        isLoading: boolean;
    },
] => {
    const [createAppointment, swrResponse] = useMutation(endpoint, initialData);
    return [createAppointment, swrResponse];
};

export const useFetchAppointmentQuery = (id: string, options?: any) => {
    const { data, error, isLoading } = useQuery(`${endpoint}/${id}`, options);
    return { data, error, isLoading };
};
