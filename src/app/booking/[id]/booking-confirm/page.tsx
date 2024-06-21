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
import { useSearchParams, useRouter } from 'next/navigation';

const BookingConfirmpage = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const image = searchParams.get('image');
    const name = searchParams.get('name');
    const formData = JSON.parse(searchParams.get('formData'));

    const formattedDate = formData.selectDate
        ? format(new Date(formData.selectDate), 'yyyy-MM-dd')
        : '';

    const formattedTime = formData.selectTime || '';

    const generateGoogleCalendarLink = ({
        title,
        startDate,
        startTime,
        duration,
        timeZone,
        description = '',
    }) => {
        try {
            if (!startDate || !startTime || isNaN(Date.parse(startDate))) {
                throw new Error('Invalid date or time');
            }

            const startDateTime = new Date(`${startDate}T${startTime}:00`);
            if (isNaN(startDateTime.getTime())) {
                throw new Error('Invalid date or time');
            }

            const endDateTime = new Date(startDateTime);
            endDateTime.setMinutes(endDateTime.getMinutes() + duration);

            const start = startDateTime.toISOString().replace(/-|:|\.\d+/g, '');
            const end = endDateTime.toISOString().replace(/-|:|\.\d+/g, '');

            const url = new URL('https://www.google.com/calendar/render');
            url.searchParams.append('action', 'TEMPLATE');
            url.searchParams.append('text', title);
            url.searchParams.append('dates', `${start}/${end}`);
            url.searchParams.append('ctz', timeZone);
            if (description) {
                url.searchParams.append('details', description);
            }

            return url.toString();
        } catch (error) {
            console.error('Error generating Google Calendar link:', error.message);
            return null;
        }
    };

    const googleCalendarLink = generateGoogleCalendarLink({
        title: name || 'Service Provider Name',
        startDate: formData.selectDate,
        startTime: formData.selectTime,
        duration: formData.meetingDuration,
        timeZone: formData.timeZone,
    });

    const handleAddToCalendar = () => {
        if (googleCalendarLink) {
            window.open(googleCalendarLink, '_blank', 'noopener,noreferrer');
        } else {
            alert('Unable to generate calendar link.');
        }
    };

    return (
        <main>
            <Container center>
                <PageHeader logoSrc={<ScheduleAILogo />} OrganizationName='Organization Name' />
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

                            <div
                                onClick={handleAddToCalendar}
                                className='mt-10 cursor-pointer underline decoration-blue-600 underline-offset-4'
                            >
                                <Flex dir='row' alignItems='center' gap={1}>
                                    <Plus className='text-blue-600' />
                                    <IconTitle>Add to calendar</IconTitle>
                                </Flex>
                            </div>
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

export default BookingConfirmpage;
