// api/bookingService.ts
import { get } from '@/libs/utils/client';

export const bookingServiceUrl = '/api/booking_service?organizationId=';

export const fetchBookingService = async () => {
    return get(bookingServiceUrl);
};
