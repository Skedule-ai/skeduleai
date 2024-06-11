'use client';

import React, { useState } from 'react';
import { Flex } from '@/components/atoms/flex';
import { GuestForm, SignInForm, SignUpForm } from '@/components/organisms/booking-form';

const formOptions = ['Guest', 'Sign In', 'Sign Up'];

const BookingModalVariants: React.FC = () => {
    const [activeForm, setActiveForm] = useState('Guest');

    const renderForm = () => {
        switch (activeForm) {
            case 'Guest':
                return <GuestForm onSubmit={(values) => console.log(values)} />;
            case 'Sign In':
                return <SignInForm onSubmit={(values) => console.log(values)} />;
            case 'Sign Up':
                return <SignUpForm onSubmit={(values) => console.log(values)} />;
            default:
                return null;
        }
    };

    return (
        <div className='m-auto w-11/12 rounded-md border-2 border-[#DCDCE4] bg-[#F6F6F9] p-6 shadow-md md:w-auto'>
            <Flex dir='row' gap={4} justifyContent='center'>
                {formOptions.map((option) => (
                    <div
                        key={option}
                        onClick={() => setActiveForm(option)}
                        className={`cursor-pointer px-4 py-2 text-sm font-bold md:text-base ${
                            activeForm === option
                                ? 'border-b-2 border-blue-500 text-blue-500'
                                : 'border-b-2 border-white text-gray-500'
                        }`}
                    >
                        {option}
                    </div>
                ))}
            </Flex>
            <div className='mt-6'>{renderForm()}</div>
        </div>
    );
};

export default BookingModalVariants;
