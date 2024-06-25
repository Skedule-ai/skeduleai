import React from 'react';
import Card from '@/components/atoms/card';
import Container from '@/components/atoms/container';
import { Flex } from '@/components/atoms/flex';
import Grid from '@/components/atoms/grid';

const SkeletonLoader: React.FC = () => (
    <Container className='mx-auto w-full rounded-md border border-blue-300 p-4 shadow'>
        <Flex className='flex animate-pulse space-x-4'>
            <div className='h-10 w-10 rounded-full bg-slate-300'></div>
            <Flex className='flex-1 space-y-6 py-1'>
                <div className='h-2 rounded bg-slate-300'></div>
                <Card className='space-y-3'>
                    <Grid columns={3} rows={1} gap={4}>
                        <div className='col-span-2 h-2 rounded bg-slate-300'></div>
                        <div className='col-span-1 h-2 rounded bg-slate-300'></div>
                    </Grid>
                    <div className='h-2 rounded bg-slate-300'></div>
                </Card>
            </Flex>
        </Flex>
    </Container>
);

export default SkeletonLoader;
