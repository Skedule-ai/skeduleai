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

type OrganizationFormType = {
    submitBtnText?: string;
    onClose?: (value: boolean) => void;
};

const IndividualForm: React.FC<OrganizationFormType> = () => {
    const [detailsType, setDetailsType] = React.useState<DetailsType>(
        DetailsType.organizationDetails,
    );
    const formFields = getFormFields();
    const initValues = getInitialValues(detailsType);

    return (
        <Formik
            initialValues={initValues}
            validationSchema={
                detailsType === DetailsType.organizationDetails
                    ? organizationDetailsSchema
                    : availabilityDetailsSchema
            }
            validateOnMount
            onSubmit={(values) => {
                console.log(values);
            }}
        >
            {({ isSubmitting, values, errors, status, isValid, handleChange, handleSubmit }) => {
                return (
                    <Form>
                        <Flex dir='column' fullWidth gap={6}>
                            {detailsType === DetailsType.organizationDetails ? (
                                <OrgFields
                                    fields={formFields[detailsType]}
                                    errors={errors}
                                    handleChange={handleChange}
                                />
                            ) : (
                                <AvailabilityFields
                                    fields={formFields[detailsType]}
                                    errors={errors}
                                    handleChange={handleChange}
                                />
                            )}

                            {errors.submitError && (
                                <FlexItem className='col-span-2 mt-2 w-full'>
                                    <FormSubmitMessage type='error' name='submitError' />
                                </FlexItem>
                            )}
                            {values.submitSuccess && (
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

export default IndividualForm;
