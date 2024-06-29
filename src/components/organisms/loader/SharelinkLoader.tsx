import React from 'react';
import Card from '@/components/atoms/card';
import Container from '@/components/atoms/container';
import { Flex } from '@/components/atoms/flex';
import Button from '@/components/atoms/button';

const SharelinkLoader: React.FC = () => (
    <Card>
        <Container className='mx-auto w-auto rounded-md border border-blue-300 p-4 shadow'>
            <Flex dir='column' className='relative p-4'>
                <Button
                    className='absolute right-4 top-4 p-1'
                    size='xs'
                    color='tertiary'
                    type='button'
                ></Button>
            </Flex>
            <Flex dir='row'>
                <Flex className='mr-3 w-100 animate-pulse bg-gray-100 p-2'></Flex>
            </Flex>
            <Flex
                dir='row'
                alignItems='center'
                gap={1}
                className='mt-4 text-xs font-medium text-gray-500 md:text-sm'
            >
                <Flex className='w-40 animate-pulse bg-gray-100 p-2'></Flex>
            </Flex>
            <Flex>
                <Flex className='mt-2 w-40 animate-pulse bg-blue-100 p-2'></Flex>
            </Flex>
        </Container>
    </Card>
);

export default SharelinkLoader;
