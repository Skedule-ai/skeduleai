'use client';
import React from 'react';
import Date from '@/components/atoms/date/Date';
import TimeZone from '@/components/atoms/date/TimeZone';
import SideBar from '@/components/organisms/sidebar';
import { Flex } from '@/components/atoms/flex';
import Container from '@/components/atoms/container'; // Assuming you have a Container component
import AcceptRejectCard from '@/components/atoms/card/AcceptRejectCard';
import AppointmentLinkCard from '@/components/atoms/card/AppointmentLinkCard';
import Grid from '@/components/atoms/grid';
import { Header2 } from '@/components/atoms/typography';
import Button from '@/components/atoms/button';

const Home = () => {
    return (
        <>
            <Flex>
                <SideBar />
                <Container>
                    <Flex>
                        <div className='mt-4'>
                            <Date />
                        </div>
                        <div className='ml-2 mt-4'>
                            <TimeZone />
                        </div>
                        <div className='container'>
                            <Flex className='justify-end'>
                                <div className='mt-4'>
                                    <Button size='sm' color='secondary'>
                                        <span style={{ color: 'black' }}>{'<'}</span>
                                    </Button>
                                </div>
                                <div className='ml-2 mt-4'>
                                    <Button size='sm' color='secondary'>
                                        <span style={{ color: 'black' }}>{'>'}</span>
                                    </Button>
                                </div>
                                <div className='ml-2 mr-2 mt-4'>
                                    <Button size='sm' color='primary'>
                                        <span>+Add Staff</span>
                                    </Button>
                                </div>
                            </Flex>
                        </div>
                    </Flex>
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
