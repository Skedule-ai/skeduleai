import { currentUser } from '@clerk/nextjs/server';
import { AppointmentDTO } from '../interfaces/appointmentDTO';
import { createAppointmentService, updateAppointmentStatusService } from '../services/appointmentService';

export async function createAppointmentController(data: AppointmentDTO) {
    return await createAppointmentService(data);
}


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