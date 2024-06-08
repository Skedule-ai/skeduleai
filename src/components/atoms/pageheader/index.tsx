import React from 'react';
import Button from '@/components/atoms/button';
import { Flex } from '../flex';

interface NavbarProps {
    logoSrc: string;
    logoAlt: string;
    OrganizationName: string;
}

const PageHeader: React.FC<NavbarProps> = ({ logoSrc, logoAlt, OrganizationName }) => {
    return (
        <>
            <nav className='w-screen border-b-2 border-gray-300 bg-white p-6'>
                <div className='mx-auto max-w-screen-xl flex-wrap items-center justify-between md:flex'>
                    <a href='#' className='flex items-center justify-center'>
                        <img
                            src={logoSrc}
                            className='mr-3 size-10 rounded-full sm:size-9 md:size-6'
                            height={24}
                            width={50}
                            alt={logoAlt}
                        />
                        <span className='self-center whitespace-nowrap text-3xl font-semibold text-blue-700 md:text-xl'>
                            {OrganizationName}
                        </span>
                    </a>
                    <div className='ml-auto hidden items-end md:flex lg:order-2'>
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
