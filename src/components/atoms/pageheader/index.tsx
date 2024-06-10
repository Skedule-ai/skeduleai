import React from 'react';
import Button from '@/components/atoms/button';
import Image from 'next/image';
import { Flex } from '../flex';

interface NavbarProps {
    logoSrc: string;
    logoAlt: string;
    OrganizationName: string;
}

const PageHeader: React.FC<NavbarProps> = ({ logoSrc, logoAlt, OrganizationName }) => {
    return (
        <>
            <nav className='w-full border-gray-200 bg-white px-4 py-2.5 lg:px-6 dark:bg-gray-800'>
                <div className='mx-auto flex max-w-screen-xl flex-wrap items-center justify-between'>
                    <a href='#' className='flex items-center'>
                        <Image
                            src={logoSrc}
                            height={24}
                            width={50}
                            className='mr-3 h-6 sm:h-9'
                            alt={logoAlt}
                        />
                        <span className='self-center whitespace-nowrap text-3xl font-semibold text-blue-700 md:text-xl'>
                            {OrganizationName}
                        </span>
                    </a>
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
                </div>
            </nav>
        </>
    );
};

export default PageHeader;
