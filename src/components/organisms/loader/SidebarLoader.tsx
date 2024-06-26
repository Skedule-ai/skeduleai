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
                <li className='mt-8 flex items-center px-5 py-2'>
                    <div className='col-span-2 h-2 w-full rounded bg-slate-200'></div>
                </li>
                <li className='mt-8 flex items-center px-5 py-2'>
                    <div className='col-span-2 h-2 w-full rounded bg-slate-200'></div>
                </li>
                <li className='mt-8 flex items-center px-5 py-2'>
                    <div className='col-span-2 h-2 w-full rounded bg-slate-200'></div>
                </li>
                <li className='mt-8 flex items-center px-5 py-2'>
                    <div className='col-span-2 h-2 w-full rounded bg-slate-200'></div>
                </li>
                <li className='mt-8 flex items-center px-5 py-2'>
                    <div className='col-span-2 h-2 w-full rounded bg-slate-200'></div>
                </li>
                <li className='mt-8 flex items-center px-5 py-2'>
                    <div className='col-span-2 h-2 w-full rounded bg-slate-200'></div>
                </li>
            </ul>
            <Flex className='justify-center p-4'>
                <div className='h-10 w-24 rounded bg-slate-200'></div>
            </Flex>
            <Flex className='shrink-0 items-center justify-center px-4 py-2'>
                <div className='h-10 w-24 rounded bg-slate-200'></div>
            </Flex>
        </Flex>
    </Container>
);

export default SidebarLoader;
