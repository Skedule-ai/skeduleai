import React from 'react';
import Button from '@/components/atoms/button';
import Container from '../container';

type TimeZoneProps = {
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

const TimeZone: React.FC<TimeZoneProps> = ({
    currentDate,
    timeZone,
    timeZones,
    onDateChange,
    onTimeZoneChange,
    showDropdown,
    toggleDropdown,
    searchQuery,
    onSearchQueryChange,
}) => {
    const filteredTimeZones = timeZones.filter((zone) =>
        zone.label.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    return (
        <>
            <Container className='relative'>
                <Button
                    className='flex items-center bg-white px-4 py-2 text-black shadow'
                    color='tertiary'
                    size='lg'
                    onClick={toggleDropdown}
                >
                    <span>{timeZone}</span>
                    <span className='ml-2'>{showDropdown ? '✖️' : '▼'}</span>
                </Button>
                {showDropdown && (
                    <div className='absolute mt-2 max-h-60 w-48 overflow-y-auto rounded-md bg-white shadow-lg ring-1 ring-black/5'>
                        <input
                            type='text'
                            placeholder='Search...'
                            value={searchQuery}
                            onChange={(e) => onSearchQueryChange(e.target.value)}
                            className='block w-full border-b border-gray-200 px-4 py-2 text-sm text-gray-900 focus:outline-none'
                        />
                        {filteredTimeZones.map((zone) => (
                            <button
                                key={zone.value}
                                className='block w-full px-4 py-2 text-sm text-gray-900 hover:bg-gray-100'
                                onClick={() => onTimeZoneChange(zone.value)}
                            >
                                {zone.label}
                            </button>
                        ))}
                    </div>
                )}
            </Container>
        </>
    );
};

export default TimeZone;
