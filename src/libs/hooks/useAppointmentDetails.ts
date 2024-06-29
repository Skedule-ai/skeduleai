import { useQuery, MutationHelperResolvers } from '@/libs/utils/client';
import { appointmentDetailUrl } from '@/libs/api/appointmentDetailsUrl';

const useAppointmentDetails = (id: string, queryHelpers?: MutationHelperResolvers) => {
    const { data, error, isLoading } = useQuery(appointmentDetailUrl(id), queryHelpers);

    return {
        timezone: data?.bookingDetails?.timezone,
        date: data?.bookingDetails?.date,
        startTime: data?.bookingDetails.startTime,
        endTime: data?.bookingDetails.endTime,
        organization: data?.bookingDetails?.organization,
        duration: data?.bookingDetails?.duration,
        serviceProvider: data?.bookingDetails?.serviceProvider,
        error,
        isLoading,
    };
};

export default useAppointmentDetails;
