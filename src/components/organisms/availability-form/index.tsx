'use client';

import React from 'react';
import { Formik, Form } from 'formik';
// import { useRouter } from 'next/navigation';
import { Flex, FlexItem } from '@/components/atoms/flex';
import avalabilityFormFields from './availability-form-field';
import Button from '@/components/atoms/button';
import { Label } from '@/components/atoms/typography';
import Input from '@/components/atoms/fields';
import availabilityFormValidation from './availability-form-validation';

type AvailabilityFormType = {
    submitBtnText?: string;
    onClose?: (value: boolean) => void;
};

const AvailabilityForm: React.FC<AvailabilityFormType> = ({
    submitBtnText = 'Submit',
    onClose = () => {},
}) => {
    return (
        <Formik
            initialValues={{
                businessHours: '',
                businessHoursEnd: '',
                numberOfSlots: '',
                businessDays: [],
            }}
            validationSchema={availabilityFormValidation}
            onSubmit={async (values) => {
                console.log(values);
                if (onClose) {
                    onClose(false);
                }
                // try {
                //     const response = await fetch('/api/availabilityConfiguration', {
                //         method: 'POST',
                //         headers: {
                //             'Content-Type': 'application/json',
                //         },
                //         body: JSON.stringify({
                //             userId: 'exampleId',
                //             organizationId: 'exampleOrganizationId',
                //             timezone: organizationDetails.timezone,
                //             workingHour: parseInt(values.businessHours),
                //             workingMinute: parseInt(values.businessHoursEnd),
                //             availablesSlots: parseInt(values.numberOfSlots),
                //             workingDays: values.businessDays.length,
                //         }),
                //     });
                //     if (!response.ok) {
                //         throw new Error('Network response was not OK');
                //     }
                //     const data = await response.json();
                //     console.log('Success:', data);
                //     setSubmitting(false);
                //     router.push('/');
                // } catch (error) {
                //     console.log('Error:', error);
                //     setSubmitting(false);
                // }
            }}
        >
            {({}) => (
                <Form>
                    <Flex dir='column' gap={6}>
                        {avalabilityFormFields.map((field, _inx) => {
                            const { type, name, placeholder, label } = field;
                            let Field = Input;

                            switch (type) {
                                case 'multi-select':
                                    break;

                                default:
                                    Field = Input;
                                    break;
                            }

                            return (
                                <Flex key={_inx} dir='column' gap={1}>
                                    <Label htmlFor={field.name}>{label}</Label>
                                    <Field type={type} name={name} placeholder={placeholder} />
                                </Flex>
                            );
                        })}
                        <FlexItem alignSelf='end'>
                            <Button type='submit' size={'xl'} color='outline'>
                                {submitBtnText}
                            </Button>
                        </FlexItem>
                    </Flex>
                </Form>
            )}
        </Formik>
    );
};

export default AvailabilityForm;
