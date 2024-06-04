import { Flex } from '@/components/atoms/flex';
import { Header1, Subtitle } from '@/components/atoms/typography';
import Modal from '@/components/molecules/modal';
import OrganizationForm from '@/components/organisms/organization-form';

export default function Page() {
    return (
        <Modal>
            <Flex dir='column' gap={6}>
                <Flex dir='column'>
                    <Header1>Organization Details</Header1>
                    <Subtitle>Please fill in the details of your organization.</Subtitle>
                </Flex>
                <OrganizationForm submitBtnText='Continue' />
            </Flex>
        </Modal>
    );
}
