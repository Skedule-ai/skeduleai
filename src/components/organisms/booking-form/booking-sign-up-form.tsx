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
import { useSignUp } from '@clerk/clerk-react';
// import Cookies from 'js-cookie';
import useBookAppointment from '@/libs/hooks/useBookAppointment';

const SignUpFormSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phone: Yup.string().required('Phone number is required'),
    password: Yup.string().required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Confirm Password is required'),
});

type FormDataType = {
    meetingDuration: string;
    selectDate: string | Date;
    selectTime: string;
    timeZone: string;
};

interface SignUpFormProps {
    formData: FormDataType;
    serviceId: string;
    onClose: () => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ formData, serviceId, onClose }) => {
    const router = useRouter();
    const { signUp } = useSignUp();
    const { bookAppointment, isLoading, error } = useBookAppointment(serviceId, {
        onCompleted: (responseData: any) => {
            const bookingId = responseData?.appointment?.id;
            if (bookingId) {
                router.push(`/booking/confirm/${bookingId}`);
            } else {
                toast.error('Booking ID is undefined');
            }
        },
        onError: () => {
            toast.error('Failed to book the appointment');
        },
    });

    const initialValues = {
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
    };

    const handleSubmit = async (values: any, { setErrors }: any) => {
        const payload = {
            serviceId,
            timezone: formData.timeZone,
            startTime: '2024-06-25T08:00:00Z',
            endTime: '2024-06-25T09:00:00Z',
        };

        try {
            if (!signUp) {
                toast.error('SignUp resource is unavailable. Please try again later.');
                return;
            }

            const signUpResponse = await signUp.create({
                emailAddress: values.email,
                password: values.password,
                username: values.name,
                phoneNumber: values.phone,
            });

            if (signUpResponse.status === 'complete') {
                // Cookies.set('userSession', JSON.stringify(signUpResponse.session));
                await bookAppointment(payload);
                toast.success('Signed up and appointment booked successfully');
                onClose();
            } else {
                console.error('SignUp response incomplete:', signUpResponse);
                toast.error('Failed to sign up');
            }
        } catch (error: any) {
            console.error('SignUp error:', error);
            if (error.errors) {
                const formErrors: any = {};
                error.errors.forEach((err: any) => {
                    if (err.meta?.param_name) {
                        formErrors[err.meta.param_name] = err.long_message;
                    }
                });
                setErrors(formErrors);
            } else {
                toast.error('Failed to sign up. Please try again.');
            }
        }
    };

    return (
        <>
            <Toaster />
            <Formik
                initialValues={initialValues}
                validationSchema={SignUpFormSchema}
                onSubmit={handleSubmit}
            >
                {({ errors, touched }) => (
                    <Form className='w-full'>
                        <Flex dir='column' gap={3}>
                            <Field name='name' as={Input} placeholder='Enter your name' />
                            {errors.name && touched.name ? (
                                <ErrorTitle>{errors.name}</ErrorTitle>
                            ) : null}

                            <Field name='email' as={Input} placeholder='Enter your email' />
                            {errors.email && touched.email ? (
                                <ErrorTitle>{errors.email}</ErrorTitle>
                            ) : null}

                            <Field name='phone' as={Input} placeholder='Enter your phone number' />
                            {errors.phone && touched.phone ? (
                                <ErrorTitle>{errors.phone}</ErrorTitle>
                            ) : null}

                            <Field
                                name='password'
                                as={Input}
                                type='password'
                                placeholder='Enter your password'
                            />
                            {errors.password && touched.password ? (
                                <ErrorTitle>{errors.password}</ErrorTitle>
                            ) : null}

                            <Field
                                name='confirmPassword'
                                as={Input}
                                type='password'
                                placeholder='Confirm your password'
                            />
                            {errors.confirmPassword && touched.confirmPassword ? (
                                <ErrorTitle>{errors.confirmPassword}</ErrorTitle>
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

export default SignUpForm;
