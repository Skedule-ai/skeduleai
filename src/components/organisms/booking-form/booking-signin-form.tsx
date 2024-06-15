'use client';

import React from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { useSignIn } from '@clerk/clerk-react';
import { Flex } from '@/components/atoms/flex';
import Input from '@/components/atoms/fields';
import Button from '@/components/atoms/button';
import { ErrorTitle } from '@/components/atoms/typography';
import toast from 'react-hot-toast';

const SignInFormSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
});

interface SignInFormProps {
    formData: {
        selectDate: string;
        selectTime: string;
    };
    serviceId: string;
    onClose: () => void;
}

const SignInForm: React.FC<SignInFormProps> = ({ formData, serviceId, onClose }) => {
    const initialValues = {
        email: '',
        password: '',
    };

    const { signIn } = useSignIn();

    const handleSubmit = async (values: any) => {
        const payload = {
            serviceId,
            date: formData.selectDate,
            time: formData.selectTime,
        };

        try {
            const response = await fetch('http://localhost:3000/api/customer/appointment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                toast.success('Appointment data sent successfully');
                localStorage.setItem('appointmentData', JSON.stringify(payload));

                // Now handle Clerk sign-in
                const signInResponse = await signIn?.create({
                    identifier: values.email,
                    password: values.password,
                });

                if (signInResponse?.status === 'complete') {
                    // localStorage.setItem('userSession', JSON.stringify(signInResponse.session));
                    toast.success('Signed in successfully');
                    onClose();
                } else {
                    console.error('SignIn response incomplete:', signInResponse);
                    toast.error('Failed to sign in');
                }
            } else {
                const errorText = await response.text();
                console.error('Failed to send appointment data:', errorText);
                throw new Error('Failed to send appointment data');
            }
        } catch (error) {
            console.error('SignIn error:', error);
            toast.error('Failed to sign in. Please check your credentials.');
        }
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={SignInFormSchema}
            onSubmit={handleSubmit}
        >
            {({ errors, touched }) => (
                <Form className='w-full'>
                    <Flex dir='column' gap={3}>
                        <Field name='email' as={Input} placeholder='Enter your email' />
                        {errors.email && touched.email ? (
                            <ErrorTitle>{errors.email}</ErrorTitle>
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

                        <Flex justifyContent='center' className='mt-5'>
                            <Button
                                className='flex w-48 bg-white'
                                type='submit'
                                size='lg'
                                color='outline'
                            >
                                Schedule Appointment
                            </Button>
                        </Flex>
                    </Flex>
                </Form>
            )}
        </Formik>
    );
};

export default SignInForm;
