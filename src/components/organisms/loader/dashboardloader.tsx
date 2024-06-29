import React from 'react';
import TextLoader from './TextLoader';
import Container from '@/components/atoms/container';
import AcceptRejectLoader from './AcceptRejectLoader';
import SharelinkLoader from './SharelinkLoader';
import Weekly from './weeklymeetingLoader';
import { Flex } from '@/components/atoms/flex';
import Grid from '@/components/atoms/grid';
const Dashboardloader: React.FC = () => (
    <Flex className='flex-col md:flex-row'>
        <Container className='flex-1 p-4'>
            <Flex className='mb-6 flex-col md:flex-row md:items-center'>
                <Grid columns={2} rows={1} gap={2}>
                    <Flex className='items-center justify-center p-4'>
                        <Flex className='h-5 w-52 animate-pulse rounded-md bg-slate-200 p-5'></Flex>
                    </Flex>
                    <Flex className='items-center justify-center p-4'>
                        <Flex className='h-5 w-52 animate-pulse rounded-md bg-slate-200 p-5'></Flex>
                    </Flex>
                </Grid>
            </Flex>
            <Flex className='mb-6 flex-col'>
                <Flex className='mb-2'>
                    <TextLoader />
                </Flex>
                <Grid columns={4} rows={1} gap={2}>
                    <AcceptRejectLoader />
                    <AcceptRejectLoader />
                    <AcceptRejectLoader />
                    <AcceptRejectLoader />
                </Grid>
            </Flex>
            <Flex className='mb-6 flex-col'>
                <Container>
                    <Flex className='mb-2 mt-3'>
                        <TextLoader />
                    </Flex>
                    <Grid className='mt-2' columns={4} gap={2} rows={1}>
                        <SharelinkLoader />
                        <SharelinkLoader />
                        <SharelinkLoader />
                        <SharelinkLoader />
                    </Grid>
                </Container>
            </Flex>
            <Flex className='mb-6 flex-col'>
                <Container>
                    <Flex className='mb-2 mt-3'>
                        <TextLoader />
                    </Flex>
                    <Grid className='mt-2' rows={1} columns={4} gap={4}>
                        <Weekly />
                        <Weekly />
                        <Weekly />
                        <Weekly />
                    </Grid>
                </Container>
            </Flex>
        </Container>
    </Flex>
);

export default Dashboardloader;
