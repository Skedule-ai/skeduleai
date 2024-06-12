import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Header1, Subtitle } from '@/components/atoms/typography';
import OrganizationForm from '@/components/organisms/organization-form';
import IndividualForm from '@/components/organisms/individual';
import { Flex } from '@/components/atoms/flex';

const Index = ({ label1, label2 }) => {
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    return (
        <Flex dir='column' gap={6}>
            <Flex dir='column'>
                <center>
                    <div className='border-rounded w-60 bg-gray-100'>
                        <label className='themeSwitcherTwo shadow-card bg-gray relative inline-flex cursor-pointer select-none items-center justify-center rounded-md p-1'>
                            <input
                                type='checkbox'
                                className='sr-only'
                                checked={isChecked}
                                onChange={handleCheckboxChange}
                            />
                            <span
                                className={`flex items-center space-x-[6px] rounded border px-[18px] py-2 text-sm font-medium ${
                                    isChecked
                                        ? 'text-black'
                                        : 'body-color bg-white text-blue-600/100'
                                }`}
                            >
                                {label1}
                            </span>
                            <span
                                className={`ml-space-x-[6px] ml-2 flex items-center rounded border px-[18px] py-2 text-sm font-medium ${
                                    !isChecked
                                        ? 'text-black'
                                        : 'body-color bg-white text-blue-600/100'
                                }`}
                            >
                                {label2}
                            </span>
                        </label>
                    </div>
                </center>
                {isChecked ? (
                    <div className='mt-2'>
                        <Subtitle>Tell Us About</Subtitle>
                        <Header1>Your Business</Header1>
                        <div className='mt-2'>
                            <IndividualForm submitBtnText='Continue' />
                        </div>
                    </div>
                ) : (
                    <div className='mt-2'>
                        <Subtitle>Tell Us About</Subtitle>
                        <Header1>Your Organization</Header1>
                        <div className='mt-2'>
                            <OrganizationForm submitBtnText='Continue' />
                        </div>
                    </div>
                )}
            </Flex>
        </Flex>
    );
};

Index.propTypes = {
    label1: PropTypes.string.isRequired,
    label2: PropTypes.string.isRequired,
};

export default Index;
