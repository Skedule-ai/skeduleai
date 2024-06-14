import React, { Fragment } from 'react';
import Input from '@/components/atoms/fields';
import { Flex, FlexItem } from '@/components/atoms/flex';
import { Header1, Label } from '@/components/atoms/typography';
import { FormSubmitMessage } from '@/components/molecules/message';
import DaySelector from '@/components/atoms/dayselector';

// ToDo: Requires component refactoring.
const AvailabilityFields = ({
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
                <Header1>Your Availability </Header1>
            </FlexItem>
            {fields.map((field, _inx: number) => {
                const { type, placeholder, label } = field;
                const name = field.name;
                // let Field = Input;

                switch (type) {
                    // TODO: Implement multi-select field: Create a pure component for this
                    case 'multi-select':
                        return (
                            <Flex key={_inx} dir='column' gap={1}>
                                <Label htmlFor={field.name}>{label}</Label>
                                <FlexItem>
                                    {/* ToDo: Bugged component requires fixes */}
                                    <DaySelector
                                    // type={type}
                                    // name={name}
                                    // placeholder={placeholder}
                                    // onChange={handleChange}
                                    />
                                    {errors[name] && <FormSubmitMessage type='error' name='name' />}
                                </FlexItem>
                            </Flex>
                        );

                    default:
                        return (
                            <Flex key={_inx} dir='column' gap={1}>
                                <Label htmlFor={field.name}>{label}</Label>
                                <FlexItem>
                                    <Input
                                        type={type}
                                        name={name}
                                        placeholder={placeholder}
                                        onChange={handleChange}
                                    />
                                    {errors[name] && <FormSubmitMessage type='error' name='name' />}
                                </FlexItem>
                            </Flex>
                        );
                }
            })}
        </Fragment>
    );
};

export default AvailabilityFields;
