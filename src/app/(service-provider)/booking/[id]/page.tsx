'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Formik, Field, Form } from 'formik';
import BookingManageSchema from '@/components/organisms/validations/booking-manage-form-validation';
import toast, { Toaster } from 'react-hot-toast';
import Container from '@/components/atoms/container';
import PageHeader from '@/components/atoms/pageheader';
import { Flex } from '@/components/atoms/flex';
import { ErrorTitle, Header1, Header3 } from '@/components/atoms/typography';
import Input from '@/components/atoms/fields';
import Button from '@/components/atoms/button';
import InfoCard from '@/components/atoms/card/InfoCard';
import BookingModal from '@/components/atoms/modals/BookingModal';
import BookingModalMobile from '@/components/atoms/modals/booking-modal-mobile';

const BookAppointmentsPage: React.FC = ({ params }: any) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenMobile, setIsOpenMobile] = useState(false);
    const [isMediumOrLarger, setIsMediumOrLarger] = useState(false);
    const [formData, setFormData] = useState({
        meetingDuration: '',
        selectDate: '',
        selectTime: '',
        timeZone: '',
    });
    const [serviceProvider, setServiceProvider] = useState<any>(null);
    const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
    const id = params.id;
    const router = useRouter();

    useEffect(() => {
        const handleResize = () => {
            setIsMediumOrLarger(window.innerWidth >= 768);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        const fetchServiceProviderDetails = async () => {
            try {
                const response = await fetch(
                    `http://localhost:3000/api/customer/appointment/${id}`
                );
                const data = await response.json();
                setServiceProvider(data.bookingService.serviceProvider);
                setAvailableTimeSlots(data.bookingService.timeSlots);
                toast.success('Successfully fetched the Service Provider Details')
            } catch (error) {
                console.error('Error fetching service provider details:', error);
                toast.error('Failed to fetch service provider details.');
                router.push('/404');
            }
        };

        if (id) {
            fetchServiceProviderDetails();
        }
    }, [id, router]);

    const handleSubmit = (values: typeof formData) => {
        setFormData(values);
        if (isMediumOrLarger) {
            setIsOpen(true);
        } else {
            setIsOpenMobile(true);
        }
    };

    const handleBooking = async (appointmentData: any) => {
        try {
            await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bookAppointment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(appointmentData),
            });
            toast.success('Appointment booked successfully.');
        } catch (error) {
            console.error('Error booking appointment:', error);
            toast.error('Failed to book appointment.');
        }
    };

    const handleGuestSubmit = (guestData: any) => {
        const appointmentData = {
            ...guestData,
            serviceId: id,
            date: formData.selectDate,
            time: formData.selectTime,
        };
        handleBooking(appointmentData);
    };

    const handleAuthSubmit = async () => {
        const appointmentData = {
            serviceId: id,
            date: formData.selectDate,
            time: formData.selectTime,
        };
        localStorage.setItem('appointmentData', JSON.stringify(appointmentData));
        router.push('/sign-in');
    };

    return (
        <Container center>
            <Toaster />
            <PageHeader
                logoSrc={serviceProvider?.image || 'default-logo.jpg'}
                OrganizationName={serviceProvider?.name || 'Organization name'}
                logoAlt='Logo'
            />

            {!isOpenMobile && (
                <Flex
                    dir='row'
                    justifyContent='between'
                    alignItems='center'
                    className='mt-10 w-screen p-4'
                >
                    <Flex dir='column' gap={4} className='m-5 h-auto md:m-0 md:pl-32 lg:w-1/2'>
                        <Header1>Hey There!</Header1>
                        <Header3>
                            Schedule your appointment in just a few easy steps: Select a service,
                            choose your date and time, and enter your details. We look forward to
                            seeing you!
                        </Header3>
                        <Formik
                            initialValues={formData}
                            validationSchema={BookingManageSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ errors, touched }) => (
                                <Form className='md:w-80'>
                                    <Flex dir='column' gap={3} className='w-full md:w-auto'>
                                        <Field
                                            name='meetingDuration'
                                            as={Input}
                                            placeholder='Meeting duration'
                                        />
                                        {errors.meetingDuration && touched.meetingDuration ? (
                                            <ErrorTitle>{errors.meetingDuration}</ErrorTitle>
                                        ) : null}
                                        <Field
                                            name='selectDate'
                                            type='date'
                                            as={Input}
                                            placeholder='Select date'
                                        />
                                        {errors.selectDate && touched.selectDate ? (
                                            <ErrorTitle className=''>
                                                {errors.selectDate}
                                            </ErrorTitle>
                                        ) : null}

                                        <Field
                                            name='selectTime'
                                            as='select'
                                            placeholder='Select time'
                                        >
                                            {availableTimeSlots.map((slot: any, index: number) => (
                                                <option key={index} value={slot.startTime}>
                                                    {slot.startTime}
                                                </option>
                                            ))}
                                        </Field>
                                        {errors.selectTime && touched.selectTime ? (
                                            <ErrorTitle>{errors.selectTime}</ErrorTitle>
                                        ) : null}

                                        <Field name='timeZone' as={Input} placeholder='Time zone' />
                                        {errors.timeZone && touched.timeZone ? (
                                            <ErrorTitle>{errors.timeZone}</ErrorTitle>
                                        ) : null}
                                    </Flex>
                                    <Flex
                                        dir='row'
                                        justifyContent='center'
                                        className='md:flex md:justify-start'
                                    >
                                        <Button
                                            className='mt-10'
                                            type='submit'
                                            size='lg'
                                            color='outline'
                                        >
                                            Book Appointment
                                        </Button>
                                    </Flex>
                                </Form>
                            )}
                        </Formik>
                    </Flex>

                    <Flex dir='row' justifyContent='center' className='hidden h-auto w-1/2 lg:flex'>
                        <InfoCard
                            batchColor='green'
                            batchState='default'
                            buttonText='designation'
                            imageUrl={serviceProvider?.image || 'default-image.jpg'}
                            onClick={() => {}}
                            size='lg'
                            subtitle='Service Provider'
                            title={serviceProvider?.name || 'Service Provider Name'}
                            variant='default'
                        >
                            <p></p>
                        </InfoCard>
                    </Flex>
                </Flex>
            )}

            {isOpen && isMediumOrLarger && (
                <BookingModal
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    formData={formData}
                    handleGuestSubmit={handleGuestSubmit}
                    handleAuthSubmit={handleAuthSubmit}
                />
            )}

            {isOpenMobile && !isMediumOrLarger && (
                <BookingModalMobile
                    isOpen={isOpenMobile}
                    onClose={() => setIsOpenMobile(false)}
                    formData={formData}
                    handleGuestSubmit={handleGuestSubmit}
                    handleAuthSubmit={handleAuthSubmit}
                />
            )}
        </Container>
    );
};

export default BookAppointmentsPage;
