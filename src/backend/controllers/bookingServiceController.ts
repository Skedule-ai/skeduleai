import { BookingServiceDTO } from '../interfaces/bookingServiceDTO';
import {
    createBookingService,
    findBookingService,
    findBookingServiceById,
} from '../services/bookingService';

export async function createBookingServiceController(data: Partial<Pick<BookingServiceDTO, 'organizationId'>>,) {
    return await createBookingService(data);
}

export async function findBookingServiceController(
    data: Partial<Pick<BookingServiceDTO, 'organizationId'>>,
) {
    return await findBookingService(data);
}

export async function findBookingServiceByIdController(params: { id: string }) {
    return await findBookingServiceById(params.id);
}
