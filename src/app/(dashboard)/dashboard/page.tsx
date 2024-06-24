'use client';
import React, { useState, useEffect } from 'react';
import Date from '@/components/atoms/date/Date';
import TimeZone from '@/components/atoms/date/TimeZone';
// import SideBar from '@/components/organisms/sidebar';
import { Flex } from '@/components/atoms/flex';
import Container from '@/components/atoms/container';
import AcceptRejectCard from '@/components/atoms/card/AcceptRejectCard';
import AppointmentLinkCard from '@/components/atoms/card/AppointmentLinkCard';
import Grid from '@/components/atoms/grid';
import { Header2 } from '@/components/atoms/typography';
import Notification from '@/components/atoms/notification';
import { Information } from '@strapi/icons';
import { useAuth } from '@clerk/nextjs';
import { Field, Formik } from 'formik';
import toast, { Toaster } from 'react-hot-toast';
import { RowType } from '@/components/atoms/grid/grid.variants';

// export enum AppointmentStatus {
//     PENDING = 1,
//     ACCEPTED = 2,
//     REJECT = 3,
// }

const DashboardPage = () => {
    const { getToken } = useAuth();
    const [bookingUrl, setBookingUrl] = useState('');
    const [appointments, setAppointments] = useState<
        {
            id: string;
            startTime: string;
            endTime: string;
            status: number;
        }[]
    >([]);
    const [notificationMessage, setNotificationMessage] = useState<string | null>(null);
    const [, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const handleStatusChange = async (id: string, accepted: boolean) => {
        const token = await getToken();
        try {
            const response = await fetch('http://localhost:3000/api/booking_service/status', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ id, accepted }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const responseData = await response.json();
            const updatedStatus = responseData.bookingDetails.status;

            setAppointments((prevAppointments) =>
                prevAppointments.map((appointment) =>
                    appointment.id === id ? { ...appointment, status: updatedStatus } : appointment,
                ),
            );

            accepted
                ? toast.success('Appointment accepted successfully')
                : toast.error('Appointment rejected successfully');
        } catch (error) {
            console.error('Error updating appointment status:', error);
            toast.error('Failed to update appointment status.');
        }
    };

    const showNotification = (message: string) => {
        setNotificationMessage(message);
        setTimeout(() => setNotificationMessage(null), 3000); // Display for 3 seconds
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
            <Toaster />
            <Flex className='flex-col md:flex-row'>
                <Container className='flex-1 p-4'>
                    <Flex className='flex-col md:flex-row md:items-center'>
                        <Grid columns={2} rows={1} gap={2}>
                            <Date />
                            <Formik
                                initialValues={{ timeZone: 'UTC' }}
                                onSubmit={(values) => {
                                    console.log('Form values:', values);
                                }}
                            >
                                {({ values, setFieldValue }) => (
                                    <Field
                                        name='timeZone'
                                        component={TimeZone}
                                        timeZone={values.timeZone}
                                        onTimeZoneChange={(zone: string) =>
                                            setFieldValue('timeZone', zone)
                                        }
                                        showDropdown={false}
                                        toggleDropdown={() => console.log('Toggle Dropdown')}
                                        searchQuery=''
                                        onSearchQueryChange={(query: string) =>
                                            console.log('Search Query:', query)
                                        }
                                    />
                                )}
                            </Formik>

                            {notificationMessage && (
                                <Notification
                                    className='ml-8 items-center justify-center'
                                    icon={<Information />}
                                    type='info'
                                    width='small'
                                >
                                    {notificationMessage}
                                </Notification>
                            )}
                            {/* <TimeZone field={undefined} form={undefined} meta={undefined} /> */}
                        </Grid>
                    </Flex>
                    <Flex className='mt-6 flex-col'>
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
                                            onAccept={() =>
                                                handleStatusChange(appointment.id, true)
                                            }
                                            onReject={() =>
                                                handleStatusChange(appointment.id, false)
                                            }
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
                            <Grid className='mt-2' columns={1} gap={4} rows={1}>
                                <AppointmentLinkCard
                                    isFree
                                    size='lg'
                                    title='Add Organization Staff'
                                    subtitle='Service provider page'
                                    link={shortUrl}
                                    fullLink={bookingUrl}
                                    variant='default'
                                    onCopySuccess={showNotification} // Pass the function
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
