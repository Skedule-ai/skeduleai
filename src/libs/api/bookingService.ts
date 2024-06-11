import { useQuery } from '../utils/client';

const endpoint = '/api/service';

export const useFetchBookingServiceQuery = (id: string, options?: any) => {
    const { data, error, isLoading } = useQuery(`${endpoint}/${id}`, options);
    return { data, error, isLoading };
};
