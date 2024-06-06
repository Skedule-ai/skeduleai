'use client';

import React from 'react';
import { Flex } from '../flex';
import Modal from '@/components/molecules/modal';
import { Header2, Header3, Subtitle } from '../typography';
import { Cross } from '@strapi/icons';
import Button from '../button';
import BookingModalVariants from './booking-modal-variants';

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    formData: {
        meetingDuration: string;
        selectDate: string;
        selectTime: string;
        timeZone: string;
    };
}

const BookingModal: React.FC<BookingModalProps> = ({ onClose, formData }) => {
    return (
        <Modal>
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
                <Header2>Host Name(Service provider)</Header2>
                <Subtitle>Designation</Subtitle>

                <Flex dir='row' justifyContent='between' alignItems='center'>
                    {Object.entries(formData).map(([key, value]) => (
                        <Button size='lg' key={key} color='disabled' disabled>
                            {value}
                        </Button>
                    ))}
                </Flex>
            </Flex>

            {/* the componenet here  */}
            <BookingModalVariants />
        </Modal>
    );
};

export default BookingModal;
