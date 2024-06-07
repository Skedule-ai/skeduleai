'use client';

import React, { useEffect, useState } from 'react';
import { Formik, Field, Form } from 'formik';
import BookingManageSchema from '@/components/organisms/validations/booking-manage-form-validation';
import Container from '@/components/atoms/container';
import InfoCard from '@/components/atoms/card/InfoCard';
import Input from '@/components/atoms/fields';
import { Flex } from '@/components/atoms/flex';
import PageHeader from '@/components/atoms/pageheader';
import { Header1, Header3, ErrorTitle, IconTitle } from '@/components/atoms/typography';
import Button from '@/components/atoms/button';
import BookingModal from '@/components/atoms/modals/BookingModal';
import BookingModalMobile from '@/components/atoms/modals/booking-modal-mobile';
import { ArrowLeft } from '@strapi/icons';

const BookAppointmentsPage: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenMobile, setIsOpenMobile] = useState(false);
    const [isMediumOrLarger, setIsMediumOrLarger] = useState(false);

    const [formData, setFormData] = useState({
        meetingDuration: '',
        selectDate: '',
        selectTime: '',
        timeZone: '',
    });

    const initialValues = {
        meetingDuration: '',
        selectDate: '',
        selectTime: '',
        timeZone: '',
    };

    const handleSubmit = (values: typeof initialValues) => {
        setFormData(values);
        if (isMediumOrLarger) {
            setIsOpen(true);
        } else {
            setIsOpenMobile(true);
        }
    };

    useEffect(() => {
        const handleResize = () => {
            setIsMediumOrLarger(window.innerWidth >= 768); // Tailwind's `md` breakpoint is 768px
        };

        // Check the screen size on mount
        handleResize();

        // Add event listener for window resize
        window.addEventListener('resize', handleResize);

        // Remove event listener on cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <Container center>
            <PageHeader
                logoSrc='https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg'
                OrganizationName='Organization name'
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
                            initialValues={initialValues}
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
                                            type='time'
                                            as={Input}
                                            placeholder='Select time'
                                        />
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
                            imageUrl='https://images.unsplash.com/photo-1533450718592-29d45635f0a9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80'
                            onClick={() => {}}
                            size='lg'
                            subtitle='This is a subtitle'
                            title='Default Title'
                            variant='default'
                        />
                    </Flex>
                </Flex>
            )}

            {isOpen && isMediumOrLarger && (
                <BookingModal
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    formData={formData}
                />
            )}

            {isOpenMobile && !isMediumOrLarger && (
                <BookingModalMobile
                    isOpen={isOpenMobile}
                    onClose={() => setIsOpenMobile(false)}
                    formData={formData}
                />
            )}
        </Container>
    );
};

export default BookAppointmentsPage;
