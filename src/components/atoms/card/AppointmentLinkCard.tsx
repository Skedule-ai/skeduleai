import React, { useState } from 'react';
import Card from './index';
import { CardProps } from './card.variants';
import { Flex } from '../flex';
// import { Copy } from '@strapi/icons';
import { Subtitle } from '../typography';
import Button from '../button';

type AppointmentLinkProps = {
    title: string;
    isFree: boolean;
    link: string;
    subtitle: string;
    fullLink: string;
} & CardProps;

const AppointmentLink: React.FC<AppointmentLinkProps> = ({
    title,
    // isFree,
    link,
    subtitle,
    fullLink,
    ...props
}) => {
    const [copySuccess, setCopySuccess] = useState('');

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text).then(
            () => {
                setCopySuccess('Copied!');
                setTimeout(() => setCopySuccess(''), 2000);
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
                    onClick={() => copyToClipboard(fullLink)}
                    size='xs'
                    color='tertiary'
                    type='button'
                >
                    <svg
                        width='12'
                        height='13'
                        viewBox='0 0 12 13'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                    >
                        <path
                            d='M8 7.43535V9.53535C8 11.2854 7.3 11.9854 5.55 11.9854H3.45C1.7 11.9854 1 11.2854 1 9.53535V7.43535C1 5.68535 1.7 4.98535 3.45 4.98535H5.55C7.3 4.98535 8 5.68535 8 7.43535Z'
                            stroke='#292D32'
                            stroke-width='1.5'
                            stroke-linecap='round'
                            stroke-linejoin='round'
                        />
                        <path
                            d='M11 4.43535V6.53535C11 8.28535 10.3 8.98535 8.55 8.98535H8V7.43535C8 5.68535 7.3 4.98535 5.55 4.98535H4V4.43535C4 2.68535 4.7 1.98535 6.45 1.98535H8.55C10.3 1.98535 11 2.68535 11 4.43535Z'
                            stroke='#292D32'
                            stroke-width='1.5'
                            stroke-linecap='round'
                            stroke-linejoin='round'
                        />
                    </svg>

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
