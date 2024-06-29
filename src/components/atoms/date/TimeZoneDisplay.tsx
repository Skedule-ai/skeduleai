import React, { useState } from 'react';
import { FieldProps } from 'formik';
import Button from '@/components/atoms/button';
import Container from '../container';
import Text from '../text';
import { ChevronDown, Cross } from '@strapi/icons';

// Define the props for the TimeZone component
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
    form, // Ensure 'form' is correctly received in props
    timeZone,
    timeZones,
    onTimeZoneChange,
    showDropdown,
    toggleDropdown,
    // searchQuery,
    onSearchQueryChange,
    className = '',
}) => {
    const [inputValue, setInputValue] = useState('');

    // Filter time zones based on the input value
    const filteredTimeZones = timeZones.filter((zone) =>
        zone.label.toLowerCase().includes(inputValue.toLowerCase()),
    );

    // Handle input change and set form field value
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputValue(value);
        onSearchQueryChange(value);
        form.setFieldValue(field.name, value); // Ensure form is correctly passed and destructured
    };

    // Handle time zone selection
    const handleTimeZoneSelect = (zoneValue: string) => {
        onTimeZoneChange(zoneValue);
        if (form) {
            form.setFieldValue(field.name, zoneValue); // Check if form is defined before using it
        }
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
                <Text className='font-medium'>{timeZone}</Text>
                <Text className='ml-2'>{showDropdown ? <Cross /> : <ChevronDown />}</Text>
            </Button>
            {showDropdown && (
                <div
                    className='absolute mt-2 max-h-60 w-full overflow-y-auto rounded-md bg-white shadow-lg ring-1 ring-black/5'
                    style={{ zIndex: 9999 }} // Ensure dropdown is above other elements
                >
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
