import {
    CreateAppointmentInputDataType,
    createAppointmentService,
    getAppointmentsService,
    updateAppointmentStatusService,
} from '../services/appointmentService';

export async function createAppointmentController(
    params: { id: string },
    data: CreateAppointmentInputDataType,
) {
    return await createAppointmentService(params.id, data);
}

export async function findAppointmentsController(organizationId?: string | null) {
    return await getAppointmentsService(organizationId);
}

export async function updateAppointmentStatusController(data: { id: string; accepted: boolean }) {
    const updatedAppointmentDetails = await updateAppointmentStatusService(data.id, data.accepted);
    return updatedAppointmentDetails;
}
