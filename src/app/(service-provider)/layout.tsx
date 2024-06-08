import Container from '@/components/atoms/container';
import { Flex, FlexItem } from '@/components/atoms/flex';
import SideBar from '@/components/organisms/sidebar';

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <Container fullscreen className='w-screen'>
            <Flex dir='row'>
                {/* <FlexItem>
                    <SideBar />
                </FlexItem> */}
                <FlexItem>{children}</FlexItem>
            </Flex>
        </Container>
    );
}
