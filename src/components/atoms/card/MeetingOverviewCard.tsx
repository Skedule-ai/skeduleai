import React from 'react';
import Card from './index';
import { CardProps } from './card.variants';
import { Flex } from '../flex';
import { Clock } from '@strapi/icons';
import Image from 'next/image';

type MeetingOverviewProps = {
    id: string;
    title: string;
    fromTime: string;
    toTime: string;
    isFree: boolean;
    userImages: string[];
    status: number;
} & CardProps;

const MeetingOverview: React.FC<MeetingOverviewProps> = ({
    title,
    fromTime,
    toTime,
    isFree,
    userImages,
    ...props
}) => {
    return (
        <Card {...props}>
            <Flex dir='column' className='p-4'>
                <Flex dir='row' justifyContent='between' alignItems='center'>
                    <h2 className='text-xs font-semibold md:text-base lg:text-lg'>{title}</h2>

                    <Flex dir='row' justifyContent='end' className='mt-2'>
                        <Flex dir='row' className='relative'>
                            {userImages.slice(0, 5).map((image, index) => (
                                <Image
                                    key={index}
                                    src={image}
                                    alt={`User ${index + 1}`}
                                    className={`size-5 rounded-full object-cover md:size-6 ${
                                        index !== 0 && '-ml-2'
                                    }`}
                                    style={{ zIndex: 5 - index }}
                                    width={50}
                                    height={50}
                                />
                            ))}
                        </Flex>
                    </Flex>
                </Flex>

                <Flex
                    dir='row'
                    alignItems='center'
                    gap={1}
                    className='mt-4 text-xs font-medium text-gray-500 md:text-sm'
                >
                    <Clock className='flex size-4 items-center justify-center' />
                    <p className='flex items-center gap-1'>
                        <span className='text-green-600'>{fromTime}</span>
                        <span className='text-gray-500'>{'->'}</span>
                        <span className='text-red-500'>{toTime}</span>
                        {isFree && <span className='text-blue-500'>(Free)</span>}
                    </p>
                </Flex>
            </Flex>
        </Card>
    );
};

export default MeetingOverview;
