'use client';

import { useEffect, useState } from 'react';
import Container from '@/components/atoms/container';
import { useRouter } from 'next/navigation';
import { Flex, FlexItem } from '@/components/atoms/flex';
import SideBar from '@/components/organisms/sidebar';
import { useUser } from '@clerk/nextjs';
import SidebarLoader from '@/components/organisms/loader/SidebarLoader';

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const { isSignedIn } = useUser();

    useEffect(() => {
        if (isSignedIn === undefined) {
            setLoading(true);
        } else if (isSignedIn) {
            setLoading(false);
        } else {
            router.push('/');
        }
    }, [isSignedIn, router]);

    if (loading) {
        return (
            <Flex className='flex w-full justify-center'>
                <SidebarLoader />
            </Flex>
        );
    }
    return (
        <Container fullscreen className='w-full'>
            <Flex dir='row'>
                <FlexItem>
                    <SideBar />
                </FlexItem>
                <FlexItem>{children}</FlexItem>
            </Flex>
        </Container>
    );
}
