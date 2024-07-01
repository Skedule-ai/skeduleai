import React from 'react';
import { TimeInputProps, timeInputVariants } from './timeInput.variants';
import { Flex } from '../flex';
import { useField } from 'formik';

type InputType = React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
> & { label?: string };

type TimeSelectProps = Pick<InputType, 'onChange'> & {
    name: string;
    label: string;
};

const TimeSelect: React.FC<TimeSelectProps> = ({ label, ...props }) => {
    const [field] = useField(props);
    return (
        <Flex dir='column'>
            <label htmlFor={field.name} className='block text-gray-700'>
                {label}
            </label>
            <input
                id={field.name}
                type='time'
                className='mt-1 rounded border p-2 focus:border-blue-300 focus:outline-none focus:ring'
                {...field}
                {...props}
            />
        </Flex>
    );
};

type WorkingHoursSelectorProps = TimeInputProps & {
    startTimeField: InputType;
    endTimeField: InputType;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const WorkingHoursSelector: React.FC<WorkingHoursSelectorProps> = ({
    size,
    startTimeField,
    endTimeField,
    onChange,
    ...rest
}) => {
    return (
        <div className='flex items-center space-x-8'>
            <div className={timeInputVariants({ size, ...rest })}>
                <TimeSelect
                    key={startTimeField.name}
                    name={startTimeField.name ?? ''}
                    label={startTimeField.label ?? ''}
                    onChange={onChange}
                />
                <TimeSelect
                    key={endTimeField.name}
                    name={endTimeField.name ?? ''}
                    label={endTimeField.label ?? ''}
                    onChange={onChange}
                />
            </div>
        </div>
    );
};

export default WorkingHoursSelector;
