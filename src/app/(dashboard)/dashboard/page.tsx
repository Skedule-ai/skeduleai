'use client';

import Date from '@/components/atoms/date/Date';
import { Flex } from '@/components/atoms/flex';
import Container from '@/components/atoms/container';
import AppointmentLinkCard from '@/components/atoms/card/AppointmentLinkCard';
import Grid from '@/components/atoms/grid';
import { DashboardHeading } from '@/components/atoms/typography';
import { Toaster, toast } from 'react-hot-toast';
import ManageAppointment from '@/components/organisms/appointments/manage-appointment';
import useBookingUrl from '@/libs/hooks/useBookingUrl';
import { getTodayDate } from '@/libs/utils/datetime-helpers';
import { Loader } from '@strapi/icons';
import Button from '@/components/atoms/button';
import { AppointmentResponseType } from '@/libs/hooks/useManageAppointment';
import AcceptRejectCard from '@/components/atoms/card/AcceptRejectCard';
import { AppointmentStatus } from '@/backend/utils/enum';
import { useState, useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';

const DashboardPage: React.FC = () => {
    const { getToken } = useAuth();
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [bookingUrl, setBookingUrl] = useState<string | null>(null);
    const [acceptedAppointments, setAcceptedAppointments] = useState<AppointmentResponseType[]>([]);
    const [processingAppointments, setProcessingAppointments] = useState<Set<string>>(new Set());

    const handleCompleted = (data: any) => {
        if (data.bookingService && data.bookingService.bookingUrl) {
            setBookingUrl(data.bookingService.bookingUrl);
        } else {
            toast.error('Booking URL not found');
        }
    };

    const handleError = (error: any) => {
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

    const fetchAcceptedAppointments = async () => {
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
                setAcceptedAppointments(
                    data.appointments.filter(
                        (appointment: AppointmentResponseType) =>
                            appointment.status === AppointmentStatus.ACCEPTED,
                    ),
                );
            }
        } catch (error) {
            console.error('Error fetching accepted appointments:', error);
        }
    };

    useEffect(() => {
        fetchAcceptedAppointments();
    }, [getToken]);

    const handleAccept = (appointment: AppointmentResponseType) => {
        toast.success('Meeting Accepted Successfully');
        setAcceptedAppointments((prev) => [...prev, appointment]);
        setProcessingAppointments((prev) => new Set(prev).add(appointment.id));
        fetchAcceptedAppointments()
    };

    const handleReject = (appointment: AppointmentResponseType) => {
        toast.error('Meeting Rejected Successfully');
        setProcessingAppointments((prev) => new Set(prev).add(appointment.id));
        fetchAcceptedAppointments()
    };

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
                        <ManageAppointment onAccept={handleAccept} onReject={handleReject} />
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
                            <Flex className='mt-10' dir='column' gap={2}>
                                <DashboardHeading>{'Weekly meetings Overview'}</DashboardHeading>
                                <Grid columns={3} gap={4} rows={1}>
                                    {acceptedAppointments.map((appointment) => (
                                        <AcceptRejectCard
                                            key={appointment.id}
                                            id={appointment.id}
                                            fromTime={appointment.startTime}
                                            toTime={appointment.endTime}
                                            isFree
                                            status={AppointmentStatus.ACCEPTED}
                                            title='Accepted Appointment'
                                            userImages={[
                                                'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg',
                                            ]}
                                            variant='default'
                                            showButtons={false}
                                        >
                                            <></>
                                        </AcceptRejectCard>
                                    ))}
                                </Grid>
                            </Flex>
                        </Container>
                    </Flex>
                </Container>
            </Flex>
        </>
    );
};

export default DashboardPage;
