import React from 'react';
import { SignInButton, SignUpButton, useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import Button from '@/components/atoms/button';
import { Flex } from '../flex';
import Link from 'next/link';

interface NavbarProps {
    logoSrc: React.ReactNode;
    OrganizationName: string;
}

const PageHeader: React.FC<NavbarProps> = ({ logoSrc, OrganizationName }) => {
    const { isSignedIn } = useUser();
    const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
    console.log(currentUrl)

    return (
        <>
            <nav className='w-full border-b-2 border-gray-200 bg-white px-4 py-2.5 lg:p-5'>
                <div className='mx-auto flex max-w-screen-xl flex-wrap items-center justify-between'>
                    <div className='flex gap-3'>
                        <Link href='/' className='flex items-center gap-4'>
                            {logoSrc}
                        </Link>
                        <span className='text-3xl font-semibold text-blue-700 md:text-3xl'>
                            {OrganizationName}
                        </span>
                    </div>
                    {!isSignedIn && (
                        <div className='ml-auto flex items-end lg:order-2'>
                            <Flex gap={2}>
                                <SignInButton signUpForceRedirectUrl={currentUrl} mode='modal'>
                                    <Button size='md' color='tertiary'>
                                        {'Sign in'}
                                    </Button>
                                </SignInButton>
                                <SignUpButton signInForceRedirectUrl={currentUrl} mode='modal'>
                                    <Button size='md' color='tertiary'>
                                        {'Sign up'}
                                    </Button>
                                </SignUpButton>
                            </Flex>
                        </div>
                    )}
                </div>
            </nav>
        </>
    );
};

export default PageHeader;
