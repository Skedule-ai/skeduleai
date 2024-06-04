import React from 'react';
import { Formik, Field, Form } from 'formik';
import availabilityFormValidation from './availability-form-validation';
import { Flex } from '@/components/atoms/flex';
import avalabilityFormFields from './availability-form-field';
import Button from '@/components/atoms/button';
import { FormSubmitMessage } from '@/components/molecules/message';
import { Label } from '@/components/atoms/typography';

type AvailabilityFormType = {
    submitBtnText?: string;
};

const AvailabilityForm: React.FC<AvailabilityFormType> = ({ submitBtnText = 'Submit' }) => {
    return (
        <Formik
            initialValues={{
                businessHours: '',
                businessHoursEnd: '',
                numberOfSlots: '',
                businessDays: [],
            }}
            validationSchema={availabilityFormValidation}
            onSubmit={(values) => {
                console.log('Form data', values);
            }}
        >
            {({ values, handleChange }) => (
                <Form>
                    <h2>Business Hours</h2>
                    <div className='mb-4 flex'>
                        <div className='relative flex-grow'>
                            <Field
                                as='select'
                                name='businessHours'
                                placeholder='Enter start time'
                                className='form-select w-full rounded-md border border-gray-300 px-4 py-2'
                            >
                                <option value=''>Select</option>
                                {/* Add options for start time here */}
                            </Field>
                            <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2'>
                                <svg
                                    className='h-5 w-5 text-gray-400'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    stroke='currentColor'
                                >
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth='2'
                                        d='M19 9l-7 7-7-7'
                                    ></path>
                                </svg>
                            </div>
                        </div>
                        <div className='relative flex-grow'>
                            <Field
                                as='select'
                                name='businessHoursEnd'
                                placeholder='Enter end time'
                                className='form-select w-full rounded-md border border-gray-300 px-4 py-2'
                            >
                                <option value=''>Select</option>
                                {/* Add options for end time here */}
                            </Field>
                            <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2'>
                                <svg
                                    className='h-5 w-5 text-gray-400'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    stroke='currentColor'
                                >
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth='2'
                                        d='M19 9l-7 7-7-7'
                                    ></path>
                                </svg>
                            </div>
                        </div>
                    </div>

                    <h2>Number of Slots</h2>
<div className='mb-4'>
    <div className='relative'>
        <Field
            as='select'
            name='numberOfSlots'
            className='form-select w-full rounded-md border border-gray-300 px-4 py-2'
        >
            <option value=''>Select</option>
            {/* Add options for number of slots here */}
        </Field>
        <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2'>
            <svg
                className='h-5 w-5 text-gray-400'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
            >
                <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M19 9l-7 7-7-7'
                ></path>
            </svg>
        </div>
    </div>
</div>


                    <h2>Business Days</h2>
                    <div className='mb-4 flex flex-wrap'>
                        {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((day) => (
                            <button
                                key={day}
                                className={`${
                                    values.businessDays.includes(day)
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-gray-200 text-gray-700'
                                } mb-3 mr-3 rounded-md px-4 py-2`}
                                onClick={() => {
                                    const isChecked = values.businessDays.includes(day);
                                    if (isChecked) {
                                        const filteredDays = values.businessDays.filter(
                                            (d) => d !== day,
                                        );
                                        setFieldValue('businessDays', filteredDays);
                                    } else {
                                        const updatedDays = [...values.businessDays, day];
                                        setFieldValue('businessDays', updatedDays);
                                    }
                                }}
                                style={{ minWidth: '80px' }} // Adjust the width as needed
                            >
                                {day}
                            </button>
                        ))}
                    </div>

                    <div className='flex justify-center'>
                        <button type='submit' className='rounded bg-blue-500 px-4 py-2 text-white'>
                            {submitBtnText}
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default AvailabilityForm;
