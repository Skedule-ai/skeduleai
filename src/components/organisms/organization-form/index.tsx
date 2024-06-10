'use client';
import React from 'react';
import { Formik, Form } from 'formik';
import OrganizationSchema from './organization-form-validation';
import { Flex, FlexItem } from '@/components/atoms/flex';
import Button from '@/components/atoms/button';
import organizationFormFields from './organization-form-fields';
import Input from '@/components/atoms/fields';
import { FormSubmitMessage } from '@/components/molecules/message';
import { Label } from '@/components/atoms/typography';

type OrganizationFormType = {
    submitBtnText?: string;
    onClose?: (value: boolean) => void;
};

const OrganizationForm: React.FC<OrganizationFormType> = (props) => {
    const initValues = {
        organizationName: '',
        timezone: '',
        currency: '',
        submitError: '',
        submitSuccess: '',
    };

    type FieldNameType = keyof typeof initValues;

    return (
        <Formik
            initialValues={initValues}
            validationSchema={OrganizationSchema}
            validateOnMount
            onSubmit={(values) => {
                console.log(values);
                if (props.onClose) {
                    props.onClose(true);
                }
            }}
        >
            {({ isSubmitting, values, errors, status, isValid, handleChange }) => {
                return (
                    <Form>
                        <Flex dir='column' fullWidth gap={6}>
                            {organizationFormFields.map((field) => {
                                const name = field.name as FieldNameType;
                                return (
                                    <Flex key={field.name} dir='column' gap={1}>
                                        <Label htmlFor={field.name}>{field.label}</Label>
                                        <FlexItem>
                                            <Input
                                                id={field.name}
                                                name={field.name}
                                                value={values[name]}
                                                required={field.required}
                                                placeholder={field.placeholder}
                                                onChange={handleChange}
                                            />
                                            {errors[name] && (
                                                <FormSubmitMessage
                                                    type='error'
                                                    name='submitError'
                                                />
                                            )}
                                        </FlexItem>
                                    </Flex>
                                );
                            })}

                            {errors.submitError && (
                                <FlexItem className='col-span-2 mt-4 w-full'>
                                    <FormSubmitMessage type='error' name='submitError' />
                                </FlexItem>
                            )}
                            {values.submitSuccess && (
                                <FlexItem className='col-span-2 mt-4 w-full'>
                                    <FormSubmitMessage type='success' name='submitSuccess' />
                                </FlexItem>
                            )}

                            <FlexItem alignSelf='end' className='col-span-2 mt-4'>
                                <Button
                                    type='submit'
                                    size={'xl'}
                                    color='outline'
                                    className='cursor-pointer'
                                    disabled={isSubmitting || status?.submitSuccess || !isValid}
                                    loading={isSubmitting}
                                >
                                    {props.submitBtnText}
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
