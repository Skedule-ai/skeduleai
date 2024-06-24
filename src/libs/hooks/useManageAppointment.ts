import { useAuth } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import { useUpdateBookingStatus } from '../api/bookingService';
import { AppointmentStatus } from '@/backend/utils/enum';
import toast from 'react-hot-toast';

export type AppointemtResponseType = {
    id: string;
    startTime: string;
    endTime: string;
    status: number;
};

export const useManageAppointment = () => {
    const { getToken } = useAuth();
    const [appointments, setAppointments] = useState<AppointemtResponseType[]>([]);

    const updateAppointmentList = (bookingId: string, status: number) => {
        const updatedAppointmentList = [...appointments];
        const appointmentIndex = updatedAppointmentList.findIndex((data) => data.id === bookingId);
        if (updatedAppointmentList[appointmentIndex]) {
            updatedAppointmentList[appointmentIndex].status = status;
            setAppointments(updatedAppointmentList);
        }
    };

    const notifyAppintmentUpdateStatus = (bookingDetails: AppointemtResponseType) => {
        if (bookingDetails.status === AppointmentStatus.ACCEPTED) {
            toast.success('Appointment accepted.');
        } else if (bookingDetails.status === AppointmentStatus.REJECT) {
            toast.error('Appointment rejected.');
        }
    };

    const [updateBookingStatus] = useUpdateBookingStatus({
        onCompleted: ({ bookingDetails }) => {
            updateAppointmentList(bookingDetails.id, bookingDetails.status);
            notifyAppintmentUpdateStatus(bookingDetails);
        },
        onError: (err) => {
            toast.error(err.message);
        },
    });

    const handleStatusChange = (id: string, accepted: boolean) => {
        updateBookingStatus({
            id,
            accepted,
        });
    };

    useEffect(() => {
        const fetchAppointments = async () => {
            const token = await getToken();
            try {
                const response = await fetch(
                    'http://localhost:3000/api/booking_service/appointment',
                    {
                        method: 'GET',
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    },
                );
                const data = await response.json();
                if (data.appointments) {
                    setAppointments(data.appointments);
                }
            } catch (error) {
                console.error('Error fetching appointments:', error);
                // setError('Failed to fetch appointments.');
            } finally {
                // setLoading(false);
            }
        };

        fetchAppointments();
    }, [getToken]);

    return {
        appointments,
        error: '',
        handleStatusChange,
    };
};
