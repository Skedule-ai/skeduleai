'use client';
import React from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { Flex } from '@/components/atoms/flex';
import Input from '@/components/atoms/fields';
import Button from '@/components/atoms/button';
import { ErrorTitle } from '@/components/atoms/typography';

const SignUpFormSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
});

const SignUpForm: React.FC<{ onSubmit: (values: any) => void }> = ({ onSubmit }) => {
    const initialValues = {
        email: '',
        password: '',
        confirmPassword: '',
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={SignUpFormSchema}
            onSubmit={onSubmit}
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

                         <Field name='confirmPassword' as={Input} placeholder='Enter Confirm Password' />
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
