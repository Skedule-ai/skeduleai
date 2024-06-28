import { useAuth } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import { useUpdateBookingStatus } from '../api/bookingService';
import { AppointmentStatus } from '@/backend/utils/enum';
import toast from 'react-hot-toast';

export type AppointmentResponseType = {
    id: string;
    startTime: string;
    endTime: string;
    status: number;
};

export const useManageAppointment = () => {
    const { getToken } = useAuth();
    const [appointments, setAppointments] = useState<AppointmentResponseType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const updateAppointmentStatus = (bookingId: string, status: number) => {
        setAppointments((prev) =>
            prev.map((appointment) =>
                appointment.id === bookingId ? { ...appointment, status } : appointment,
            ),
        );
    };

    const notifyAppointmentUpdateStatus = (status: number) => {
        if (status === AppointmentStatus.ACCEPTED) {
            toast.success('Your Meeting is Scheduled');
        } else if (status === AppointmentStatus.REJECT) {
            toast.error('Meeting is removed');
        }
    };

    const [updateBookingStatus] = useUpdateBookingStatus({
        onCompleted: ({ bookingDetails }) => {
            updateAppointmentStatus(bookingDetails.id, bookingDetails.status);
            notifyAppointmentUpdateStatus(bookingDetails.status);
        },
        onError: (err) => {
            toast.error(err.message);
        },
    });

    const handleStatusChange = (id: string, accepted: boolean) => {
        const status = accepted ? AppointmentStatus.ACCEPTED : AppointmentStatus.REJECT;
        updateBookingStatus({ id, accepted });
        updateAppointmentStatus(id, status);
    };

    const fetchAppointments = async () => {
        const token = await getToken();
        try {
            const response = await fetch('http://localhost:3000/api/booking_service/appointment', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            if (data.appointments) {
                setAppointments(data.appointments);
            }
        } catch (error) {
            console.error('Error fetching appointments:', error);
            setError('Failed to fetch appointments.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAppointments();
    }, [getToken]);

    return { appointments, setAppointments, error, loading, handleStatusChange, fetchAppointments };
};
