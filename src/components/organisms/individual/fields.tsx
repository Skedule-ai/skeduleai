import Input from '@/components/atoms/fields';
import { Flex, FlexItem } from '@/components/atoms/flex';
import { Header1, Label } from '@/components/atoms/typography';
import { FormSubmitMessage } from '@/components/molecules/message';
import React, { Fragment } from 'react';

const IndividualFields = ({
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
                <Header1>Register Yourself</Header1>
            </FlexItem>
            {fields.map((field, _inx: number) => {
                const { type, placeholder, label } = field;
                const name = field.name;
                let Field = Input;

                switch (type) {
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

export default IndividualFields;
