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

const DashboardPage = () => {
    const { getToken } = useAuth();
    const [bookingUrl, setBookingUrl] = useState('');
    const [notificationMessage, setNotificationMessage] = useState<string | null>(null);

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

        fetchBookingData();
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
                        </Grid>
                    </Flex>
                    <Flex className='mt-6 flex-col'>
                        <ManageAppointment />
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
