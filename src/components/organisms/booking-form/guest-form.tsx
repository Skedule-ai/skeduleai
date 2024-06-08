'use client';

import React from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { Flex } from '@/components/atoms/flex';
import Input from '@/components/atoms/fields';
import Button from '@/components/atoms/button';
import { ErrorTitle } from '@/components/atoms/typography';

const GuestFormSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    contactNumber: Yup.string().required('Contact number is required'),
});

const GuestForm: React.FC<{ onSubmit: (values: any) => void }> = ({ onSubmit }) => {
    const initialValues = {
        name: '',
        email: '',
        contactNumber: '',
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={GuestFormSchema}
            onSubmit={onSubmit}
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

                        <Field
                            name='contactNumber'
                            as={Input}
                            placeholder='Enter your contact number'
                        />
                        {errors.contactNumber && touched.contactNumber ? (
                            <ErrorTitle>{errors.contactNumber}</ErrorTitle>
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

export default GuestForm;
