'use client';

import React, { useState, useEffect } from 'react';
import { sidebarVariants, SidebarVariants } from './sidebar.variants';
import Container from '@/components/atoms/container';
import Button from '@/components/atoms/button';
import ScheduleAILogo from '@/components/atoms/icons/schedule-ai-logo';
import Text from '@/components/atoms/text';
import { Flex } from '@/components/atoms/flex';
import Link from 'next/link';
import { SignOutButton } from '@clerk/nextjs';
import { UserProfile } from '@clerk/clerk-react';

type SidebarProps = SidebarVariants & {
    collapse?: boolean;
};

const SideBar: React.FC<SidebarProps> = ({ collapse = false, ...props }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isCollapsed] = useState(collapse);
    const [showUserProfile, setShowUserProfile] = useState(false);

    const handleToggle = () => setIsOpen(!isOpen);

    const containerClass = sidebarVariants({ collapse: isCollapsed, hide: !isOpen });

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }
    }, [isOpen]);

    const handleProfileClick = () => {
        setShowUserProfile(!showUserProfile);
    };

    return (
        <>
            {!isOpen && (
                <div className='fixed left-4 top-4 z-50 w-full md:hidden'>
                    <Button
                        className='cursor-pointer p-2'
                        onClick={handleToggle}
                        size='xs'
                        color='tertiary'
                        type='button'
                    >
                        <svg
                            className='size-6'
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
                className={`fixed inset-y-0 left-0 z-40 h-screen w-52 bg-white shadow-lg transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:w-52 md:translate-x-0 md:shadow-none`}
                style={{ position: 'sticky', top: '0' }}
            >
                <Container
                    className={`${containerClass} flex h-full flex-col ${isCollapsed ? 'bg-transparent' : 'bg-gray-50'} overflow-hidden text-black`}
                    {...props}
                >
                    <Flex className='items-center justify-center p-4'>
                        <Link href='/'>
                            <ScheduleAILogo />
                        </Link>
                        <Button
                            className='cursor-pointer p-2 md:hidden'
                            onClick={handleToggle}
                            size='xs'
                            color='tertiary'
                            type='button'
                        >
                            <span className='sr-only'>{'Close'}</span>
                            &#10005;
                        </Button>
                    </Flex>
                    <ul className='mt-4 w-full grow'>
                        <li className='mt-8 flex cursor-pointer items-center px-5 py-2 hover:bg-blue-100'>
                            <Link
                                href='/appointments'
                                className='flex w-full cursor-pointer items-center text-black'
                            >
                                <Text weight='medium' size='sm'>
                                    {'Appointments'}
                                </Text>
                            </Link>
                        </li>
                    </ul>
                    <Flex justifyContent='center' alignItems='center'>
                        <Button
                            color='outline'
                            size='md'
                            className='flex w-24 cursor-pointer justify-center'
                            onClick={handleProfileClick}
                        >
                            {'My Profile'}
                        </Button>
                    </Flex>
                    <Flex className='shrink-0 items-center justify-center px-4 py-2'>
                        <Button
                            color='outline'
                            size='md'
                            className='flex w-24 cursor-pointer justify-center'
                        >
                            <SignOutButton>{'Log Out'}</SignOutButton>
                        </Button>
                    </Flex>
                </Container>
            </Container>
            {showUserProfile && (
                <div className='fixed inset-0 z-50 m-auto flex h-[400px] w-[500px] items-center justify-center'>
                    <div>
                        <Button
                            className='absolute right-2 top-2 cursor-pointer p-2'
                            onClick={handleProfileClick}
                            size='xs'
                            color='tertiary'
                            type='button'
                        ></Button>
                        <UserProfile />
                    </div>
                </div>
            )}
        </>
    );
};

export default SideBar;
