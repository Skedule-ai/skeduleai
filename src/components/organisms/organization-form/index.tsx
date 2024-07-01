'use client';
import React from 'react';
import { Formik, Form, FormikHelpers } from 'formik';
import { Flex, FlexItem } from '@/components/atoms/flex';
import Button from '@/components/atoms/button';
import { FormSubmitMessage } from '@/components/molecules/message';
import { DetailsType } from '@/libs/utils/enums';
import OrgFields from './fields';
import AvailabilityFields from '../availability-fields';
import {
    getOnboardingFormFields,
    getOnboardingFormSchemaValidator,
    ONBOARDING_FORM_INTIAL_VALUES,
    OnboardingFormValuesType,
} from '@/libs/form-helpers/fields';
import { OnboardingType } from '@/libs/enums';

type OrganizationFormType = {
    onboardingType: OnboardingType;
    submitBtnText?: string;
    onClose?: (value: boolean) => void;
    onSubmit: (
        values: OnboardingFormValuesType,
        formikHelpers: FormikHelpers<OnboardingFormValuesType>,
    ) => void;
};

const OnboardingForm: React.FC<OrganizationFormType> = ({ onboardingType, onSubmit }) => {
    const [detailsType, setDetailsType] = React.useState<DetailsType>(
        DetailsType.organizationDetails,
    );
    const formFields = getOnboardingFormFields();
    const validationSchema = getOnboardingFormSchemaValidator(detailsType);
    return (
        <Formik
            initialValues={ONBOARDING_FORM_INTIAL_VALUES}
            validationSchema={validationSchema}
            validateOnMount
            onSubmit={onSubmit}
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
                console.log('values: ', values, errors);
                return (
                    <Form>
                        <Flex dir='column' fullWidth gap={6}>
                            <OrgFields
                                show={detailsType === DetailsType.organizationDetails}
                                onboardingType={onboardingType}
                                fields={formFields.organization}
                                errors={errors}
                                handleChange={handleChange}
                                handleFieldValueChange={setFieldValue}
                            />

                            <AvailabilityFields
                                show={detailsType === DetailsType.availabilityDetails}
                                fields={formFields.availability}
                                errors={errors}
                                handleChange={handleChange}
                                values={values}
                                setFieldValue={setFieldValue}
                            />

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

export default OnboardingForm;
