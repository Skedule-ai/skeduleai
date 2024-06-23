import React from 'react';
import { TimeInputProps, timeInputVariants } from './timeInput.variants';

interface Props extends TimeInputProps {
    onStartChange: (value: string) => void;
    onEndChange: (value: string) => void;
}

const WorkingHoursSelector: React.FC<Props> = ({ size, onStartChange, onEndChange, ...rest }) => {
    return (
        <div className='flex items-center space-x-8'>
            <div className={timeInputVariants({ size, ...rest })}>
                <div>
                    <label htmlFor='startHour' className='block text-gray-700'>
                        {'Start Hour'}
                    </label>
                    <input
                        type='time'
                        id='startHour'
                        className='mt-1 rounded border p-2 focus:border-blue-300 focus:outline-none focus:ring'
                        onChange={(e) => onStartChange(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor='endHour' className='block text-gray-700'>
                        {'End Hour'}
                    </label>
                    <input
                        type='time'
                        id='endHour'
                        className='mt-1 rounded border p-2 focus:border-blue-300 focus:outline-none focus:ring'
                        onChange={(e) => onEndChange(e.target.value)}
                    />
                </div>
            </div>
        </div>
    );
};

export default WorkingHoursSelector;
