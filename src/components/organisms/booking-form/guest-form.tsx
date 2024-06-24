import React, { useState } from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { Flex } from '@/components/atoms/flex';
import Input from '@/components/atoms/fields';
import Button from '@/components/atoms/button';
import { ErrorTitle } from '@/components/atoms/typography';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
// import BookingConfirmpage from '@/app/booking/[id]/booking-confirm/page';
import { Loader } from '@strapi/icons';
import { useAuth } from '@clerk/nextjs';

const GuestFormSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    contactNumber: Yup.string().required('Contact number is required'),
});

interface GuestFormProps {
    onSubmit: (values: any) => void;
    formData: {
        timeZone: string;
        selectDate: string;
        selectTime: string;
    };
    serviceId: string;
    onClose: () => void;
    serviceProviderName: string;
    image: string;
}

const GuestForm: React.FC<GuestFormProps> = ({
    // onSubmit,
    formData,
    serviceId,
    onClose,
    serviceProviderName,
    image,
}) => {
    const { getToken } = useAuth();
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const initialValues = {
        name: '',
        email: '',
        contactNumber: '',
    };

    const handleSubmit = async (values: any) => {
        setLoading(true);
        const formattedValues = {
            ...values,
            selectDate: values.selectDate,
            selectTime: values.selectTime,
            timeZone: values.timeZone,
        };
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
            const token = await getToken();
            const response = await fetch(
                `http://localhost:3000/api/booking_service/appointment/${serviceId}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(payload),
                },
            );
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const responseData = await response.json();
            toast.success('Appointment booked successfully!');

            const queryParams = new URLSearchParams({
                data: JSON.stringify(responseData),
                image: image,
                name: serviceProviderName,
                formData: JSON.stringify(formattedValues),
            }).toString();

            router.push(`/booking/${payload.serviceId}/booking-confirm?${queryParams}`);
            onClose();
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
