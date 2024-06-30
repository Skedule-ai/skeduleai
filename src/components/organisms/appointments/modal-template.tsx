'use client';

import React from 'react';
import Modal from '@/components/molecules/modal';
import Switch from '@/components/atoms/switch';
import useOnBoardingModal from '@/libs/hooks/useOnBoardingModal';

import OrganizationForm from '../organization-form';
import { Flex } from '@/components/atoms/flex';

const ApponitmentsModalTemplate = () => {
    const { isOpen, setIsOpen, handleSubmit, onboardingType, handleToggle } = useOnBoardingModal();
    return (
        <Modal show={isOpen} onClose={setIsOpen}>
            <Flex dir='column' gapY={4}>
                <Switch label1='Organization' label2='Individual' onToggle={handleToggle} />
                <OrganizationForm onboardingType={onboardingType} onSubmit={handleSubmit} />
            </Flex>
        </Modal>
    );
};

export default ApponitmentsModalTemplate;
