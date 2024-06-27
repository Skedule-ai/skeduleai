import Input from '@/components/atoms/fields';
import { Flex, FlexItem } from '@/components/atoms/flex';
import { Header1, Label, Subtitle } from '@/components/atoms/typography';
import { FormSubmitMessage } from '@/components/molecules/message';
import React, { Fragment } from 'react';
import TimeZone from '@/components/atoms/date/TimeZone'; // Import TimeZone component
import Currency from '@/components/atoms/currency/currency';
import { FormikErrors } from 'formik';

const IndividualFields = (props: {
    fields: any[];
    errors: any;
    handleChange: React.ChangeEventHandler<HTMLInputElement>;
    handleFieldValue: (
        field: string,
        value: any,
        shouldValidate?: boolean,
    ) => Promise<void | FormikErrors<{
        submitError: string;
        submitSuccess: string;
    }>>;
}) => {
    const { fields, errors, handleChange, handleFieldValue } = props;
    return (
        <Fragment>
            <FlexItem>
                <Subtitle>{'Tell us about'} </Subtitle>
                <Header1>{'Register Yourself'}</Header1>
            </FlexItem>
            {fields.map((field, _inx: number) => {
                const { type, placeholder, label } = field;
                const name = field.name;
                const Field = Input;

                switch (type) {
                    case 'timezone':
                        return (
                            <Flex key={_inx} dir='column' gap={1}>
                                <Label htmlFor={name}>{label}</Label>
                                <FlexItem>
                                    <TimeZone
                                        // className='lg'
                                        field={{
                                            name: 'timeZone',
                                            onBlur: () => {},
                                            onChange: () => {},
                                            value: '',
                                        }}
                                        meta={field}
                                        form={field.form}
                                        handleFieldValueChange={(value: string) =>
                                            handleFieldValue(name, value)
                                        }
                                        // onSearchQueryChange={() => {}}
                                        // onTimeZoneChange={() => {}}
                                        // searchQuery=''
                                        // toggleDropdown={() => {}}
                                    />
                                </FlexItem>
                            </Flex>
                        );
                    case 'currency':
                        return (
                            <Flex key={_inx} dir='column' gap={1}>
                                <Label htmlFor={name}>{label}</Label>
                                <FlexItem>
                                    <Currency
                                        name={name}
                                        handleFieldValueChange={(value: string) =>
                                            handleFieldValue(name, value)
                                        }
                                        // id='currency'
                                        // name='currency'
                                        // onChange={() => {}}
                                        // placeholder='Select a currency'
                                        // size='md'
                                    />
                                </FlexItem>
                            </Flex>
                        );
                    default:
                        return (
                            <Flex key={_inx} dir='column' gap={1}>
                                <Label htmlFor={name}>{label}</Label>
                                <FlexItem>
                                    <Field
                                        type={type}
                                        name={name}
                                        placeholder={placeholder}
                                        onChange={handleChange}
                                        className='w-full'
                                    />
                                    {errors[name] && <FormSubmitMessage type='error' name={name} />}
                                </FlexItem>
                            </Flex>
                        );
                }
            })}
        </Fragment>
    );
};

export default IndividualFields;
