'use client';

import React from 'react';
import { Formik, Field, Form } from 'formik';
import BookingManageSchema from '@/components/organisms/validations/booking-manage-form-validation';
import Container from '@/components/atoms/container';
import InfoCard from '@/components/atoms/card/InfoCard';
import Input from '@/components/atoms/fields';
import { Flex } from '@/components/atoms/flex';
import PageHeader from '@/components/atoms/pageheader';
import { Header1, Header3, ErrorTitle } from '@/components/atoms/typography';
import Button from '@/components/atoms/button';

const BookAppointmentsPage: React.FC = () => {
    const initialValues = {
        meetingDuration: '',
        selectDate: '',
        selectTime: '',
        timeZone: '',
    };

    return (
        <Container center>
            <PageHeader
                logoSrc='https://randomuser.me/api/portraits/men/1.jpg'
                OrganizationName='Organization name'
                logoAlt='Logo'
            />
            <Flex dir='row' justifyContent='between' alignItems='center' className='mt-10 p-4'>
                <Flex dir='column' gap={4} className='h-auto w-1/2 pl-32'>
                    <Header1>Hey There!</Header1>
                    <Header3>
                        Schedule your appointment in just a few easy steps: Select a service, choose
                        your date and time, and enter your details. We look forward to seeing you!
                    </Header3>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={BookingManageSchema}
                        onSubmit={(values) => console.log(values)}
                    >
                        {({ errors, touched }) => (
                            <Form className='w-80'>
                                <Flex dir='column' gap={3}>
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
                                        // type='date'
                                        as={Input}
                                        placeholder='Select date'
                                    />
                                    {errors.selectDate && touched.selectDate ? (
                                        <ErrorTitle className=''>{errors.selectDate}</ErrorTitle>
                                    ) : null}

                                    <Field
                                        name='selectTime'
                                        // type='time'
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
                            </Form>
                        )}
                    </Formik>
                </Flex>

                <Flex dir='row' justifyContent='center' className='h-auto w-1/2'>
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
            <Flex dir='row' justifyContent='center' alignItems='center' className='mt-10'>
                <Button size='lg' color='outline'>
                    Book Appointment{' '}
                </Button>
            </Flex>
        </Container>
    );
};

export default BookAppointmentsPage;
