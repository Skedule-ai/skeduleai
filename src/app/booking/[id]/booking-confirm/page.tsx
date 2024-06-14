import InfoCard from '@/components/atoms/card/InfoCard';
import Container from '@/components/atoms/container';
import { Flex } from '@/components/atoms/flex';
import ScheduleAILogo from '@/components/atoms/icons/schedule-ai-logo';
import PageHeader from '@/components/atoms/pageheader';
import { Header2 } from '@/components/atoms/typography';
import React from 'react';

const BookingConfirmpage = ({ data }) => {
    return (
        <main>
            <Container center>
                <PageHeader
                    logoSrc={<ScheduleAILogo />}
                    OrganizationName='Organization Name'
                    isUserSignedIn={true}
                />
                <Flex
                    className='mt-20'
                    dir='column'
                    justifyContent='center'
                    alignItems='center'
                    gap={3}
                >
                    <Header2>
                        We have received your request, Check your email for confirmation details.
                    </Header2>
                    <Flex className='w-100 bg-neutral-100 p-5' dir='row' justifyContent='between'>
                        <Flex></Flex>
                        <InfoCard
                            batchColor='green'
                            batchState='default'
                            buttonText='designation'
                            imageUrl={'default-image.jpg'}
                            subtitle='Service Provider'
                            title={'Service Provider Name'}
                            variant='default'
                        >
                            <p></p>
                        </InfoCard>
                    </Flex>
                </Flex>
            </Container>
        </main>
    );
};

export default BookingConfirmpage;
