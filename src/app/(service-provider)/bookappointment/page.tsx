import { Flex } from '@/components/atoms/flex';
import { Header1, Subtitle } from '@/components/atoms/typography';
import Modal from '@/components/molecules/modal';
import OrganizationForm from '@/components/organisms/organization-form';
import Input from '@/components/atoms/fields';

const bookAppointmentPage = () => {
    return (
        <Flex dir='column' gap={3}>
            <Header1>Hey there!</Header1>
            <Subtitle className='w-40'>
                Schedule your appointment in just a few easy steps: Select a service, choose your
                date and time, and enter your details. We look forward to seeing you!
            </Subtitle>
            {/* <Flex dir='column' gap={2}><Input type='number' placeholder='Meeting duration'/></Flex> */}
        </Flex>
    );
};

export default bookAppointmentPage;
