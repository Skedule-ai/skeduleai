'use client';

import React from 'react';
import Date from '@/components/atoms/date';
import SideBar from '@/components/organisms/sidebar';

const Home = () => {
    return (
        <div className='flex h-screen'>
            <div className='fixed h-full w-64 bg-gray-800 text-white'>
                <SideBar />
            </div>
            <Date />
        </div>
    );
};

export default Home;
