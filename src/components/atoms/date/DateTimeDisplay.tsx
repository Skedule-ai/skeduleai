import React from 'react';
import PropTypes from 'prop-types';
import Button from '@/components/atoms/button';

const DateTimeDisplay = ({
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
        <div className='flex flex-grow flex-col p-4'>
            <header className='flex flex-col items-start sm:flex-row sm:items-center sm:space-x-4'>
                <div className='mb-4 block sm:hidden'>
                    <Button className='p-2' size='xs' color='tertiary' type='button'>
                        <svg
                            className='h-6 w-6'
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
                </div>
                <Button
                    className='mb-4 flex items-center bg-white px-4 py-2 text-black shadow sm:mb-0'
                    color='tertiary'
                    size='md'
                >
                    <input
                        type='date'
                        value={currentDate}
                        onChange={(e) => onDateChange(e.target.value)}
                        className='focus:outline-none'
                    />
                </Button>
                <div className='relative'>
                    <Button
                        className='flex items-center bg-white px-4 py-2 text-black shadow'
                        color='tertiary'
                        size='md'
                        onClick={toggleDropdown}
                    >
                        <span>{timeZone}</span>
                        <span className='ml-2'>{showDropdown ? '✖️' : '▼'}</span>
                    </Button>
                    {showDropdown && (
                        <div className='absolute mt-2 max-h-60 w-48 overflow-y-auto rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5'>
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
                </div>
            </header>
        </div>
    );
};

DateTimeDisplay.propTypes = {
    currentDate: PropTypes.string.isRequired,
    timeZone: PropTypes.string.isRequired,
    timeZones: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string,
            value: PropTypes.string,
        }),
    ).isRequired,
    onDateChange: PropTypes.func.isRequired,
    onTimeZoneChange: PropTypes.func.isRequired,
    showDropdown: PropTypes.bool.isRequired,
    toggleDropdown: PropTypes.func.isRequired,
    searchQuery: PropTypes.string.isRequired,
    onSearchQueryChange: PropTypes.func.isRequired,
};

export default DateTimeDisplay;
