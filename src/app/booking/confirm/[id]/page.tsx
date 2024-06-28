'use client';

import React from 'react';
import InfoCard from '@/components/atoms/card/InfoCard';
import Container from '@/components/atoms/container';
import { Flex } from '@/components/atoms/flex';
import ScheduleAILogo from '@/components/atoms/icons/schedule-ai-logo';
import PageHeader from '@/components/atoms/pageheader';
import {
    BodyHighlight,
    Header2,
    Header3,
    IconTitle,
    Paragraph,
} from '@/components/atoms/typography';
import useAppointmentDetails from '@/libs/hooks/useAppointmentDetails';
import { Plus } from '@strapi/icons';
import toast, { Toaster } from 'react-hot-toast';
import BookingConfirmSkeletonLoader from '@/components/atoms/skeleton/bookingConfirm/bookingConfirm';

const BookingConfirmationPage: React.FC<{ params: { id: string } }> = ({ params }) => {
    const id = params.id;
    const {
        startTime,
        endTime,
        timezone,
        duration,
        serviceProvider,
        organization,
        error,
        isLoading,
    } = useAppointmentDetails(id, {
        onCompleted: () => {
            toast.success('Check confirmation email')
        },

        onError: () => {
            toast.error('something bad happened')
        },
    });

    if (isLoading) {
        return <BookingConfirmSkeletonLoader />;
    }

    if (error) {
        return (
            <Container fullWidth>
                <h1 className='text-xl font-semibold text-red-700'>Uh Oh! Some error Occurred!</h1>
            </Container>
        );
    }

    return (
        <main>
            <Toaster />
            <Container center>
                <PageHeader
                    logoSrc={<ScheduleAILogo />}
                    OrganizationName={organization?.name ?? ''}
                />
                <Flex
                    className='mt-10'
                    dir='column'
                    justifyContent='between'
                    alignItems='center'
                    gap={3}
                >
                    <Header2>
                        We have received your request. Check your email for confirmation details.
                    </Header2>
                    <Flex
                        className='mt-10 w-[900px] bg-neutral-100 p-5'
                        dir='row'
                        justifyContent='between'
                    >
                        <Flex
                            dir='column'
                            gap={5}
                            className='w-1/2'
                            justifyContent='center'
                            alignItems='center'
                        >
                            <Flex
                                className='text-black'
                                dir='row'
                                gap={6}
                                justifyContent='between'
                                alignItems='center'
                            >
                                <Flex gap={1} dir='column' alignItems='center'>
                                    <Paragraph>(Start Time)</Paragraph>
                                    <Header3>{startTime}</Header3>
                                </Flex>

                                <Flex gap={1} dir='column' alignItems='center'>
                                    <Paragraph>(End Time)</Paragraph>
                                    <Header3>{endTime}</Header3>
                                </Flex>
                            </Flex>
                            <Flex gap={1} dir='column' alignItems='center'>
                                <Paragraph>(Meeting Duration)</Paragraph>
                                <BodyHighlight>{duration} minutes</BodyHighlight>
                            </Flex>

                            <Flex gap={1} dir='column' alignItems='center'>
                                <Paragraph>(TimeZone)</Paragraph>
                                <BodyHighlight>{timezone}</BodyHighlight>
                            </Flex>

                            <Flex
                                gap={1}
                                alignItems={'center'}
                                className='cursor-pointer decoration-blue-700 underline-offset-4 hover:underline'
                            >
                                <Plus />
                                <IconTitle>Add to Calendar</IconTitle>
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
                                imageUrl={serviceProvider?.image || ''}
                                subtitle='Service Provider'
                                title={serviceProvider?.name || 'User'}
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

export default BookingConfirmationPage;
