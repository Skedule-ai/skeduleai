'use client';
import React from 'react';
import Date from '@/components/atoms/date';
import SideBar from '@/components/organisms/sidebar';
import { Flex } from '@/components/atoms/flex';

const Home = () => {
    return (
        <Flex>
            <SideBar />
            <Date />
        </Flex>
    );
};

export default Home;
