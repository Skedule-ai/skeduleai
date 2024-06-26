// pages/index.tsx
'use client';

import Date from '@/components/atoms/date/Date';
import TimeZone from '@/components/atoms/date/TimeZone';
import React, { useEffect, useState } from 'react';
import { Flex } from '@/components/atoms/flex';
import Container from '@/components/atoms/container';
import AppointmentLinkCard from '@/components/atoms/card/AppointmentLinkCard';
import Grid from '@/components/atoms/grid';
import { Header2 } from '@/components/atoms/typography';
import Notification from '@/components/atoms/notification';
import { Information } from '@strapi/icons';
import { useAuth } from '@clerk/nextjs';
import { Field, Formik } from 'formik';
import { Toaster } from 'react-hot-toast';
import ManageAppointment from '@/components/organisms/appointments/manage-appointment';
import MeetingOverview from '@/components/atoms/card/MeetingOverviewCard';
import CardLoader from '@/components/organisms/loader/CardLoader';

const DashboardPage = () => {
    const { getToken } = useAuth();
    const [bookingUrl, setBookingUrl] = useState('');
    const [notificationMessage, setNotificationMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

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
                setLoading(false);
            } catch (error) {
                console.error('Error fetching booking data:', error);
                setLoading(false);
            }
        };

        fetchBookingData();
    }, [getToken]);

    const shortUrl = bookingUrl ? `/${bookingUrl.split('/').pop()}` : '';

    // Dummy meetings data
    const meetings = [
        {
            id: '1',
            title: 'Brainstorming session',
            fromTime: '1:30 PM',
            toTime: '2:30 PM',
            isFree: true,
            userImages: ['https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg'],
            status: 0,
            children: null,
        },
    ];
    // Dummy meetings data

    return (
        <>
            <Toaster />
            <Flex className='flex-col md:flex-row'>
                <Container className='flex-1 p-4'>
                    <Flex className='mb-6 flex-col md:flex-row md:items-center'>
                        {loading ? (
                            <CardLoader />
                        ) : (
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
                            </Grid>
                        )}
                        {notificationMessage && (
                            <Notification
                                className='ml-8 mt-4 items-center justify-center'
                                icon={<Information />}
                                type='info'
                                width='small'
                            >
                                {notificationMessage}
                            </Notification>
                        )}
                    </Flex>

                    <Flex className='mb-6 flex-col'>
                        {loading ? <CardLoader /> : <ManageAppointment />}
                    </Flex>

                    <Flex className='mb-6 flex-col'>
                        <Container>
                            <Header2>{'Share Appointment Link'}</Header2>

                            <Grid className='mt-2' columns={1} gap={4} rows={1}>
                                {loading ? (
                                    <CardLoader />
                                ) : (
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
                                )}
                            </Grid>
                        </Container>
                    </Flex>

                    <Flex className='mb-6 flex-col'>
                        <Container>
                            <Header2>{'Weekly Meeting Overview'}</Header2>
                            {loading ? (
                                <CardLoader />
                            ) : (
                                <Grid className='mt-2' columns={4} gap={4}>
                                    {meetings.map((meeting) => (
                                        <MeetingOverview key={meeting.id} {...meeting} />
                                    ))}
                                </Grid>
                            )}
                        </Container>
                    </Flex>
                </Container>
            </Flex>
        </>
    );
};

export default DashboardPage;
