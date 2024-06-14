import { AppointmentDTO } from '../interfaces/appointmentDTO';
import { createAppointmentService,getAppointmentService } from '../services/appointmentService';

export async function createAppointmentController(data: AppointmentDTO) {
    return await createAppointmentService(data);
}

export async function findAppointmentController() {
    return await getAppointmentService();
}

