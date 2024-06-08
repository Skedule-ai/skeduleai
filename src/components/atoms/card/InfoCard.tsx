import React from 'react';
import Card from './index';
import { CardProps } from './card.variants';
import Batch from '../batch';
import { Flex } from '../flex';
// import Image from 'next/image';

type InfoCardProps = {
    imageUrl: string;
    title: string;
    subtitle: string;
    buttonText: string;
    batchState: 'default' | 'active';
    batchColor: 'red' | 'green' | 'blue' | 'yellow';
} & CardProps;

const InfoCard: React.FC<InfoCardProps> = ({
    imageUrl,
    title,
    subtitle,
    buttonText,
    batchState,
    batchColor,
    ...props
}) => {
    return (
        <Card {...props}>
            <img src={imageUrl} alt={title} className='h-3/5 w-full rounded-t object-cover' />
            {/* <Image
                height={50}
                width={50}
                src={imageUrl}
                alt={title}
                className='h-1/2 w-full rounded-t object-cover'
            /> */}
            <Flex dir='row' justifyContent='between' className='p-4'>
                <Flex dir='column' gap={2}>
                    <h2 className='text-sm font-semibold md:text-base lg:text-lg'>{title}</h2>
                    <p className='text-xs font-normal text-gray-500 md:text-sm lg:text-base'>
                        {subtitle}
                    </p>
                </Flex>
                <div>
                    <Batch state={batchState} color={batchColor}>
                        {buttonText}
                    </Batch>
                </div>
            </Flex>
        </Card>
    );
};

export default InfoCard;
