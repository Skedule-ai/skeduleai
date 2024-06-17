import InfoCard from '@/components/atoms/card/InfoCard';
import Container from '@/components/atoms/container';
import { Flex } from '@/components/atoms/flex';
import ScheduleAILogo from '@/components/atoms/icons/schedule-ai-logo';
import PageHeader from '@/components/atoms/pageheader';
import { BodyHighlight, Header2, Header3, IconTitle } from '@/components/atoms/typography';
import { Plus } from '@strapi/icons';
import React from 'react';

const BookingConfirmpage = ({ serviceProviderName }) => {
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
                    justifyContent='between'
                    alignItems='center'
                    gap={3}
                >
                    <Header2>
                        We have received your request, Check your email for confirmation details.
                    </Header2>
                    <Flex
                        className='mt-20 w-[900px] bg-neutral-100 p-5'
                        dir='row'
                        justifyContent='between'
                    >
                        <Flex
                            dir='column'
                            gap={2}
                            className='w-1/2'
                            justifyContent='center'
                            alignItems='center'
                        >
                            <Flex
                                className='text-black'
                                dir='row'
                                gap={5}
                                justifyContent='between'
                                alignItems='center'
                            >
                                <Header3>Appointment Date</Header3> |
                                <Header3>Appointment Time</Header3>
                            </Flex>
                            <BodyHighlight>Appointment Duration</BodyHighlight>
                            <BodyHighlight>Asia/Kolkata-IST(+05:30)</BodyHighlight>

                            <Flex
                                className='mt-10 underline decoration-blue-600 underline-offset-4'
                                dir='row'
                                alignItems='center'
                                gap={1}
                            >
                                <Plus className='text-blue-600' />
                                <IconTitle>Add to calender</IconTitle>
                            </Flex>
                        </Flex>
                        <Flex
                            dir='row'
                            className='w-1/2'
                            justifyContent='center'
                            alignItems='center'
                        >
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
                </Flex>
            </Container>
        </main>
    );
};

export default BookingConfirmpage;
