import Input from '@/components/atoms/fields';
import { Flex, FlexItem } from '@/components/atoms/flex';
import { Header1, Label, Subtitle } from '@/components/atoms/typography';
import { FormSubmitMessage } from '@/components/molecules/message';
import React, { Fragment } from 'react';

const IndividualFields = (props: {
    fields: any[];
    errors: any;
    handleChange: React.ChangeEventHandler<HTMLInputElement>;
}) => {
    const { fields, errors, handleChange } = props;
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
            })}
        </Fragment>
    );
};

export default IndividualFields;
