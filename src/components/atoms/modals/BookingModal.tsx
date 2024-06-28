'use client';

import React from 'react';
import { Flex } from '../flex';
import Modal from '@/components/molecules/modal';
import { BookingModalLabels, Header2, Header3, Subtitle } from '../typography';
import Button from '../button';
import BookingModalVariants from './booking-modal-variants';

const ModalLabels = [
    { name: 'Meeting Duration', key: 'meetingDuration' },
    { name: 'Meeting Date', key: 'selectDate' },
    { name: 'Meeting Time', key: 'selectTime' },
    { name: 'Time Zone', key: 'timeZone' },
];

type FormDataType = {
    meetingDuration: string;
    selectDate: string | Date;
    selectTime: string;
    timeZone: string;
};

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    formData: FormDataType;
    serviceId: string;
    serviceProviderName: string;
    availableTimeSlots: any[];
    image: string;
}

const BookingModal: React.FC<BookingModalProps> = ({
    isOpen,
    onClose,
    formData,
    serviceId,
    serviceProviderName,
}) => {
    const formattedFormData = {
        ...formData,
        selectDate:
            formData.selectDate instanceof Date
                ? formData.selectDate.toLocaleDateString()
                : formData.selectDate,
    };

    return (
        <Modal show={isOpen} onClose={onClose}>
            <Flex
                dir='row'
                alignItems='center'
                justifyContent='between'
                className='border-b-2 border-gray-300 p-2'
            >
                <Header3>Booking Summary</Header3>
            </Flex>

            <Flex dir='column' gap={2} className='p-2'>
                <Header2>{serviceProviderName}(Service provider)</Header2>
                <Subtitle>Designation</Subtitle>

                <Flex dir='row' justifyContent='between' alignItems='center'>
                    {ModalLabels.map((label, index) => (
                        <Flex dir='column' gap={1} key={index}>
                            <BookingModalLabels>{label.name}</BookingModalLabels>
                            <Button
                                className='flex cursor-not-allowed justify-center text-xs font-normal'
                                size='lg'
                                color='disabled'
                                disabled
                            >
                                {formattedFormData[label.key as keyof FormDataType]}
                            </Button>
                        </Flex>
                    ))}
                </Flex>
            </Flex>

            <BookingModalVariants formData={formData} serviceId={serviceId} onClose={onClose} />
        </Modal>
    );
};

export default BookingModal;
