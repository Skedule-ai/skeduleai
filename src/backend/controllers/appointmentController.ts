import { AppointmentDTO } from '../interfaces/appointmentDTO';
import { createAppointmentService } from '../services/appointmentService';

export async function createAppointmentController(data: AppointmentDTO) {
    return await createAppointmentService(data);
}
