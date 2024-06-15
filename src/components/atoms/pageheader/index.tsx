import React from 'react';
import Button from '@/components/atoms/button';
// import Image from 'next/image';
import { Flex } from '../flex';

interface NavbarProps {
    logoSrc: React.ReactNode;
    isUserSignedIn: boolean;
    OrganizationName: string;
}

const PageHeader: React.FC<NavbarProps> = ({ logoSrc, OrganizationName, isUserSignedIn }) => {
    return (
        <>
            <nav className='w-full border-b-2 border-gray-200 bg-white px-4 py-2.5 lg:p-5'>
                <div className='mx-auto flex max-w-screen-xl flex-wrap items-center justify-between'>
                    <a href='#' className='flex items-center gap-4'>
                        {logoSrc}
                        <span className='text-3xl font-semibold text-blue-700 md:text-3xl'>
                            {OrganizationName}
                        </span>
                    </a>
                    {!isUserSignedIn && (
                        <div className='ml-auto flex items-end lg:order-2'>
                            <Flex gap={2}>
                                <Button size='md' color='tertiary'>
                                    Sign in
                                </Button>
                                <Button size='md' color='tertiary'>
                                    Sign up
                                </Button>
                            </Flex>
                        </div>
                    )}
                </div>
            </nav>
        </>
    );
};

export default PageHeader;
