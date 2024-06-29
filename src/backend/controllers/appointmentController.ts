import {
    CreateAppointmentInputDataType,
    createAppointmentService,
    getAppointmentsService,
    getBookingDetailsByBookingIdService,
    updateAppointmentStatusService,
} from '../services/appointmentService';

export async function createAppointmentController(
    params: { id: string },
    data: CreateAppointmentInputDataType,
) {
    return await createAppointmentService(params.id, data);
}

export async function findAppointmentsController(
    organizationId?: string | null,
    startTime?: Date | string,
) {
    return await getAppointmentsService(organizationId, startTime);
}

export async function updateAppointmentStatusController(data: { id: string; accepted: boolean }) {
    const updatedAppointmentDetails = await updateAppointmentStatusService(data.id, data.accepted);
    return updatedAppointmentDetails;
}

export async function findBookingDetailsByBookingIdController(bookingId?: string) {
    return await getBookingDetailsByBookingIdService(bookingId);
}
