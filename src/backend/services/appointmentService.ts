import { createAppoinmentRepository,findAllAppointmentRepositoryByServiceId,findAppointmentRepository } from '@/backend/repositories/appointmentRepository';
import { AppointmentDTO } from '../interfaces/appointmentDTO';
import { getClerkClient } from '../utils/clerkClient';
import { BookingDetailsDTO } from '../interfaces/bookingServiceDTO';
import { nanoid } from 'nanoid';
import { AppointmentStatus } from '../utils/enum';
import { addDuration, formatDate, formatTime } from '@/libs/utils/datetime-helpers';
import { createGuestUserRepository } from '../repositories/guestUserRepository';
import { GuestUserDTO } from '../interfaces/guestUserDTO';
import { currentUser,User } from '@clerk/nextjs/server';
import {  findBookingServiceRepoByUser } from '../repositories/bookingServiceRepository';


export async function createAppointmentService(data: AppointmentDTO) {
    try {
        const { name, email, phoneNumber,...appointmentData } = data;
          // Step 1: Check if user is logged in.
          let user: User | null | undefined = await currentUser();
        const client = getClerkClient();

        // Step 2: If not a logged in user, Make basic info of user required.
        if (!user && (!name || !email || !phoneNumber)) {
            throw new Error('Missing required fields');
        }

        // Step 3: Check if given basic info is part of our users list.
        if (!user) {
            const userList = await client.users.getUserList({
                emailAddress: [email],
                phoneNumber: [phoneNumber],
            });

            user = userList.data.find((data, inx) => inx === 0);
        }

        // Step 4: If user record is not found, Register as guest user.
        let guest: GuestUserDTO | undefined;
        if (!user) {
            guest = await createGuestUserRepository({
                name,
                email,
                phoneNumber,
            });
        }

        // Step 5: Generate booking details.
        const bookingDetails: BookingDetailsDTO = {
            id: nanoid(8),
            customerId: user?.id ?? '',
            guestUserId: guest?.id ?? null,
            serviceId: appointmentData.serviceId,
            date: formatDate(appointmentData.date),
            time: formatTime(appointmentData.time),
            duration: formatTime(appointmentData.duration), // ToDo: To be fixed once availability API configuration is fixed
            status: AppointmentStatus.PENDING,
        };

        // Step 5: Add booking details to DB
        const appointment = await createAppoinmentRepository(bookingDetails);

        // Step 5: return booking details
        return { appointment };
    } catch (err) {
        console.log(err);
        if (err instanceof Error) {
            throw new Error(err.message);
        }
    }
}


export async function getAppointmentService() {
    try {
        const user = await currentUser();
        if (user?.id) {
            const bookingService = await findBookingServiceRepoByUser(user.id)
            if(bookingService){
                const getAppointment = await findAllAppointmentRepositoryByServiceId({ serviceId: bookingService.id });
                const formattedAppointments = getAppointment.map((data,inx)=>{
                    return {
                        id:data.id,
                        startTime: formatTime(data.time.toISOString()),
                        endTime: addDuration(data.time.toISOString(),data.duration.toISOString())
                    }
                })
                return { formattedAppointments,title:"Appointment" };
            }           
            return { getAppointment:[]};
        } else {
            throw new Error("User not found or missing ID");
        }
    } catch (error) {
        console.error("Error finding appointment:", error);
        throw error;
    }
}



