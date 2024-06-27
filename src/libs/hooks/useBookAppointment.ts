import { useMutation, MutationHelperResolvers } from '@/libs/utils/client';
import { bookAppointmentUrl } from '../api/appointmentUrl';

const useBookAppointment = (id: string, queryHelpers?: MutationHelperResolvers) => {
    const [bookAppointment, { data, error, isLoading }] = useMutation(
        bookAppointmentUrl(id),
        queryHelpers,
    );

    return {
        bookAppointment,
        response: data,
        error,
        isLoading,
    };
};

export default useBookAppointment;
