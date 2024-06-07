'use client';
import { Flex } from '@/components/atoms/flex';
import { Header1, Subtitle } from '@/components/atoms/typography';
import Modal from '@/components/molecules/modal';
import OrganizationForm from '@/components/organisms/organization-form';
import useOnBoardingModal from '@/libs/hooks/useOnBoardingModal';

const OrganizationOnboardingModal = () => {
    const { isOpen, setIsOpen } = useOnBoardingModal();
    return (
        <Modal show={isOpen} onClose={setIsOpen}>
            <Flex dir='column' gap={6}>
                <Flex dir='column'>
                    <Header1>Organization Details</Header1>
                    <Subtitle>Please fill in the details of your organization.</Subtitle>
                </Flex>
                <OrganizationForm submitBtnText='Continue' />
            </Flex>
        </Modal>
    );
};

export default OrganizationOnboardingModal;
