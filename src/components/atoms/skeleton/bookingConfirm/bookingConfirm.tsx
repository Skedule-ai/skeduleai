import React from 'react';
import Container from '../../container';
import { Flex } from '../../flex';

const BookingConfirmSkeletonLoader = () => {
    return (
        <Container fullWidth>
            <Flex className='h-20 w-screen animate-pulse bg-gray-100'></Flex>
            <Flex
                className='mt-10'
                dir='column'
                justifyContent='between'
                alignItems='center'
                gap={3}
            >
                <Flex className='w-60 animate-pulse bg-gray-100 p-4'></Flex>
                <Flex
                    className='mt-10 w-[900px] bg-gray-100 p-5'
                    dir='row'
                    justifyContent='between'
                >
                    <Flex
                        dir='column'
                        gap={5}
                        className='w-1/2'
                        justifyContent='center'
                        alignItems='center'
                    >
                        <Flex
                            className='text-black'
                            dir='row'
                            gap={6}
                            justifyContent='between'
                            alignItems='center'
                        >
                            <Flex gap={1} dir='column' alignItems='center'>
                                <Flex className='w-40 animate-pulse bg-gray-200 p-3'></Flex>
                            </Flex>
                            <Flex gap={1} dir='column' alignItems='center'>
                                <Flex className='w-40 animate-pulse bg-gray-200 p-3'></Flex>
                            </Flex>
                        </Flex>
                        <Flex gap={1} dir='column' alignItems='center'>
                            <Flex className='w-40 animate-pulse bg-gray-200 p-3'></Flex>
                        </Flex>

                        <Flex gap={1} dir='column' alignItems='center'>
                            <Flex className='w-40 animate-pulse bg-gray-200 p-3'></Flex>
                        </Flex>

                        <Flex
                            gap={1}
                            alignItems={'center'}
                            className='cursor-pointer decoration-blue-700 underline-offset-4 hover:underline'
                        >
                            <Flex className='w-40 animate-pulse bg-gray-200 p-2'></Flex>
                        </Flex>
                    </Flex>
                    <Flex dir='row' className='w-1/2' justifyContent='center' alignItems='center'>
                        <Flex className='size-[300px] animate-pulse rounded-md bg-gray-200'></Flex>
                    </Flex>
                </Flex>
            </Flex>
        </Container>
    );
};

export default BookingConfirmSkeletonLoader;
