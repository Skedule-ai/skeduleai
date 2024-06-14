'use client';
import React, { useEffect } from 'react';
import Date from '@/components/atoms/date';
import SideBar from '@/components/organisms/sidebar';
import { Flex } from '@/components/atoms/flex';
import { useFetchUserConfigurationQuery } from '@/libs/api/user-configuration';
import { useRouter } from 'next/router';
import Container from '@/components/atoms/container'; // Assuming you have a Container component
import AcceptRejectCard from '@/components/atoms/card/AcceptRejectCard';
import AppointmentLinkCard from '@/components/atoms/card/AppointmentLinkCard';
import Grid from '@/components/atoms/grid';
import { Header2 } from '@/components/atoms/typography';

const Home = () => {
    const { data, error, isLoading } = useFetchUserConfigurationQuery();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && data?.userConfiguration) {
            router.push('/dashboard');
        }
    }, [data, isLoading, router]);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <>
            <Flex>
                <SideBar />
                <Container>
                    <Date />
                    <Flex>
                        <Container className='ml-6 mt-20 overflow-x-scroll'>
                            <Header2 className=''>Meeting Proposals</Header2>
                            <Grid className='mt-4' columns={3} gap={4} rows={1}>
                                <React.Fragment key='.0'>
                                    <AcceptRejectCard
                                        fromTime='12:30 PM'
                                        isFree
                                        onAccept={() => {}}
                                        onReject={() => {}}
                                        title='Brainstorming session'
                                        toTime='04:36 PM IST'
                                        userImages={[
                                            'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg',
                                        ]}
                                        variant='default'
                                    >
                                        <></>
                                    </AcceptRejectCard>
                                    <AcceptRejectCard
                                        fromTime='12:30 PM'
                                        isFree
                                        onAccept={() => {}}
                                        onReject={() => {}}
                                        title='Brainstorming session'
                                        toTime='04:36 PM IST'
                                        userImages={[
                                            'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg',
                                        ]}
                                        variant='default'
                                    >
                                        <></>
                                    </AcceptRejectCard>
                                    <AcceptRejectCard
                                        fromTime='12:30 PM'
                                        isFree
                                        onAccept={() => {}}
                                        onReject={() => {}}
                                        title='Brainstorming session'
                                        toTime='04:36 PM IST'
                                        userImages={[
                                            'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg',
                                        ]}
                                        variant='default'
                                    >
                                        <></>
                                    </AcceptRejectCard>
                                </React.Fragment>
                            </Grid>
                        </Container>
                    </Flex>
                    <Flex>
                        <Container className='ml-6 mt-6'>
                            <Header2>Share Appointment Link</Header2>
                            <Grid className='mt-4' columns={1} gap={4} rows={1}>
                                <AppointmentLinkCard
                                    isFree
                                    size='lg'
                                    title='Add Organization Staff'
                                    subtitle='Service provider page'
                                    link='www.skedule.io/linkname'
                                    variant='default'
                                >
                                    <></>
                                </AppointmentLinkCard>
                            </Grid>
                        </Container>
                    </Flex>
                </Container>
            </Flex>
        </>
    );
};

export default Home;
