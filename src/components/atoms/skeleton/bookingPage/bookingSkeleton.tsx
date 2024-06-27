import React from 'react';
import Container from '../../container';
import { Flex } from '../../flex';

const BookingSkeletonLoader = () => {
    return (
        <Container fullWidth>
            <Flex className='h-20 w-screen animate-pulse bg-gray-100'></Flex>
            <Flex
                dir='row'
                justifyContent='between'
                alignItems='center'
                className='m-auto mt-10 w-[90%]'
            >
                <Flex dir='column' gap={4} className='m-5 h-auto md:m-0 md:pl-40 lg:w-1/2'>
                    <Flex className='w-40 animate-pulse bg-gray-100 p-2'></Flex>
                    <Flex className='w-100 animate-pulse bg-gray-100 p-2'></Flex>

                    <Flex className='h-5 w-72 animate-pulse rounded-md bg-gray-100 p-5'></Flex>
                    <Flex className='h-5 w-72 animate-pulse rounded-md bg-gray-100 p-5'></Flex>
                    <Flex className='h-5 w-72 animate-pulse rounded-md bg-gray-100 p-5'></Flex>
                    <Flex className='h-5 w-72 animate-pulse rounded-md bg-gray-100 p-5'></Flex>

                    <Flex className='mt-10 h-5 w-40 rounded-md bg-gray-100 p-5'></Flex>
                </Flex>

                <Flex dir='row' justifyContent='center' className='hidden h-full w-1/2 lg:flex'>
                    <Flex className='size-[300px] animate-pulse rounded-md bg-gray-100'></Flex>
                </Flex>
            </Flex>
        </Container>
    );
};

export default BookingSkeletonLoader;
