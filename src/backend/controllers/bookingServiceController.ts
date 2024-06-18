import {
    CreateBookingServiceDataType,
    FindBookingServiceDataType,
    createBookingService,
    findBookingService,
    findBookingServiceById,
} from '../services/bookingService';

export async function createBookingServiceController(data: CreateBookingServiceDataType) {
    return await createBookingService(data);
}

export async function findBookingServiceController(data: FindBookingServiceDataType) {
    return await findBookingService(data);
}

export async function findBookingServiceByIdController(params: { id: string }) {
    return await findBookingServiceById(params.id);
}
