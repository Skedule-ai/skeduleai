import Currency from '@/components/atoms/currency/currency';
import TimeZone from '@/components/atoms/date/TimeZone';
import Input from '@/components/atoms/fields';
import { Flex, FlexItem } from '@/components/atoms/flex';
import { Header1, Label, Subtitle } from '@/components/atoms/typography';
import { FormSubmitMessage } from '@/components/molecules/message';
import React, { Fragment } from 'react';

const OrgFields = ({
    fields,
    errors,
    handleChange,
}: {
    fields: any[];
    errors: any;
    handleChange: React.ChangeEventHandler<HTMLInputElement>;
}) => {
    return (
        <Fragment>
            <FlexItem>
                <Subtitle>{'Tell us about '}</Subtitle>
                <Header1>{'Your Organization '}</Header1>
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
                                        className='lg'
                                        field={{
                                            name: 'timeZone',
                                            onBlur: () => {},
                                            onChange: () => {},
                                            value: '',
                                        }}
                                        form={{
                                            setFieldValue: () => {},
                                        }}
                                        onSearchQueryChange={() => {}}
                                        onTimeZoneChange={() => {}}
                                        searchQuery=''
                                        toggleDropdown={() => {}}
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
                                        id='currency'
                                        name='currency'
                                        onChange={() => {}}
                                        placeholder='Select a currency'
                                        size='md'
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

export default OrgFields;
