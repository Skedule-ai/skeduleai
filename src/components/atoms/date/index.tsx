'use client';

import React, { useState, useEffect } from 'react';
import Button from '@/components/atoms/button';

const DateComponent = () => {
    // Date and time states
    const [currentDay, setCurrentDay] = useState('');
    const [currentDate, setCurrentDate] = useState(new Date().toISOString().substring(0, 10));
    const [currentTime, setCurrentTime] = useState('');
    const [timeZone, setTimeZone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);
    const [showDropdown, setShowDropdown] = useState(false);

    // Time zones list
    const timeZones = [
        { label: 'UTC', value: 'UTC' },
        { label: 'New York', value: 'America/New_York' },
        { label: 'London', value: 'Europe/London' },
        { label: 'Tokyo', value: 'Asia/Tokyo' },
        { label: 'Sydney', value: 'Australia/Sydney' },
        { label: 'Berlin', value: 'Europe/Berlin' },
        { label: 'Moscow', value: 'Europe/Moscow' },
        { label: 'India', value: 'Asia/Kolkata' },
        { label: 'Beijing', value: 'Asia/Shanghai' },
        { label: 'Sao Paulo', value: 'America/Sao_Paulo' },
    ];

    // Update date and time based on the selected time zone
    useEffect(() => {
        const updateDateTime = () => {
            const date = new Date();
            const dayFormatter = new Intl.DateTimeFormat(undefined, { weekday: 'long', timeZone });
            const timeFormatter = new Intl.DateTimeFormat(undefined, {
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                timeZone,
            });

            setCurrentDay(dayFormatter.format(date));
            setCurrentTime(timeFormatter.format(date));
        };

        updateDateTime();
        const interval = setInterval(updateDateTime, 1000);

        return () => clearInterval(interval);
    }, [timeZone]);

    // Format the date for Google Calendar link (YYYYMMDD)
    const formatForGoogleCalendar = (date: string): string => {
        const [year, month, day] = date.split('-');
        return `${year}${month}${day}`;
    };

    const googleCalendarDate = formatForGoogleCalendar(currentDate);

    return (
        <div className='ml-64 flex flex-grow flex-col'>
            <header className='flex p-4'>
                <Button
                    className='flex items-center bg-white px-4 py-2 text-black shadow'
                    color='tertiary'
                    size='md'
                >
                    <span>{currentDay}</span>
                </Button>
                <Button
                    className='ml-4 flex items-center bg-white px-4 py-2 text-black shadow'
                    color='tertiary'
                    size='md'
                >
                    <input
                        type='date'
                        value={currentDate}
                        onChange={(e) => setCurrentDate(e.target.value)}
                    />
                </Button>
                <Button
                    className='ml-4 flex items-center bg-white px-4 py-2 text-black shadow'
                    color='tertiary'
                    size='md'
                >
                    <span>{currentTime}</span>
                </Button>
                <div className='relative ml-5'>
                    <Button
                        className='flex items-center bg-white px-4 py-2 text-black shadow'
                        color='tertiary'
                        size='md'
                        onClick={() => setShowDropdown(!showDropdown)}
                    >
                        <span>{timeZone}</span>
                        <span className='ml-2'>{showDropdown ? '❌' : '▼'}</span>{' '}
                        {/* Cross icon when dropdown is shown, arrow icon otherwise */}
                    </Button>
                    {showDropdown && (
                        <div className='absolute mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5'>
                            {timeZones.map((zone) => (
                                <button
                                    key={zone.value}
                                    className='block w-full px-4 py-2 text-sm text-gray-900 hover:bg-gray-100'
                                    onClick={() => {
                                        setTimeZone(zone.value);
                                        setShowDropdown(false);
                                    }}
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

export default DateComponent;
