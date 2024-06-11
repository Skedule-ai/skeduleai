'use client';

import React from 'react';
import { Flex } from '@/components/atoms/flex';
import Modal from '@/components/molecules/modal';
import { Header2, Header3, Subtitle } from '@/components/atoms/typography';
import { Cross } from '@strapi/icons';
import Button from '@/components/atoms/button';
import BookingModalVariants from '@/components/atoms/modals/booking-modal-variants';

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    formData: {
        serviceId: string;
        name: string;
        email: string;
        phoneNumber: string;
        date: string;
        time: string;
    };
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, formData }) => {
    return (
        <Modal show={isOpen} onClose={onClose}>
            <Flex
                dir='row'
                alignItems='center'
                justifyContent='between'
                className='border-b-2 border-gray-300 p-3'
            >
                <Header3>Booking Summary</Header3>
                <Flex
                    className='cursor-pointer rounded-lg border-2 border-gray-200 p-2'
                    onClick={onClose}
                >
                    <Cross className='size-3' />
                </Flex>
            </Flex>

            <Flex dir='column' gap={3} className='p-5'>
                <Header2>Host Name (Service provider)</Header2>
                <Subtitle>Designation</Subtitle>

                <Flex dir='row' justifyContent='between' alignItems='center'>
                    {Object.entries(formData).map(([key, value]) => (
                        <Button
                            className='flex justify-center'
                            size='lg'
                            key={key}
                            color='disabled'
                            disabled
                        >
                            {value}
                        </Button>
                    ))}
                </Flex>
            </Flex>

            {/* the component here  */}
            <BookingModalVariants />
        </Modal>
    );
};

export default BookingModal;
