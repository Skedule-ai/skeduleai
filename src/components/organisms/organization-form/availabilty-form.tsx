'use client';
import React from 'react';
import { Formik, Form } from 'formik';

import { Flex, FlexItem } from '@/components/atoms/flex';
import avalabilityFormFields from './availability-form-field';
import Button from '@/components/atoms/button';
import { Label } from '@/components/atoms/typography';
import Input from '@/components/atoms/fields';
import availabilityFormValidation from './availability-form-validation';

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
