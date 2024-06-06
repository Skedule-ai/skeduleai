import React from 'react';
import { sidebarVariants } from './sidebar.variants';
import Container from '@/components/atoms/container';
import Button from '@/components/atoms/button';

type SidebarProps = {
    collapse?: boolean;
};

const SideBar: React.FC<SidebarProps> = ({ collapse, ...props }) => {
    const containerClass = sidebarVariants({ collapse });

    return (
        <>
            <div className='fixed h-full w-64 bg-gray-800 text-white'>
                <Container
                    className={`${containerClass} flex h-full flex-col bg-white text-black`}
                    {...props}
                >
                    <div className='flex flex-shrink-0 items-center justify-center py-4'>
                        <a href='/'>
                            <img src='/Light Mode.png' alt='Logo' className='h-10' />
                        </a>
                    </div>
                    <ul className='mt-4 w-full flex-grow'>
                        <li className='flex items-center px-4 py-2 hover:bg-gray-100'>
                            <a href='/dashboard'>Dashboard</a>
                        </li>
                        <li className='flex items-center px-4 py-2 hover:bg-gray-100'>
                            <a href='/appointments'>Appointments</a>
                        </li>
                        <li className='flex items-center px-4 py-2 hover:bg-gray-100'>
                            <a href='/'>Calendar</a>
                        </li>
                        <li className='flex items-center px-4 py-2 hover:bg-gray-100'>
                            <a href='/'>Inbox</a>
                        </li>
                        <li className='flex items-center px-4 py-2 hover:bg-gray-100'>
                            <a href='/'>Map</a>
                        </li>
                    </ul>
                    <div className='mt-auto flex flex-shrink-0 items-center justify-center px-4 py-2'>
                        <Button className='px-6 py-2' color='outline' size='md'>
                            Log out
                        </Button>
                    </div>
                </Container>
            </div>
        </>
    );
};

export default SideBar;
