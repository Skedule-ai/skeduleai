'use client';
import React, { useState } from 'react';

const Index = () => {
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };
    return (
        <>
            <div className='mb-2 me-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700'>
                <label className='themeSwitcherTwo shadow-card relative inline-flex cursor-pointer select-none items-center justify-center rounded-md bg-white p-1'>
                    <input
                        type='checkbox'
                        className='sr-only'
                        checked={isChecked}
                        onChange={handleCheckboxChange}
                    />
                    <span
                        className={`flex items-center space-x-[6px] rounded px-[18px] py-2 text-sm font-medium ${
                            !isChecked ? 'text-primary bg-[#f4f7ff]' : 'text-body-color-blue'
                        }`}
                    >
                        Organization
                    </span>
                    <span
                        className={`flex items-center space-x-[6px] rounded px-[18px] py-2 text-sm font-medium ${
                            isChecked ? 'text-primary bg-[#f4f7ff]' : 'text-body-color'
                        }`}
                    >
                        Individual
                    </span>
                </label>
            </div>
        </>
    );
};

export default Index;
