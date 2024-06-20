import React, { useState } from 'react';
import { FieldProps } from 'formik';
import Button from '@/components/atoms/button';
import Container from '../container';
import Text from '../text';
import { ChevronDown, Cross } from '@strapi/icons';

type TimeZoneProps = FieldProps & {
    timeZone: string;
    timeZones: {
        label: string;
        value: string;
    }[];
    onTimeZoneChange: (zone: string) => void;
    showDropdown: boolean;
    toggleDropdown: () => void;
    searchQuery: string;
    onSearchQueryChange: (query: string) => void;
    className?: string; // Allow passing custom class names
};

const TimeZone: React.FC<TimeZoneProps> = ({
    field,
    form,
    timeZone,
    timeZones,
    onTimeZoneChange,
    showDropdown,
    toggleDropdown,
    searchQuery,
    onSearchQueryChange,
    className = '',
}) => {
    const [inputValue, setInputValue] = useState('');

    const filteredTimeZones = timeZones.filter((zone) =>
        zone.label.toLowerCase().includes(inputValue.toLowerCase()),
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        form.setFieldValue(field.name, e.target.value);
    };

    const handleTimeZoneSelect = (zoneValue: string) => {
        onTimeZoneChange(zoneValue);
        form.setFieldValue(field.name, zoneValue);
        toggleDropdown();
    };

    return (
        <Container className={`relative ${className}`}>
            <Button
                className='flex w-full items-center justify-between bg-white px-4 py-2 text-black shadow'
                color='tertiary'
                size='lg'
                onClick={toggleDropdown}
            >
                <Text>{timeZone}</Text>
                <Text className='ml-2'>{showDropdown ? <Cross /> : <ChevronDown />}</Text>
            </Button>
            {showDropdown && (
                <div className='absolute mt-2 max-h-60 w-full overflow-y-auto rounded-md bg-white shadow-lg ring-1 ring-black/5'>
                    <input
                        type='text'
                        placeholder='Search...'
                        value={inputValue}
                        onChange={handleChange}
                        className='block w-full border-b border-gray-200 px-4 py-2 text-sm text-gray-900 focus:outline-none'
                    />
                    {filteredTimeZones.map((zone) => (
                        <Text
                            key={zone.value}
                            className='block w-full cursor-pointer px-4 py-2 text-sm text-gray-900 hover:bg-gray-100'
                            onClick={() => handleTimeZoneSelect(zone.value)}
                        >
                            {zone.label}
                        </Text>
                    ))}
                </div>
            )}
        </Container>
    );
};

export default TimeZone;
