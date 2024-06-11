'use client';
import React, {useEffect} from 'react';
import Date from '@/components/atoms/date';
import SideBar from '@/components/organisms/sidebar';
import { Flex } from '@/components/atoms/flex';
import { useFetchUserConfigurationQuery } from '@/libs/api/user-configuration';
import { useRouter } from 'next/router';

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
        <Flex>
            <SideBar />
            <Date />
        </Flex>
    );
};

export default Home;
