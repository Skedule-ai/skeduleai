// File: TextSkeleton.tsx
import React from 'react';
import { Flex } from '@/components/atoms/flex';

const TextLoader: React.FC = () => {
    return (
        <Flex className='flex animate-pulse space-x-4'>
            <Flex className='h-6 w-72 rounded bg-slate-300'></Flex>
        </Flex>
    );
};

export default TextLoader;
