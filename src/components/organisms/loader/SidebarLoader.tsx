import React from 'react';
import Container from '@/components/atoms/container';
import { Flex } from '@/components/atoms/flex';

const SidebarLoader: React.FC = () => (
    <Flex className='flex w-full justify-center'>
        <Container className='fixed inset-y-0 left-0 z-40 h-screen w-52 bg-white shadow-lg'>
            <Flex className='flex h-full flex-col bg-gray-50 text-black'>
                <Flex className='h-full' dir='column' justifyContent='end'>
                    <Flex className='justify-center p-4'>
                        <Flex className='h-10 w-24 rounded bg-slate-200'></Flex>
                    </Flex>
                    <Flex className='shrink-0 items-center justify-center px-4 py-2'>
                        <Flex className='h-10 w-24 rounded bg-slate-200'></Flex>
                    </Flex>
                </Flex>
            </Flex>
        </Container>
    </Flex>
);

export default SidebarLoader;
