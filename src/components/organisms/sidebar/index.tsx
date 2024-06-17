'use client';
import React, { useState, useEffect } from 'react';
import { sidebarVariants } from './sidebar.variants';
import Container from '@/components/atoms/container';
import Button from '@/components/atoms/button';
import ScheduleAILogo from '@/components/atoms/icons/schedule-ai-logo';
import Dropdown from '@/components/atoms/dropdown';
import Text from '@/components/atoms/text';
import { Flex } from '@/components/atoms/flex';

type SidebarProps = {
    collapse?: boolean;
};

const SideBar: React.FC<SidebarProps> = ({ collapse = false, ...props }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(collapse);

    const handleToggle = () => setIsOpen(!isOpen);

    const containerClass = sidebarVariants({ collapse: isCollapsed, hide: !isOpen });

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }
    }, [isOpen]);

    return (
        <>
            {!isOpen && (
                <div className='fixed left-4 top-4 z-50 w-full md:hidden'>
                    <Button
                        className='p-2'
                        onClick={handleToggle}
                        size='xs'
                        color='tertiary'
                        type='button'
                    >
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
            )}
            <Container
                className={`fixed inset-y-0 left-0 z-40 h-screen w-64 transform bg-white shadow-lg transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:w-64 md:translate-x-0 md:shadow-none`}
            >
                <Container
                    className={`${containerClass} flex h-full flex-col ${isCollapsed ? 'bg-transparent' : 'bg-gray-50'} text-black`}
                    {...props}
                >
                    <Flex className='items-center justify-between p-4'>
                        <a href='/'>
                            <ScheduleAILogo />
                        </a>
                        <Button
                            className='p-2 md:hidden'
                            onClick={handleToggle}
                            size='xs'
                            color='tertiary'
                            type='button'
                        >
                            <>
                                <span className='sr-only'>{'Close'}</span>
                                &#10005;
                            </>
                        </Button>
                    </Flex>
                    <ul className='ml-1 mt-4 w-full grow'>
                        <li className='flex items-center px-4 py-2 hover:bg-gray-100'>
                            <Dropdown
                                color='primary'
                                items={[
                                    { label: 'Service Provider', value: 'account' },
                                    { label: 'Consumer', value: 'account' },
                                ]}
                                onChange={() => {}}
                                placeholder='Service Provider'
                                size='md'
                            />
                        </li>
                        <li className='mt-8 flex items-center px-4 py-2 hover:bg-gray-100'>
                            <a href='/appointments' className='flex w-full items-center text-black'>
                                <Text weight='medium' size='sm'>
                                    {'Booking Page'}
                                </Text>
                            </a>
                        </li>
                        <li className='flex items-center px-4 py-2 hover:bg-gray-100'>
                            <a href='/' className='flex w-full items-center text-black'>
                                <Text weight='medium' size='sm'>
                                    {'Staff'}
                                </Text>
                            </a>
                        </li>
                        <li className='flex items-center px-4 py-2 hover:bg-gray-100'>
                            <a href='/' className='flex w-full items-center text-black'>
                                <Text weight='medium' size='sm'>
                                    {' Calendar'}
                                </Text>
                            </a>
                        </li>
                        <li className='flex items-center px-4 py-2 hover:bg-gray-100'>
                            <a href='/' className='flex w-full items-center text-black'>
                                <Text weight='medium' size='sm'>
                                    {'Services'}
                                </Text>
                            </a>
                        </li>
                        <li className='flex items-center px-4 py-2 hover:bg-gray-100'>
                            <a href='/' className='flex w-full items-center text-black'>
                                <Text weight='medium' size='sm'>
                                    {'Integration'}
                                </Text>
                            </a>
                        </li>
                    </ul>
                    <Flex className='shrink-0 items-center justify-center'>
                        <Button color='outline' size='md' className='flex w-24 justify-center'>
                            {' My Profile'}
                        </Button>
                    </Flex>
                    <Flex className='shrink-0 items-center justify-center px-4 py-2'>
                        <Button color='outline' size='md' className='flex w-24 justify-center'>
                            {'Log Out'}
                        </Button>
                    </Flex>
                </Container>
            </Container>
        </>
    );
};

export default SideBar;
