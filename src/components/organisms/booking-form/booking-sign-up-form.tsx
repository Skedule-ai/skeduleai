'use client';

import React from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { useSignUp } from '@clerk/clerk-react';
import { Flex } from '@/components/atoms/flex';
import Input from '@/components/atoms/fields';
import Button from '@/components/atoms/button';
import { ErrorTitle } from '@/components/atoms/typography';
import toast from 'react-hot-toast';

const SignUpFormSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
});

interface SignUpFormProps {
    formData: {
        selectDate: string;
        selectTime: string;
    };
    serviceId: string;
    onClose: () => void;
}
const SignUpForm: React.FC<SignUpFormProps> = ({ formData, serviceId, onClose }) => {
    const initialValues = {
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
    };

    const { signUp } = useSignUp();

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

                const signUpResponse = await signUp.create({
                    emailAddress: values.email,
                    password: values.password,
                });

                if (signUpResponse.status === 'complete') {
                    localStorage.setItem('userSession', JSON.stringify(signUpResponse.session));
                    toast.success('Signed up successfully');
                    onClose();
                } else {
                    console.error('SignUp response incomplete:', signUpResponse);
                    toast.error('Failed to sign up');
                }
            } else {
                const errorText = await response.text();
                console.error('Failed to send appointment data:', errorText);
                throw new Error('Failed to send appointment data');
            }
        } catch (error) {
            console.error('SignUp error:', error);
            toast.error('Failed to sign up. Please try again.');
        }
    };

    return (
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

                        <Field name='phone' as={Input} placeholder='Enter your phone Number' />
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

export default SignUpForm;
