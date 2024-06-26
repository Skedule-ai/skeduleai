import React, { useState } from 'react';
import Container from '@/components/atoms/container';
import AcceptRejectCard from '@/components/atoms/card/AcceptRejectCard';
import Grid from '@/components/atoms/grid';
import { DashboardHeading } from '@/components/atoms/typography';
import { RowType } from '@/components/atoms/grid/grid.variants';
import { useManageAppointment, AppointmentResponseType } from '@/libs/hooks/useManageAppointment';
import { Loader } from '@strapi/icons';
import { AppointmentStatus } from '@/backend/utils/enum';

interface ManageAppointmentProps {
    onAccept: (appointment: AppointmentResponseType) => void;
    onReject: (appointment: AppointmentResponseType) => void;
}

const ManageAppointment: React.FC<ManageAppointmentProps> = ({ onAccept, onReject }) => {
    const { appointments, setAppointments, error, loading, handleStatusChange } =
        useManageAppointment();
    const [removingAppointments, setRemovingAppointments] = useState<Set<string>>(new Set());

    const handleAccept = (appointment: AppointmentResponseType) => {
        handleStatusChange(appointment.id, true);
        onAccept(appointment);
    };

    const handleReject = (appointment: AppointmentResponseType) => {
        handleStatusChange(appointment.id, false);
        onReject(appointment);
        setRemovingAppointments((prev) => new Set(prev).add(appointment.id));

        setTimeout(() => {
            setAppointments((prev) => prev.filter((a) => a.id !== appointment.id));
            setRemovingAppointments((prev) => {
                const newSet = new Set(prev);
                newSet.delete(appointment.id);
                return newSet;
            });
        }, 500); // Duration of the CSS transition
    };

    return (
        <Container className='overflow-x-auto'>
            <DashboardHeading>{'Meeting Proposals'}</DashboardHeading>
            {loading ? (
                <Loader className='animate-spin' />
            ) : error ? (
                <p>{error}</p>
            ) : appointments.length === 0 ? (
                <p>No meeting proposals yet.</p>
            ) : (
                <Grid
                    className='mt-4'
                    columns={3}
                    gap={4}
                    rows={Math.ceil(appointments.length / 3) as RowType}
                >
                    {appointments.map((appointment: AppointmentResponseType) => (
                        <AcceptRejectCard
                            key={appointment.id}
                            id={appointment.id}
                            fromTime={appointment.startTime}
                            toTime={appointment.endTime}
                            isFree
                            status={appointment.status}
                            onAccept={() => handleAccept(appointment)}
                            onReject={() => handleReject(appointment)}
                            title='Brainstorming session'
                            userImages={[
                                'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg',
                            ]}
                            variant='default'
                            showButtons={appointment.status !== AppointmentStatus.ACCEPTED}
                            className={removingAppointments.has(appointment.id) ? 'fade-out' : ''}
                        >
                            <></>
                        </AcceptRejectCard>
                    ))}
                </Grid>
            )}
        </Container>
    );
};

export default ManageAppointment;
