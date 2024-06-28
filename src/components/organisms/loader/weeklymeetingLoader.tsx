import React from 'react';
import Card from '@/components/atoms/card';
import Container from '@/components/atoms/container';
import { Flex } from '@/components/atoms/flex';
import Grid from '@/components/atoms/grid';

const Weekly: React.FC = () => (
    <Card>
        <Container className='mx-auto w-auto rounded-md border border-blue-300 p-4 shadow'>
            <Flex className='flex animate-pulse justify-end space-x-4'>
                <Flex className='flex-1 flex-col space-y-4 py-1'>
                    <Flex className='w-50 mb-2 h-3 rounded-full bg-slate-300'></Flex>
                    <Grid columns={3} rows={1} gap={4} className='w-full'>
                        <Flex className='col-span-1 h-3 w-16 rounded-full bg-slate-300'></Flex>
                        <Flex className='col-span-1 h-3 w-20 rounded-full bg-slate-300'></Flex>
                        <Flex className='col-span-1 h-3 w-12 rounded-full bg-slate-300'></Flex>
                    </Grid>
                </Flex>
                <Flex className='h-10 w-10 justify-end rounded-full bg-slate-300'></Flex>
            </Flex>
        </Container>
    </Card>
);

export default Weekly;
