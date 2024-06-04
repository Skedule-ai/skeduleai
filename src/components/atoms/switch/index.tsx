'use client';
import React, { useState } from 'react';

const Index = () => {
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };
    return (
        <>
            <div className='mb-2 me-2 rounded-lg border border-gray-200 bg-gray-100 bg-white px-5 py-2.5 text-sm font-medium focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:bg-gray-800 dark:focus:ring-gray-700'>
                <label className='themeSwitcherTwo shadow-card bg-gray relative inline-flex cursor-pointer select-none items-center justify-center rounded-md p-1'>
                    <input
                        type='checkbox'
                        className='sr-only'
                        checked={isChecked}
                        onChange={handleCheckboxChange}
                    />
                    <span
                        className={`flex items-center space-x-[6px] rounded border px-[18px] py-2 text-sm font-medium ${
                            isChecked ? 'text-black' : 'body-color bg-white text-blue-600/100'
                        }`}
                    >
                        Organization
                    </span>
                    <span
                        className={`ml-space-x-[6px] ml-2 flex items-center rounded border px-[18px] py-2 text-sm font-medium ${
                            !isChecked ? 'text-black' : 'body-color bg-white text-blue-600/100'
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
