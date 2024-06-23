'use client';

import React from 'react';
import { Flex } from '../flex';
import { Header2, IconTitle, Subtitle } from '../typography';
import Button from '../button';
import BookingModalVariants from './booking-modal-variants';
import Container from '../container';
import { ArrowLeft } from '@strapi/icons';

interface BookingModalMobileProps {
    isOpen: boolean;
    onClose: () => void;
    formData: {
        meetingDuration: string;
        selectDate: string;
        selectTime: string;
        timeZone: string;
    };
}

const BookingModalMobile: React.FC<BookingModalMobileProps> = ({ isOpen, onClose, formData }) => {
    return (
        isOpen && (
            <Container center className='p-4'>
                <Flex
                    dir='row'
                    alignItems='center'
                    className='flex md:hidden'
                    gap={1}
                    onClick={onClose}
                >
                    <ArrowLeft className='size-3 text-blue-600' /> <IconTitle>Back</IconTitle>
                </Flex>
                <Flex dir='column' gap={3} className='p-5'>
                    <Header2>Host Name(Service provider)</Header2>
                    <Subtitle>Designation</Subtitle>

                    <Flex
                        dir='row'
                        justifyContent='between'
                        alignItems='center'
                        className='grid grid-cols-2 grid-rows-2 gap-4 md:flex'
                    >
                        {Object.entries(formData).map(([key, value]) => (
                            <Button
                                className='flex justify-center'
                                size='sm'
                                key={key}
                                color='disabled'
                                disabled
                            >
                                {value}
                            </Button>
                        ))}
                    </Flex>
                </Flex>

                {/* the sign up componenet here  */}
                <BookingModalVariants
                    formData={undefined}
                    serviceId={''}
                    availableTimeSlots={[]}
                    serviceProviderName={''}
                    onClose={function (): void {
                        throw new Error('Function not implemented.');
                    }}
                    image={''}
                />
            </Container>
        )
    );
};

export default BookingModalMobile;
