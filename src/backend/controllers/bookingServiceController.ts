import { BookingServiceDTO } from '../interfaces/bookingServiceDTO';
import { createBookingService, findBookingService } from '../services/bookingService';

export async function createBookingServiceController(
    data: Partial<Pick<BookingServiceDTO, 'organizationId'>>,
) {
    return await createBookingService(data);
}

export async function findBookingServiceController(data: Partial<Pick<BookingServiceDTO, 'id'>>) {
    return await findBookingService(data);
}
