'use client';
// import React from 'react';
import Date from '@/components/atoms/date/Date';
import TimeZone from '@/components/atoms/date/TimeZone';
import React from 'react'; // useEffect
// import Date from '@/components/atoms/date';
import SideBar from '@/components/organisms/sidebar';
import { Flex } from '@/components/atoms/flex';
// import { useFetchUserConfigurationQuery } from '@/libs/api/user-configuration';
import Container from '@/components/atoms/container'; // Assuming you have a Container component
import AcceptRejectCard from '@/components/atoms/card/AcceptRejectCard';
import AppointmentLinkCard from '@/components/atoms/card/AppointmentLinkCard';
import Grid from '@/components/atoms/grid';
import { Header2 } from '@/components/atoms/typography';
// import Button from '@/components/atoms/button';
// import { useRouter } from 'next/navigation';

const Home = () => {
    // const { data, error, isLoading } = useFetchUserConfigurationQuery();
    // const router = useRouter();

    // useEffect(() => {
    //     if (!isLoading && data?.userConfiguration) {
    //         router.push('/dashboard');
    //     }
    // }, [data, isLoading, router]);

    // if (isLoading) return <div>Loading...</div>;
    // if (error) return <div>Error: {error.message}</div>;

    return (
        <>
            <Flex className='flex-col md:flex-row'>
                <SideBar />
                <Container className='flex-1 p-4'>
                    <Flex className='flex-col md:flex-row md:items-center'>
                        <Grid columns={2} rows={1} gap={2}>
                            <Date />
                            <TimeZone />
                        </Grid>
                    </Flex>
                    <Flex className='mt-6 flex-col'>
                        <Container className='overflow-x-auto'>
                            <Header2>{'Meeting Proposals'}</Header2>
                            <Grid className='mt-4' columns={3} gap={4} rows={1}>
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
                            </Grid>
                        </Container>
                    </Flex>
                    <Flex className='mt-6 flex-col'>
                        <Container>
                            <Header2>{'Share Appointment Link'}</Header2>
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
