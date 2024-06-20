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

const DashboardPage = () => {
    const [notificationMessage, setNotificationMessage] = useState<string | null>(null);

    const showNotification = (message: string) => {
        setNotificationMessage(message);
        setTimeout(() => setNotificationMessage(null), 3000); // Display for 3 seconds
    };

import { useAuth } from '@clerk/nextjs';

const DashboardPage = () => {
    const [bookingUrl, setBookingUrl] = useState('');
    const { getToken } = useAuth();

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const shortUrl = bookingUrl ? `/${bookingUrl.split('/').pop()}` : '';
    return (
        <>
            <Flex className='flex-col md:flex-row'>
                {/* <SideBar /> */}
                <Container className='flex-1 p-4'>
                    <Flex className='flex-col md:flex-row md:items-center'>
                        <Grid columns={2} rows={1} gap={2}>
                            <Date />
                            {/* <TimeZone /> */}
                        </Grid>
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
                            <TimeZone />
                        </Grid>
                    </Flex>
                    <Flex className='mt-6 flex-col'>
                        <Container className='overflow-x-auto'>
                            <Header2>{'Meeting Proposals'}</Header2>
                            <Grid className='mt-4' columns={3} gap={4} rows={1}>
                                <AcceptRejectCard
                                    fromTime='12:30 PM'
                                    isFree
                                    onAccept={() => {}}
                                    onReject={() => {}}
                                    title='Brainstorming session'
                                    toTime='04:36 PM IST'
                                    userImages={[
                                        'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg',
                                    ]}
                                    variant='default'
                                >
                                    <></>
                                </AcceptRejectCard>
                                <AcceptRejectCard
                                    fromTime='12:30 PM'
                                    isFree
                                    onAccept={() => {}}
                                    onReject={() => {}}
                                    title='Brainstorming session'
                                    toTime='04:36 PM IST'
                                    userImages={[
                                        'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg',
                                    ]}
                                    variant='default'
                                >
                                    <></>
                                </AcceptRejectCard>
                                <AcceptRejectCard
                                    fromTime='12:30 PM'
                                    isFree
                                    onAccept={() => {}}
                                    onReject={() => {}}
                                    title='Brainstorming session'
                                    toTime='04:36 PM IST'
                                    userImages={[
                                        'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg',
                                    ]}
                                    variant='default'
                                >
                                    <></>
                                </AcceptRejectCard>
                            </Grid>
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
