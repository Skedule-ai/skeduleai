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
                <div className='mx-auto flex max-w-screen-xl flex-wrap items-center justify-between'>
                    <a href='#' className='flex items-center'>
                        <img
                            src={logoSrc}
                            className='mr-3 size-6 rounded-full sm:size-9'
                            height={24}
                            width={50}
                            alt={logoAlt}
                        />
                        <span className='self-center whitespace-nowrap text-xl font-semibold text-blue-700'>
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
