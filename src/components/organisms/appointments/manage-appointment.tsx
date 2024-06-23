'use client';
import React from 'react';
import Container from '@/components/atoms/container';
import AcceptRejectCard from '@/components/atoms/card/AcceptRejectCard';
import Grid from '@/components/atoms/grid';
import { Header2 } from '@/components/atoms/typography';
import { RowType } from '@/components/atoms/grid/grid.variants';
import { useManageAppointment } from '@/libs/hooks/useManageAppointment';

const ManageAppointment = () => {
    const { appointments, error, handleStatusChange } = useManageAppointment();
    return (
        <Container className='overflow-x-auto'>
            <Header2>{'Meeting Proposals'}</Header2>
            {error ? (
                <p>{error}</p>
            ) : appointments.length === 0 ? (
                <p>No meeting proposals yet.</p>
            ) : (
                <Grid
                    className='mt-4'
                    columns={4}
                    gap={4}
                    rows={Math.ceil(appointments.length / 3) as RowType}
                >
                    {appointments.map((appointment) => (
                        <AcceptRejectCard
                            key={appointment.id}
                            id={appointment.id}
                            fromTime={appointment.startTime}
                            toTime={appointment.endTime}
                            isFree
                            status={appointment.status}
                            onAccept={() => handleStatusChange(appointment.id, true)}
                            onReject={() => handleStatusChange(appointment.id, false)}
                            title='Brainstorming session'
                            userImages={[
                                'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg',
                            ]}
                            variant='default'
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
