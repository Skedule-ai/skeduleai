import React from 'react';
import Button from '@/components/atoms/button';

type DateTimeDisplayProps = {
    currentDate: string;
    currentDay: string;
    currentTime: string;
    timeZone: string;
    timeZones: {
        label: string;
        value: string;
    }[];
    onDateChange: (date: string) => void;
    onTimeZoneChange: (zone: string) => void;
    showDropdown: boolean;
    toggleDropdown: () => void;
    searchQuery: string;
    onSearchQueryChange: (query: any) => void;
};

const DateTimeDisplay: React.FC<DateTimeDisplayProps> = ({ currentDate, onDateChange }) => {
    return (
        <>
            <Button
                className='mb-4 flex items-center bg-white px-4 py-2 font-medium text-black shadow sm:mb-0'
                color='tertiary'
                size='lg'
            >
                <input
                    type='date'
                    value={currentDate}
                    onChange={(e) => onDateChange(e.target.value)}
                    className='focus:outline-none'
                />
            </Button>
        </>
    );
};

export default DateTimeDisplay;
