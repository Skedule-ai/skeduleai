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
    const { appointments, error, loading, handleStatusChange, fetchAppointments } =
        useManageAppointment();
    const [processingAppointments, setProcessingAppointments] = useState<Set<string>>(new Set());

    const handleAccept = async (appointment: AppointmentResponseType) => {
        handleStatusChange(appointment.id, true);
        onAccept(appointment);
        setProcessingAppointments((prev) => new Set(prev).add(appointment.id));
        await fetchAppointments();
    };

    const handleReject = async (appointment: AppointmentResponseType) => {
        handleStatusChange(appointment.id, false);
        onReject(appointment);
        setProcessingAppointments((prev) => new Set(prev).add(appointment.id));
        await fetchAppointments();
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
                            showButtons={appointment.status === AppointmentStatus.PENDING}
                            className={
                                processingAppointments.has(appointment.id)
                                    ? 'cursor-not-allowed opacity-50'
                                    : ''
                            }
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
