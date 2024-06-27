'use client';
import React from 'react';
import { Formik, Form } from 'formik';
import { Flex, FlexItem } from '@/components/atoms/flex';
import Button from '@/components/atoms/button';
import { FormSubmitMessage } from '@/components/molecules/message';
import { getFormFields, getInitialValues } from './constants';
import { DetailsType } from '@/libs/utils/enums';
import OrgFields from './fields';
import AvailabilityFields from '../availability-fields';
import {
    organizationDetailsSchema,
    availabilityDetailsSchema,
} from '../validations/organization-form-validation';
import { useAuth } from '@clerk/nextjs';

type OrganizationFormType = {
    submitBtnText?: string;
    onClose?: (value: boolean) => void;
};

const OrganizationForm: React.FC<OrganizationFormType> = () => {
    const [detailsType, setDetailsType] = React.useState<DetailsType>(
        DetailsType.organizationDetails,
    );
    const formFields = getFormFields();
    const initValues = getInitialValues(detailsType);
    const { getToken } = useAuth();

    const handleSubmitForm = async (values: any, actions: any) => {
        const token = await getToken();
        const data = {
            organizationId: '',
            availabilityConfiguration: {
                timezone: values.timezone,
                startTime: '2024-06-14T08:00:00Z',
                endTime: '2024-06-14T17:00:00Z',
                duration: values.duration,
                days: values.businessDays,
            },
        };

        try {
            const response = await fetch('http://localhost:3000/api/availability', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(data),
            });

            console.log('Response status:', response.status);

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            console.log('Response data:', result);
            actions.setStatus({ submitSuccess: 'Form submitted successfully!' });
        } catch (error) {
            console.error('Error:', error);
            actions.setStatus({ submitError: 'Submission failed. Please try again.' });
        } finally {
            actions.setSubmitting(false);
        }
    };

    return (
        <Formik
            initialValues={initValues}
            validationSchema={
                detailsType === DetailsType.organizationDetails
                    ? organizationDetailsSchema
                    : availabilityDetailsSchema
            }
            validateOnMount
            onSubmit={handleSubmitForm}
        >
            {({
                isSubmitting,
                values,
                errors,
                status,
                isValid,
                handleChange,
                handleSubmit,
                setFieldValue,
            }) => {
                return (
                    <Form>
                        <Flex dir='column' fullWidth gap={6}>
                            {detailsType === DetailsType.organizationDetails ? (
                                <OrgFields
                                    fields={formFields.organization}
                                    errors={errors}
                                    handleChange={handleChange}
                                    handleFieldValueChange={setFieldValue}
                                />
                            ) : (
                                <AvailabilityFields
                                    fields={formFields.availability}
                                    errors={errors}
                                    handleChange={handleChange}
                                    values={values}
                                    setFieldValue={setFieldValue}
                                />
                            )}

                            {status?.submitError && (
                                <FlexItem className='col-span-2 mt-2 w-full'>
                                    <FormSubmitMessage type='error' name='submitError' />
                                </FlexItem>
                            )}
                            {status?.submitSuccess && (
                                <FlexItem className='col-span-2 mt-2 w-full'>
                                    <FormSubmitMessage type='success' name='submitSuccess' />
                                </FlexItem>
                            )}

                            <FlexItem alignSelf='end' className='col-span-2'>
                                <Button
                                    type='button'
                                    size={'xl'}
                                    color='outline'
                                    className='cursor-pointer'
                                    disabled={isSubmitting || status?.submitSuccess || !isValid}
                                    loading={isSubmitting}
                                    onClick={() => {
                                        if (
                                            detailsType === DetailsType.organizationDetails &&
                                            isValid
                                        ) {
                                            setDetailsType(DetailsType.availabilityDetails);
                                        } else {
                                            handleSubmit();
                                        }
                                    }}
                                >
                                    {detailsType === DetailsType.organizationDetails
                                        ? 'Continue'
                                        : 'Submit'}
                                </Button>
                            </FlexItem>
                        </Flex>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default OrganizationForm;
