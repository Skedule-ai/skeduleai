import { useQuery, QueryHelperResolvers } from '../utils/client';
import { getServiceProviderUrl } from '../api/serviceProviderUrl';
const useServiceProvider = (id: string, queryHelpers?: QueryHelperResolvers) => {
    const { data, error, isLoading } = useQuery(getServiceProviderUrl(id), queryHelpers);
    return {
        serviceProvider: data?.bookingService?.serviceProvider,
        allTimeSlots: data?.bookingService?.timeSlots,
        organization: data?.bookingService?.organization,
        error,
        isLoading,
    };
};
export default useServiceProvider;
