'use client';

import React from 'react';
import InfoCard from '@/components/atoms/card/InfoCard';
import Container from '@/components/atoms/container';
import { Flex } from '@/components/atoms/flex';
import { format } from 'date-fns';
import ScheduleAILogo from '@/components/atoms/icons/schedule-ai-logo';
import PageHeader from '@/components/atoms/pageheader';
import {
    BodyHighlight,
    Header2,
    Header3,
    IconTitle,
    Paragraph,
} from '@/components/atoms/typography';
import { useSearchParams } from 'next/navigation';
import useAppointmentDetails from '@/libs/hooks/useAppointmentDetails';
import { Loader, Plus } from '@strapi/icons';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

interface FormData {
    selectDate?: string;
    selectTime?: string;
    meetingDuration?: string;
    timeZone?: string;
}

const BookingConfirmationPage: React.FC = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const id = searchParams.get('id');
    const {
        data: bookingDetails,
        error,
        isLoading,
    } = useAppointmentDetails(id, {
        onCompleted: () => toast.success('Check You mail for booking details'),
        onError: () => {
            toast.error('Somwthing Happened');
            router.push('/404');
        },
    });
    const name = searchParams.get('name');
    const image = searchParams.get('image');
    const formDataString = searchParams.get('formData');
    const organizationName = searchParams.get('organizationName');
    const formData: FormData = formDataString ? JSON.parse(formDataString) : {};

    const formattedDate = formData.selectDate
        ? format(new Date(formData.selectDate), 'yyyy-MM-dd')
        : '';
    const formattedTime = formData.selectTime || '';

    if (isLoading) {
        return (
            <Container center>
                <Loader className='animate-spin' />
            </Container>
        );
    }

    return (
        <main>
            <Toaster />
            <Container center>
                <PageHeader
                    logoSrc={<ScheduleAILogo />}
                    OrganizationName={organizationName ?? ''}
                />
                <Flex
                    className='mt-10'
                    dir='column'
                    justifyContent='between'
                    alignItems='center'
                    gap={3}
                >
                    <Header2>
                        We have received your request, Check your email for confirmation details.
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
                                    <Paragraph>(Appointment Date)</Paragraph>
                                    <Header3>{formattedDate}</Header3>
                                </Flex>
                                |
                                <Flex gap={1} dir='column' alignItems='center'>
                                    <Paragraph>(Appointment Time)</Paragraph>
                                    <Header3>{formattedTime}</Header3>
                                </Flex>
                            </Flex>
                            <Flex gap={1} dir='column' alignItems='center'>
                                <Paragraph>(Meeting Duration)</Paragraph>
                                <BodyHighlight>{formData.meetingDuration} minutes</BodyHighlight>
                            </Flex>

                            <Flex gap={1} dir='column' alignItems='center'>
                                <Paragraph>(TimeZone)</Paragraph>
                                <BodyHighlight>{formData.timeZone}</BodyHighlight>
                            </Flex>

                            <Flex
                                gap={1}
                                alignItems={'center'}
                                className='cursor-pointer decoration-blue-700 underline-offset-4 hover:underline'
                            >
                                <Plus />
                                <IconTitle>Add to Calender</IconTitle>
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
                                imageUrl={image || ''}
                                subtitle='Service Provider'
                                title={name || 'User'}
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
