'use client';

import React from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { Flex } from '@/components/atoms/flex';
import Input from '@/components/atoms/fields';
import Button from '@/components/atoms/button';
import { ErrorTitle } from '@/components/atoms/typography';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Loader } from '@strapi/icons';
import useBookAppointment from '@/libs/hooks/useBookAppointment';

const GuestFormSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    contactNumber: Yup.string().required('Contact number is required'),
});

type FormDataType = {
    meetingDuration: string;
    selectDate: string | Date;
    selectTime: string;
    timeZone: string;
};

interface GuestFormProps {
    serviceId: string;
    onClose: () => void;
    formData: FormDataType;
}

const GuestForm: React.FC<GuestFormProps> = ({ serviceId, formData }) => {
    const router = useRouter();

    const { bookAppointment, isLoading, error } = useBookAppointment(serviceId, {
        onCompleted: (responseData: any) => {
            console.log('Booking Response Data: ', responseData);

            const bookingId = responseData?.appointment?.id;

            if (bookingId) {
                router.push(`/booking/confirm/${bookingId}`);
            } else {
                console.log('Booking Id is undefined');
            }
        },

        onError: () => {
            toast.error('Failed to book the appointment');
        },
    });

    const initialValues = {
        name: '',
        email: '',
        contactNumber: '',
    };

    const handleSubmit = async (values: any) => {
        const payload = {
            serviceId,
            timezone: formData.timeZone,
            startTime: '2024-06-25T08:00:00Z',
            endTime: '2024-06-25T09:00:00Z',
            name: values.name,
            email: values.email,
            phoneNumber: values.contactNumber,
        };

        try {
            await bookAppointment(payload);
        } catch (error) {
            toast.error('Failed to schedule appointment. Please try again later.');
        }
    };

    return (
        <>
            <Toaster />
            <Formik
                initialValues={initialValues}
                validationSchema={GuestFormSchema}
                onSubmit={handleSubmit}
            >
                {({ errors, touched }) => (
                    <Form className='w-full'>
                        <Flex dir='column' gap={3}>
                            <Field name='name' as={Input} placeholder='Enter your Name' />
                            {errors.name && touched.name ? (
                                <ErrorTitle>{errors.name}</ErrorTitle>
                            ) : null}

                            <Field name='email' as={Input} placeholder='Enter your Email' />
                            {errors.email && touched.email ? (
                                <ErrorTitle>{errors.email}</ErrorTitle>
                            ) : null}

                            <Field
                                name='contactNumber'
                                as={Input}
                                placeholder='Enter your Contact number'
                            />
                            {errors.contactNumber && touched.contactNumber ? (
                                <ErrorTitle>{errors.contactNumber}</ErrorTitle>
                            ) : null}

                            <Flex justifyContent='center' className='mt-5'>
                                {error && <ErrorTitle>{error}</ErrorTitle>}
                                <Button
                                    className={`flex ${isLoading ? 'w-56' : 'w-48'} bg-white`}
                                    type='submit'
                                    size='lg'
                                    color='outline'
                                >
                                    {isLoading && <Loader className='animate-spin' />}
                                    Schedule Appointment
                                </Button>
                            </Flex>
                        </Flex>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default GuestForm;
