import { AppointmentDTO } from '../interfaces/appointmentDTO';
import { createAppointmentService,findAppointmentService
 } from '../services/appointmentService';

export async function createAppointmentController(data: AppointmentDTO) {
    return await createAppointmentService(data);
}

export async function findAppointmentController(data: AppointmentDTO) {
    return await findAppointmentService(data);
}

export async function updateAppointmentController(data: AppointmentDTO) {
    return await updateAppointmentService(data);
}