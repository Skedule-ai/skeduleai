import { Prisma } from '@prisma/client';
import { MutationHelperResolvers, useMutation } from '../utils/client';

const endpoint = '/api/booking_service';

type UpdateBookingStatusInput = Pick<Prisma.bookingDetailsUpdateInput, 'id'> & {
    accepted: boolean;
};

export const useUpdateBookingStatus = (
    queryHelpers?: MutationHelperResolvers,
): [
    (data: UpdateBookingStatusInput) => Promise<any>,
    {
        data: any;
        error: any;
        isLoading: boolean;
    },
] => {
    const [updateBookingStatus, swrResponse] = useMutation(`${endpoint}/status`, queryHelpers);
    return [updateBookingStatus, swrResponse];
};
