import React, { useState, useEffect } from 'react';
import { DaySelectorProps, daySelectorVariants, buttonVariants } from './daySelector.variants';
import { DaysEnum } from '@/libs/utils/enums';

const days = [
    { name: 'SUN', value: DaysEnum.SUNDAY },
    { name: 'MON', value: DaysEnum.MONDAY },
    { name: 'TUE', value: DaysEnum.TUESDAY },
    { name: 'WED', value: DaysEnum.WEDNESDAY },
    { name: 'THU', value: DaysEnum.THURSDAY },
    { name: 'FRI', value: DaysEnum.FRIDAY },
    { name: 'SAT', value: DaysEnum.SATURDAY },
];

const DaySelector: React.FC<DaySelectorProps> = ({ value, onChange, ...rest }) => {
    const [selectedDays, setSelectedDays] = useState<number[]>([]);

    useEffect(() => {
        if (value && Array.isArray(value)) {
            setSelectedDays(value);
        }
    }, [value]);

    const toggleDay = (dayValue: number) => {
        const updatedSelectedDays = selectedDays.includes(dayValue)
            ? selectedDays.filter((d) => d !== dayValue)
            : [...selectedDays, dayValue];

        setSelectedDays(updatedSelectedDays);

        if (onChange) {
            onChange(updatedSelectedDays);
        }
    };

    return (
        <div className={daySelectorVariants({ ...rest })}>
            {days.map((day) => (
                <button
                    key={day.value}
                    type='button'
                    className={buttonVariants({ selected: selectedDays.includes(day.value) })}
                    onClick={() => toggleDay(day.value)}
                >
                    {day.name}
                </button>
            ))}
        </div>
    );
};

export default DaySelector;
