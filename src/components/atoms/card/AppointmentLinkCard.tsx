import React, { useState } from 'react';
import Card from './index';
import { CardProps } from './card.variants';
import { Flex } from '../flex';
// import { Copy } from '@strapi/icons';
import { Subtitle } from '../typography';
import Button from '../button'; // Assuming you have a Button component

type AppointmentLinkProps = {
    title: string;
    isFree: boolean;
    link: string;
    subtitle: string;
} & CardProps;

const AppointmentLink: React.FC<AppointmentLinkProps> = ({
    title,
    isFree,
    link,
    subtitle,
    ...props
}) => {
    const [copySuccess, setCopySuccess] = useState('');

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text).then(
            () => {
                setCopySuccess('Copied!');
                setTimeout(() => setCopySuccess(''), 2000); // Clear the success message after 2 seconds
            },
            (err) => {
                setCopySuccess('Failed to copy!');
                console.error('Failed to copy text: ', err);
            },
        );
    };

    return (
        <Card {...props}>
            <Flex dir='column' className='relative p-4'>
                <Button
                    className='absolute right-4 top-4 p-1'
                    onClick={() => copyToClipboard(link)}
                    size='xs'
                    color='tertiary'
                    type='button'
                >
                    {/* <Copy className='size-4' /> */}
                </Button>
                <Flex dir='row' justifyContent='between' alignItems='center'>
                    <h2 className='mt-4 text-xs font-semibold md:text-base lg:text-lg'>{title}</h2>
                </Flex>

                <Flex
                    dir='row'
                    alignItems='center'
                    gap={1}
                    className='mt-4 text-xs font-medium text-gray-500 md:text-sm'
                >
                    <Subtitle>{subtitle}</Subtitle>
                </Flex>
                <span className='text-blue-500'>{link}</span>
                {copySuccess && <p className='text-xs text-green-500'>{copySuccess}</p>}
            </Flex>
        </Card>
    );
};

export default AppointmentLink;
