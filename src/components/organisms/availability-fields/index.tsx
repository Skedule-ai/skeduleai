import React, { Fragment } from 'react';
import Input from '@/components/atoms/fields';
import { Flex, FlexItem } from '@/components/atoms/flex';
import { Header1, Label } from '@/components/atoms/typography';
import { FormSubmitMessage } from '@/components/molecules/message';
import DaySelector from '@/components/atoms/dayselector';
import WorkingHoursSelector from '@/components/atoms/timeInput';

const AvailabilityFields = ({
    fields,
    errors,
    handleChange,
    values,
    setFieldValue,
}: {
    fields: any[];
    errors: any;
    handleChange: React.ChangeEventHandler<HTMLInputElement>;
    values: any;
    setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
}) => {
    return (
        <Fragment>
            <FlexItem>
                <Header1>{'Your Availability '}</Header1>
            </FlexItem>
            {fields.map((field, index) => {
                const { type, placeholder, label, name } = field;

                switch (type) {
                    // case 'WorkingHoursSelector':
                    //     return (
                    //         <Flex key={index} dir='column'>
                    //             <Label htmlFor={name}>{label}</Label>
                    //             <FlexItem>
                    //                 <WorkingHoursSelector
                    //                     onStartChange={(value) =>
                    //                         handleChange({
                    //                             target: {
                    //                                 name,
                    //                                 value,
                    //                             },
                    //                         } as React.ChangeEvent<HTMLInputElement>)
                    //                     }
                    //                     onEndChange={(value) =>
                    //                         handleChange({
                    //                             target: {
                    //                                 name,
                    //                                 value,
                    //                             },
                    //                         } as React.ChangeEvent<HTMLInputElement>)
                    //                     }
                    //                     size='md'
                    //                 />
                    //                 {errors[name] && <FormSubmitMessage type='error' name={name} />}
                    //             </FlexItem>
                    //         </Flex>
                    //     );

                    case 'multi-select':
                        return (
                            <Flex key={index} dir='column' gap={1}>
                                <Label htmlFor={name}>{label}</Label>
                                <FlexItem>
                                    <DaySelector
                                        value={values[name]}
                                        onChange={(value) => setFieldValue(name, value)}
                                    />
                                    {errors[name] && <FormSubmitMessage type='error' name={name} />}
                                </FlexItem>
                            </Flex>
                        );

                    default:
                        return (
                            <Flex key={index} dir='column' gap={1}>
                                <Label htmlFor={name}>{label}</Label>
                                <FlexItem>
                                    <Input
                                        type={type}
                                        name={name}
                                        placeholder={placeholder}
                                        onChange={handleChange}
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

export default AvailabilityFields;
