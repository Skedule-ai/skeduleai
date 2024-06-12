'use client';
import React from 'react';
import { Flex } from '@/components/atoms/flex';
// import { Header1, Subtitle } from '@/components/atoms/typography';
import Modal from '@/components/molecules/modal';
// import AvailabilityForm from '@/components/organisms/availability-form/index';

export default function AvailabilityPage() {
    return (
        <Modal show={true}>
            <Flex dir='column' gap={6}>
                {/* <Flex dir='column'>
                    <Header1>Your Availability</Header1>
                    <Subtitle>Please fill in the details of your organization.</Subtitle>
                </Flex> */}
                {/* <AvailabilityForm /> */}
            </Flex>
        </Modal>
    );
}
