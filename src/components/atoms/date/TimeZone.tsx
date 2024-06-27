'use client';

import React, { useState, useEffect } from 'react';

import moment from 'moment-timezone';
import TimeZoneDisplay from './TimeZoneDisplay';
import { FieldProps } from 'formik';
type TimeZoneProps = FieldProps & {
    handleFieldValueChange?: (zone: string) => void;
};

const TimeZone = ({ field, form, meta, handleFieldValueChange }: TimeZoneProps) => {
    const [, setCurrentDay] = useState('');
    // const [, setCurrentDate] = useState(moment().format('YYYY-MM-DD'));
    const [, setCurrentTime] = useState('');
    const [timeZone, setTimeZone] = useState(moment.tz.guess());
    const [showDropdown, setShowDropdown] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    // Fetch the list of time zones from moment-timezone
    const timeZones = moment.tz.names().map((zone) => ({
        label: zone.replace('_', ' '),
        value: zone,
    }));

    useEffect(() => {
        const updateDateTime = () => {
            const date = moment().tz(timeZone);
            setCurrentDay(date.format('dddd'));
            setCurrentTime(date.format('HH:mm:ss'));
        };

        updateDateTime();
        const interval = setInterval(updateDateTime, 1000);

        return () => clearInterval(interval);
    }, [timeZone]);

    // const handleDateChange = (date: string) => {
    //     setCurrentDate(date);
    // };

    const handleTimeZoneChange = (zone: string) => {
        setTimeZone(zone);
        setShowDropdown(false);
        handleFieldValueChange?.(zone);
    };

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const handleSearchQueryChange = (query: string) => {
        setSearchQuery(query);
    };

    return (
        <TimeZoneDisplay
            // currentDay={currentDay}
            // currentDate={currentDate}
            // currentTime={currentTime}
            timeZone={timeZone}
            timeZones={timeZones}
            // onDateChange={handleDateChange}
            onTimeZoneChange={handleTimeZoneChange}
            searchQuery={searchQuery}
            onSearchQueryChange={handleSearchQueryChange}
            field={field}
            form={form}
            meta={meta}
            showDropdown={showDropdown}
            toggleDropdown={toggleDropdown}
        />
    );
};

export default TimeZone;
