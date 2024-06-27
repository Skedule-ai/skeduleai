import React from 'react';
import Button from '@/components/atoms/button';
import Container from '../container';

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
            <Container className='mb-4 block sm:hidden'>
                <Button className='p-2' size='md' color='tertiary' type='button'>
                    <svg
                        className='size-6 cursor-pointer'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                        xmlns='http://www.w3.org/2000/svg'
                    >
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M4 6h16M4 12h16m-16 6h16'
                        />
                    </svg>
                </Button>
            </Container>
            <Button
                className='mb-4 flex items-center bg-white px-4 py-2 font-semibold text-black shadow sm:mb-0'
                color='tertiary'
                size='lg'
            >
                <input
                    type='date'
                    value={currentDate}
                    onChange={(e) => onDateChange(e.target.value)}
                    className='bg-transparent focus:outline-none'
                />
            </Button>
        </>
    );
};

export default DateTimeDisplay;
