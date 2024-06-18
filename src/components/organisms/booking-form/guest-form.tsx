'use client';

import React, { useState } from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { Flex } from '@/components/atoms/flex';
import Input from '@/components/atoms/fields';
import Button from '@/components/atoms/button';
import { ErrorTitle } from '@/components/atoms/typography';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import BookingConfirmpage from '@/app/booking/[id]/booking-confirm/page';
import { Loader } from '@strapi/icons';

const GuestFormSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    contactNumber: Yup.string().required('Contact number is required'),
});

interface GuestFormProps {
    onSubmit: (values: any) => void;
    formData: {
        selectDate: string;
        selectTime: string;
    };
    serviceId: string;
    onClose: () => void;
    serviceProviderName: string;
}

const GuestForm: React.FC<GuestFormProps> = ({
<<<<<<< HEAD
    onSubmit,
    formData,
    serviceId,
    onClose,
    serviceProviderName,
=======
    // onSubmit,
    formData,
    serviceId,
    onClose,
>>>>>>> staging
}) => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const initialValues = {
        name: '',
        email: '',
        contactNumber: '',
    };

    const handleSubmit = async (values: any) => {
        setLoading(true);
        const payload = {
            serviceId,
            name: values.name,
            email: values.email,
            phoneNumber: values.contactNumber,
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
                setLoading(false);
                toast.success('Appointment scheduled successfully');
<<<<<<< HEAD
                <BookingConfirmpage serviceProviderName={serviceProviderName} />;
=======
                <BookingConfirmpage
                // data={payload}
                />;
>>>>>>> staging
                router.push(`/booking/${payload.serviceId}/booking-confirm`);
                onClose();
            } else {
                throw new Error('Failed to schedule appointment');
            }
        } catch (error) {
            setLoading(false);
            toast.error('Failed to schedule appointment. Please try again later.');
        }
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={GuestFormSchema}
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
                                className={`flex ${loading ? 'w-56' : 'w-48'} bg-white`}
                                type='submit'
                                size='lg'
                                color='outline'
                            >
                                {loading && <Loader className='animate-spin' />}
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
