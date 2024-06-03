import React, { useState } from 'react';
import { DaySelectorProps, daySelectorVariants, buttonVariants } from './daySelector.variants';

const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

const DaySelector: React.FC<DaySelectorProps> = ({ ...rest }) => {
    const [selectedDays, setSelectedDays] = useState<string[]>([]);

    const toggleDay = (day: string) => {
        setSelectedDays((prev) =>
            prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day],
        );
    };

    return (
        <div className={daySelectorVariants({ ...rest })}>
            {days.map((day) => (
                <button
                    key={day}
                    className ={buttonVariants({ selected: selectedDays.includes(day)})}
                    onClick={() => toggleDay(day)}
                >
                    {day}
                </button>
            ))}
        </div>
    );
};

export default DaySelector;
