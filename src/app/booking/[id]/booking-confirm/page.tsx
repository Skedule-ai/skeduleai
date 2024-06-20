'use client';

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
import { Plus } from '@strapi/icons';
import { useSearchParams } from 'next/navigation';
import { useUser } from '@clerk/nextjs';

const BookingConfirmpage = () => {
    const { isSignedIn } = useUser();
    const searchParams = useSearchParams();
    const image = searchParams.get('image');
    const name = searchParams.get('name');
    const formData = JSON.parse(searchParams.get('formData'));

    const formattedDate = formData.selectDate
        ? format(new Date(formData.selectDate), 'dd-MM-yyyy')
        : '';

    return (
        <main>
            <Container center>
                <PageHeader
                    logoSrc={<ScheduleAILogo />}
                    OrganizationName='Organization Name'
                    isUserSignedIn={isSignedIn}
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
                                    <Header3>{formData.selectTime}</Header3>
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
                                imageUrl={image || ''}
                                subtitle='Service Provider'
                                title={name || 'Service Provider Name'}
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
