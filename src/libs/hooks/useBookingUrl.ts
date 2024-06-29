// hooks/useBookingService.ts
import { useQuery, QueryHelperResolvers } from '@/libs/utils/client';
import { bookingServiceUrl } from '@/libs/api/bookingUrl';

const useBookingUrl = (queryHelpers?: QueryHelperResolvers) => {
    const { data, error, isLoading } = useQuery(bookingServiceUrl, queryHelpers);

    return {
        bookingUrl: data?.bookingService?.bookingUrl,
        error,
        isLoading,
    };
};

export default useBookingUrl;
