<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
import {
    CreateAppointmentInputDataType,
    createAppointmentService,
    getAppointmentsService
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
import { createAppointmentService, getAppointmentService } from '../services/appointmentService';

import { updateAppointmentStatusService } from '../services/appointmentService';
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
import { currentUser } from '@clerk/nextjs/server';
import { AppointmentDTO } from '../interfaces/appointmentDTO';
import {
    createAppointmentService,
    updateAppointmentStatusService,
} from '../services/appointmentService';

export async function createAppointmentController(data: AppointmentDTO) {
    return await createAppointmentService(data);
}

<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
export async function findAppointmentController() {
    return await getAppointmentService();
}

=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
export async function updateAppointmentStatusController(id: string, accepted: boolean) {
    const user = await currentUser();
    if (!user?.id) {
        throw new Error('Unauthorized');
    }

    const result = await updateAppointmentStatusService(id, accepted);
    if (!result || !result.bookingDetails) {
        throw new Error('Failed to update booking status');
    }

    return result.bookingDetails;
}
