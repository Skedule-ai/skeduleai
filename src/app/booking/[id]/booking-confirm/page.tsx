'use client';

import React, { useEffect, useState, useCallback } from 'react';
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

interface FormData {
    selectDate?: string;
    selectTime?: string;
    meetingDuration?: string;
    timeZone?: string;
}

const BookingConfirmationPage: React.FC = () => {
    const searchParams = useSearchParams();
    const image = searchParams.get('image');
    const name = searchParams.get('name');
    const formDataString = searchParams.get('formData');
    const formData: FormData = formDataString ? JSON.parse(formDataString) : {};

    const formattedDate = formData.selectDate
        ? format(new Date(formData.selectDate), 'yyyy-MM-dd')
        : '';
    const formattedTime = formData.selectTime || '';

    const [gapiLoaded, setGapiLoaded] = useState(false);
    const [gisLoaded, setGisLoaded] = useState(false);
    const [tokenClient, setTokenClient] = useState<any>(null);
    
    useEffect(() => {
        const loadGapiScript = () => {
            const script = document.createElement('script');
            script.src = 'https://apis.google.com/js/api.js';
            script.onload = () => {
                gapi.load('client', initializeGapiClient);
            };
            document.body.appendChild(script);
        };

        const initializeGapiClient = async () => {
            await gapi.client.init({
                apiKey: 'AIzaSyBi_iy0gtHRvVpAt4xCQ6T5ddZ9cjkk4Rw',
                discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
            });
            setGapiLoaded(true);
        };

        const loadGisScript = () => {
            const script = document.createElement('script');
            script.src = 'https://accounts.google.com/gsi/client';
            script.onload = () => {
                const client = google.accounts.oauth2.initTokenClient({
                    client_id:
                        '36053781201-56m5fs2ua6l145nt2eef34eqie75712n.apps.googleusercontent.com',
                    scope: 'https://www.googleapis.com/auth/calendar.events',
                    callback: '', // defined later
                });
                setTokenClient(client);
                setGisLoaded(true);
            };
            document.body.appendChild(script);
        };

        loadGapiScript();
        loadGisScript();
    }, []);

    const handleAddToCalendarClick = useCallback(async () => {
        if (!gapiLoaded || !gisLoaded || !tokenClient) {
            alert('Google API not loaded yet.');
            return;
        }

        tokenClient.callback = async (resp: any) => {
            if (resp.error !== undefined) {
                console.error('OAuth error:', resp.error);
                alert('Failed to get access token.');
                return;
            }

            try {
                const formattedDateTime = (date, time) => {
                    return `${date}T${time}:00`;
                };

                const event = {
                    summary: 'Your Appointment',
                    description: `Meeting with ${name}`,
                    start: {
                        dateTime: formattedDateTime(formattedDate, formattedTime),
                        timeZone: formData.timeZone || 'America/Los_Angeles',
                    },
                    end: {
                        dateTime: formattedDateTime(formattedDate, formattedTime),
                        timeZone: formData.timeZone || 'America/Los_Angeles',
                    },
                    reminders: {
                        useDefault: false,
                        overrides: [
                            { method: 'email', minutes: 24 * 60 },
                            { method: 'popup', minutes: 10 },
                        ],
                    },
                };

                console.log('Event data being sent to Google Calendar:', event);

                const request = gapi.client.calendar.events.insert({
                    calendarId: 'primary',
                    resource: event,
                });

                request.execute((event: any) => {
                    console.log('Event creation response:', event);
                    if (event && event.htmlLink) {
                        alert('Event created: ' + event.htmlLink);
                    } else {
                        console.error('Event creation response error:', event);
                        alert('Failed to create event.');
                    }
                });
            } catch (err) {
                console.error('Error creating event:', err);
                alert('Failed to create event.');
            }
        };

        tokenClient.requestAccessToken({ prompt: '' });
    }, [gapiLoaded, gisLoaded, tokenClient, formattedDate, formattedTime, formData.timeZone, name]);

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
                                className='mt-10 cursor-pointer underline decoration-blue-600 underline-offset-4'
                                onClick={handleAddToCalendarClick}
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

export default BookingConfirmationPage;
