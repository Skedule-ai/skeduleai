import React from 'react';
import Container from '@/components/atoms/container';
import { Flex } from '@/components/atoms/flex';

const SidebarLoader: React.FC = () => (
    <Container className='fixed inset-y-0 left-0 z-40 h-screen w-52 bg-white shadow-lg'>
        <Flex className='flex h-full flex-col bg-gray-50 text-black'>
            <Flex className='items-center justify-center p-4'>
                <div className='h-6 w-24 rounded bg-slate-200'></div>
            </Flex>
            <ul className='mt-4 w-full grow'>
                <li className='mt-8 flex items-center px-3'>
                    <Flex className='h-5 w-72 animate-pulse rounded-md bg-slate-200 p-5'></Flex>
                </li>
                <li className='mt-8 flex items-center px-3'>
                    <Flex className='h-5 w-72 animate-pulse rounded-md bg-slate-200 p-5'></Flex>
                </li>
                <li className='mt-8 flex items-center px-3'>
                    <Flex className='h-5 w-72 animate-pulse rounded-md bg-slate-200 p-5'></Flex>
                </li>
                <li className='mt-8 flex items-center px-3'>
                    <Flex className='h-5 w-72 animate-pulse rounded-md bg-slate-200 p-5'></Flex>
                </li>
                <li className='mt-8 flex items-center px-3'>
                    <Flex className='h-5 w-72 animate-pulse rounded-md bg-slate-200 p-5'></Flex>
                </li>
                <li className='mt-8 flex items-center px-3'>
                    <Flex className='h-5 w-72 animate-pulse rounded-md bg-slate-200 p-5'></Flex>
                </li>
            </ul>
            <Flex className='justify-center p-4'>
                <Flex className='h-10 w-24 rounded bg-slate-200'></Flex>
            </Flex>
            <Flex className='shrink-0 items-center justify-center px-4 py-2'>
                <Flex className='h-10 w-24 rounded bg-slate-200'></Flex>
            </Flex>
        </Flex>
    </Container>
);

export default SidebarLoader;
