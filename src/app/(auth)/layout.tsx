import AuthLayout from '@/components/molecules/layout/auth-layout';

export default function AuthenticationLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <AuthLayout>{children}</AuthLayout>;
}
