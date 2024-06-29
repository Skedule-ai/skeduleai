'use client';
import React from 'react';
import Modal from '@/components/molecules/modal';
import useOnBoardingModal from '@/libs/hooks/useOnBoardingModal';
import { Flex, FlexItem } from '@/components/atoms/flex';
import { Header2 } from '@/components/atoms/typography';
import Grid from '@/components/atoms/grid';
import Image from 'next/image';
import Text from '@/components/atoms/text';
import Container from '@/components/atoms/container';

const ConsumerDetails = () => {
    const { isOpen, setIsOpen } = useOnBoardingModal();

    return (
        <Modal show={isOpen} onClose={() => setIsOpen(false)}>
            <Header2>{'[Meeting subject | topic]'}</Header2>
            <Flex className='mt-6'>
                <FlexItem className='w-full'>
                    <Header2 className='mb-3'>{'Consumer Details'}</Header2>
                    <Grid className='grid grid-cols-12 gap-4'>
                        <Container className='col-span-9'>
                            <Flex className='mb-1 items-center'>
                                <Text className='mr-2 font-medium'>{'Consumer Name:'}</Text>
                                <Text className='ml-3'>Lorem ipsum</Text>
                            </Flex>
                            <Flex className='mb-1 items-center'>
                                <Text className='mr-2 font-medium'>{'Consumer Email:'}</Text>
                                <Text className='ml-3'>Consumer@gmail.com</Text>
                            </Flex>
                            <Flex className='mb-1 items-center'>
                                <Text className='mr-2 font-medium'>{'Consumer Phone:'}</Text>
                                <Text className='ml-3'>985365750</Text>
                            </Flex>
                        </Container>
                        <Flex className='col-span-3 flex items-center justify-end'>
                            <Image
                                className='size-10 rounded-full object-cover md:size-10'
                                alt='User'
                                src='https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg'
                                width={100}
                                height={100}
                            />
                        </Flex>
                    </Grid>
                </FlexItem>
            </Flex>
            <hr className='my-6' />
            <Flex>
                <FlexItem className='w-full'>
                    <Header2 className='mb-3'>{'Service Provider Details'}</Header2>
                    <Grid className='grid grid-cols-12 gap-4'>
                        <Container className='col-span-9'>
                            <Flex className='mb-1 items-center'>
                                <Text className='mr-2 font-medium'>SP Name:</Text>
                                <Text className='ml-3'>Lorem ipsum</Text>
                            </Flex>
                            <Flex className='mb-1 items-center'>
                                <Text className='mr-2 font-medium'>SP Designation:</Text>
                                <Text className='ml-3'>Service Provider</Text>
                            </Flex>
                            <Flex className='mb-1 items-center'>
                                <Text className='mr-2 font-medium'>SP Timezone:</Text>
                                <Text className='ml-3'>Asia/Calcutta</Text>
                            </Flex>
                        </Container>
                        <Flex className='col-span-3 flex items-center justify-end'>
                            <Image
                                className='size-10 rounded-full object-cover md:size-10'
                                alt='User'
                                src='https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg'
                                width={100}
                                height={100}
                            />
                        </Flex>
                    </Grid>
                </FlexItem>
            </Flex>
        </Modal>
    );
};

export default ConsumerDetails;
