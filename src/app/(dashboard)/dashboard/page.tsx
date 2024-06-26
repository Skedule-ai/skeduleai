'use client';

import React, { useState, useEffect } from 'react';
import Date from '@/components/atoms/date/Date';
import { Flex } from '@/components/atoms/flex';
import Container from '@/components/atoms/container';
import AppointmentLinkCard from '@/components/atoms/card/AppointmentLinkCard';
import Grid from '@/components/atoms/grid';
import { DashboardHeading, Header2 } from '@/components/atoms/typography';
import { Toaster, toast } from 'react-hot-toast';
import ManageAppointment from '@/components/organisms/appointments/manage-appointment';
import useBookingUrl from '@/libs/hooks/useBookingUrl';
// import { Listbox } from '@headlessui/react';
import { getTodayDate } from '@/libs/utils/datetime-helpers';
import { Loader } from '@strapi/icons';
import Button from '@/components/atoms/button';

const DashboardPage = () => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [bookingUrl, setBookingUrl] = useState<string | null>(null);

    const handleCompleted = (data) => {
        if (data.bookingService && data.bookingService.bookingUrl) {
            setBookingUrl(data.bookingService.bookingUrl);
        } else {
            toast.error('Booking URL not found');
        }
    };

    const handleError = (error) => {
        toast.error('Error fetching booking data');
        console.error('Error fetching booking data:', error);
    };

    const { isLoading, error } = useBookingUrl({
        onCompleted: handleCompleted,
        onError: handleError,
    });

    useEffect(() => {
        if (error) {
            toast.error('Error fetching booking data');
        }
    }, [error]);

    const shortUrl = bookingUrl ? `/${bookingUrl.split('/').pop()}` : '';

    return (
        <>
            <Toaster />
            <Flex className='flex-col md:flex-row'>
                <Container className='flex-1 p-4'>
                    <Flex className='flex-col md:flex-row md:items-center'>
                        <Flex gap={6}>
                            <Button
                                color='tertiary'
                                size='md'
                                onClick={() => setSelectedDate(getTodayDate())}
                            >
                                Today
                            </Button>
                            <Date />
                        </Flex>
                    </Flex>
                    <Flex className='mt-6 flex-col'>
                        <ManageAppointment />
                    </Flex>
                    <Flex className='mt-6 flex-col'>
                        <Container>
                            <DashboardHeading>{'Share Appointment Link'}</DashboardHeading>
                            <Grid className='mt-2' columns={1} gap={4} rows={1}>
                                {isLoading && (
                                    <div>
                                        <Loader className='animate-spin' />
                                    </div>
                                )}
                                {!isLoading && bookingUrl && (
                                    <AppointmentLinkCard
                                        isFree
                                        size='lg'
                                        title='Add Organization Staff'
                                        subtitle='Service provider page'
                                        link={shortUrl}
                                        fullLink={bookingUrl}
                                        variant='default'
                                        onCopySuccess={() =>
                                            toast.success('Link copied successfully!')
                                        }
                                    >
                                        <></>
                                    </AppointmentLinkCard>
                                )}
                            </Grid>
                        </Container>
                    </Flex>
                </Container>
            </Flex>
        </>
    );
};

export default DashboardPage;
