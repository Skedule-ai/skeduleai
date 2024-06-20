'use client';

import Date from '@/components/atoms/date/Date';
import TimeZone from '@/components/atoms/date/TimeZone';
import React, { useEffect, useState } from 'react';
import { Flex } from '@/components/atoms/flex';
import Container from '@/components/atoms/container';
import AcceptRejectCard from '@/components/atoms/card/AcceptRejectCard';
import AppointmentLinkCard from '@/components/atoms/card/AppointmentLinkCard';
import Grid from '@/components/atoms/grid';
import { Header2 } from '@/components/atoms/typography';
import Notification from '@/components/atoms/notification';
import { useAuth } from '@clerk/nextjs';
import { Information, Loader } from '@strapi/icons';

const DashboardPage = () => {
    const { getToken } = useAuth();
    const [bookingUrl, setBookingUrl] = useState('');
    const [appointments, setAppointments] = useState([]);
    const [notificationMessage, setNotificationMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const showNotification = (message: string) => {
        setNotificationMessage(message);
        setTimeout(() => setNotificationMessage(null), 3000);
    };

    useEffect(() => {
        const fetchBookingData = async () => {
            const token = await getToken();
            try {
                const response = await fetch(
                    'http://localhost:3000/api/booking_service?organizationId=',
                    {
                        method: 'GET',
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    },
                );
                const data = await response.json();
                if (data.bookingService && data.bookingService.bookingUrl) {
                    setBookingUrl(data.bookingService.bookingUrl);
                }
            } catch (error) {
                console.error('Error fetching booking data:', error);
            }
        };

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
                setError('Failed to fetch appointments.');
            } finally {
                setLoading(false);
            }
        };

        fetchBookingData();
        fetchAppointments();
    }, [getToken]);

    const shortUrl = bookingUrl ? `/${bookingUrl.split('/').pop()}` : '';

    return (
        <>
            <Flex className='flex-col md:flex-row'>
                <Container className='flex-1 p-4'>
                    <Flex className='flex-col md:flex-row md:items-center'>
                        <Grid columns={2} rows={1} gap={2}>
                            <Date />
                            <TimeZone />
                        </Grid>
                        {notificationMessage && (
                            <Notification
                                className='ml-8 items-center justify-center'
                                icon={<Information />}
                                type='info'
                            >
                                {notificationMessage}
                            </Notification>
                        )}
                    </Flex>
                    <Flex className='mt-6 flex-col'>
                        <Container className='overflow-x-auto'>
                            <Header2>{'Meeting Proposals'}</Header2>
                            {loading ? (
                                <Loader className='animate-spin' />
                            ) : error ? (
                                <p>{error}</p>
                            ) : appointments.length === 0 ? (
                                <p>No meeting proposals yet.</p>
                            ) : (
                                <Grid
                                    className='mt-4'
                                    columns={4}
                                    gap={4}
                                    rows={Math.ceil(appointments.length / 3)}
                                >
                                    {appointments.map((appointment) => (
                                        <AcceptRejectCard
                                            key={appointment.id}
                                            fromTime={appointment.startTime}
                                            toTime={appointment.endTime}
                                            isFree
                                            onAccept={() => {}}
                                            onReject={() => {}}
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
                    </Flex>
                    <Flex className='mt-6 flex-col'>
                        <Container>
                            <Header2>{'Share Appointment Link'}</Header2>
                            <Grid className='mt-4' columns={1} gap={4} rows={1}>
                                <AppointmentLinkCard
                                    isFree
                                    size='lg'
                                    title='Add Organization Staff'
                                    subtitle='Service provider page'
                                    link={shortUrl}
                                    onCopySuccess={showNotification}
                                    fullLink={bookingUrl}
                                    variant='default'
                                >
                                    <></>
                                </AppointmentLinkCard>
                            </Grid>
                        </Container>
                    </Flex>
                </Container>
            </Flex>
        </>
    );
};

export default DashboardPage;
