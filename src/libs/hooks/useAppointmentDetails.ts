import { useMutation, MutationHelperResolvers } from '@/libs/utils/client';
import { appointmentDetailUrl } from '@/libs/api/appointmentDetailsUrl' ;

const useAppointmentDetails = (id: string, queryHelpers?: MutationHelperResolvers) => {
    const [bookAppointment, { data, error, isLoading }] = useMutation(
        appointmentDetailUrl(id),
        queryHelpers,
    );

    return {
        bookAppointment,
        response: data,
        error,
        isLoading,
    };
};

export default useAppointmentDetails;
