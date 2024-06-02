import Container from '@/components/atoms/container';

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <Container fullscreen className='flex items-center justify-center dark:bg-neutral-950'>
            {children}
        </Container>
    );
}
