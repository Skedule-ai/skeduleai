'use client';

import React, { Fragment } from 'react';
import { Formik, Form } from 'formik';
import { Flex, FlexItem } from '@/components/atoms/flex';
import Button from '@/components/atoms/button';
import { FormSubmitMessage } from '@/components/molecules/message';
import { getFormFields, getInitialValues } from './constants';
import { DetailsType } from '@/libs/utils/enums';
import IndividualFields from './fields';
import AvailabilityFields from '../availability-fields';
import { availabilityDetailsSchema } from '../validations/organization-form-validation';
import individualSchema from './individual-form-validation';
import useOnBoardingModal from '@/libs/hooks/useOnBoardingModal';
import useAvailability from '@/libs/hooks/useAvailability';
import { Skeleton } from '@chakra-ui/react';
import toast, { Toaster } from 'react-hot-toast';

type OrganizationFormType = {
    submitBtnText?: string;
    onClose?: (value: boolean) => void;
};

const IndividualForm: React.FC<OrganizationFormType> = () => {
    const { setIsOpen } = useOnBoardingModal();
    const [detailsType, setDetailsType] = React.useState<DetailsType>(
        DetailsType.individualDetails,
    );
    const formFields = getFormFields();
    const initValues = getInitialValues(detailsType);
    const { submitAvailability, isLoading, error } = useAvailability({
        onCompleted: () => {
            setIsOpen(false);
            toast.success('Successfully added details');
        },
        onError: (err) => {
            toast.error(err.message);
        },
    });

    const handleSubmitForm = async (values: any, actions: any) => {
        console.log('Submitting form with values:', values);
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
            await submitAvailability(data);
            actions.setStatus({ submitSuccess: 'Form submitted successfully!' });
        } catch (error) {
            console.error('Error submitting form:', error);
            actions.setStatus({ submitError: error.message });
        } finally {
            actions.setSubmitting(false);
        }
    };

    return (
        <Fragment>
            <Toaster />
            <Formik
                initialValues={initValues}
                validationSchema={
                    detailsType === DetailsType.individualDetails
                        ? individualSchema
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
                }) => (
                    <Form>
                        <Flex dir='column' fullWidth gap={6}>
                            {detailsType === DetailsType.individualDetails ? (
                                <IndividualFields
                                    fields={formFields.individual}
                                    errors={errors}
                                    handleChange={handleChange}
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
                                            detailsType === DetailsType.individualDetails &&
                                            isValid
                                        ) {
                                            setDetailsType(DetailsType.availabilityDetails);
                                        } else if (
                                            detailsType === DetailsType.availabilityDetails
                                        ) {
                                            handleSubmit();
                                        }
                                    }}
                                >
                                    {detailsType === DetailsType.individualDetails
                                        ? 'Continue'
                                        : 'Submit'}
                                </Button>
                            </FlexItem>
                        </Flex>
                        {isLoading && (
                            <div className='animate-pulse'>
                                <Skeleton height='20px' my='10px' />
                                <Skeleton height='20px' my='10px' />
                                <Skeleton height='20px' my='10px' />
                            </div>
                        )}
                    </Form>
                )}
            </Formik>
        </Fragment>
    );
};

export default IndividualForm;
