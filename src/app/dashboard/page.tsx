'use client';
import React, { useEffect } from 'react';
import Date from '@/components/atoms/date';
import SideBar from '@/components/organisms/sidebar';
import { Flex } from '@/components/atoms/flex';
import { useFetchUserConfigurationQuery } from '@/libs/api/user-configuration';
import { useRouter } from 'next/router';
import Container from '@/components/atoms/container'; // Assuming you have a Container component
import AcceptRejectCard from '@/components/atoms/card/AcceptRejectCard';
import Grid from '@/components/atoms/grid';

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
                    <Grid columns={3} gap={2} rows={3}>
                        <React.Fragment key='.0'>
                            {/* <span className='size-10 bg-neutral-950'>1</span> */}
                            <AcceptRejectCard
                                fromTime='12:30 PM'
                                isFree
                                onAccept={() => {}}
                                onReject={() => {}}
                                size='lg'
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
                                className='ml-10'
                                fromTime='12:30 PM'
                                isFree
                                onAccept={() => {}}
                                onReject={() => {}}
                                size='lg'
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
        </>
    );
};

export default Home;
