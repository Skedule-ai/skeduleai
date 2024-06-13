'use client';
import React, { useState } from 'react';

type SwitchProps = {
    label1: string;
    label2: string;
    onToggle: (isChecked: boolean) => void;
};

const Switch: React.FC<SwitchProps> = ({ label1, label2, onToggle }) => {
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = () => {
        const newCheckedState = !isChecked;
        setIsChecked(newCheckedState);
        onToggle(newCheckedState);
    };

    return (
        <center>
            <div className='mb-1 w-72 rounded border-gray-200 bg-gray-100 py-1 text-sm'>
                <label className='themeSwitcherTwo shadow-card bg-gray relative inline-flex cursor-pointer select-none items-center justify-center rounded-md p-1'>
                    <input
                        type='checkbox'
                        className='sr-only'
                        checked={isChecked}
                        onChange={handleCheckboxChange}
                    />
                    <span
                        className={`flex items-center rounded border px-[18px] py-2 text-sm font-medium ${
                            isChecked ? 'text-black' : 'body-color bg-white text-blue-600/100'
                        }`}
                    >
                        {label1}
                    </span>
                    <span
                        className={`ml-space-x-[6px] ml-2 flex items-center rounded border px-[18px] py-2 text-sm font-medium ${
                            !isChecked ? 'text-black' : 'body-color bg-white text-blue-600/100'
                        }`}
                    >
                        {label2}
                    </span>
                </label>
            </div>
        </center>
    );
};

export default Switch;
