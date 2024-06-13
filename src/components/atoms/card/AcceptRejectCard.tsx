import React from 'react';
import Card from './index';
import { CardProps } from './card.variants';
import { Flex } from '../flex';
import { Clock } from '@strapi/icons';
// import Image from 'next/image';

type AcceptRejectCardProps = {
    title: string;
    fromTime: string;
    toTime: string;
    isFree: boolean;
    userImages: string[];
    onAccept: () => void;
    onReject: () => void;
} & CardProps;

const AcceptRejectCard: React.FC<AcceptRejectCardProps> = ({
    title,
    fromTime,
    toTime,
    isFree,
    userImages,
    onAccept,
    onReject,
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
                                <img
                                    key={index}
                                    src={image}
                                    alt={`User ${index + 1}`}
                                    className={`size-5 rounded-full object-cover md:size-6 ${index !== 0 && '-ml-2'}`}
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

                <hr className='my-4' />

                <Flex dir='row' justifyContent='between'>
                    <button
                        onClick={onAccept}
                        className='w-full rounded bg-white px-4 text-sm font-medium text-green-600 md:text-base'
                    >
                        Accept
                    </button>
                    <div className='w-1 border-l-2 border-gray-100'></div>
                    <button
                        onClick={onReject}
                        className='w-full rounded bg-white px-4 text-sm font-medium text-red-500 md:text-base'
                    >
                        Reject
                    </button>
                </Flex>
            </Flex>
        </Card>
    );
};
export default AcceptRejectCard;
