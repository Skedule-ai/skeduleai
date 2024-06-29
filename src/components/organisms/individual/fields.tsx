import Currency from '@/components/atoms/currency/currency';
import TimeZone from '@/components/atoms/date/TimeZone';
import Input from '@/components/atoms/fields';
import { Flex, FlexItem } from '@/components/atoms/flex';
import { Header1, Label, Subtitle } from '@/components/atoms/typography';
import { FormSubmitMessage } from '@/components/molecules/message';
import { FormikErrors } from 'formik';
import React, { Fragment } from 'react';

const IndFields = ({
    fields,
    errors,
    handleChange,
    handleFieldValueChange,
}: {
    fields: any[];
    errors: any;
    handleChange: React.ChangeEventHandler<HTMLInputElement>;
    handleFieldValueChange?: (
        field: string,
        value: any,
        shouldValidate?: boolean,
    ) => Promise<void | FormikErrors<{
        submitError: string;
        submitSuccess: string;
    }>>;
}) => {
    return (
        <Fragment>
            <FlexItem>
                <Subtitle>{'Tell us about'} </Subtitle>
                <Header1>{'Register Yourself'}</Header1>
            </FlexItem>
            {fields.map((field, _inx: number) => {
                const { type, placeholder, label } = field;
                const name = field.name;
                let Field = Input;

                switch (type) {
                    case 'timezone':
                        return (
                            <Flex key={_inx} dir='column' gap={1}>
                                <Label htmlFor={field.name}>{label}</Label>
                                <FlexItem>
                                    <TimeZone
                                        field={{
                                            name: 'timeZone',
                                            onBlur: () => {},
                                            onChange: () => {},
                                            value: '',
                                        }}
                                        form={field.form}
                                        meta={field}
                                        handleFieldValueChange={(value: string) => {
                                            handleFieldValueChange?.(name, value);
                                        }}
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
                                        handleFieldValueChange={(currency) => {
                                            handleFieldValueChange?.(name, currency);
                                        }}
                                    />
                                </FlexItem>
                            </Flex>
                        );
                    default:
                        Field = Input;
                        break;
                }
                return (
                    <Flex key={_inx} dir='column' gap={1}>
                        <Label htmlFor={field.name}>{label}</Label>
                        <FlexItem>
                            <Field
                                type={type}
                                name={name}
                                placeholder={placeholder}
                                onChange={handleChange}
                            />
                            {errors[name] && <FormSubmitMessage type='error' name={name} />}
                        </FlexItem>
                    </Flex>
                );
            })}
        </Fragment>
    );
};

export default IndFields;
