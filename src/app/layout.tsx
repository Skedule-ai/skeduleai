import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';
import { twMerge } from 'tailwind-merge';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Skedule.ai | AI-powered Booking Management System',
    description:
        'Streamline your appointments with our AI-powered Booking Management System. Enjoy real-time scheduling, automated reminders, secure payments, and detailed analytics. Perfect for clinics, salons, and more. Try it today!',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en'>
            <body className={twMerge([inter.className, 'dark:bg-neutral-100'])}>
                <ClerkProvider>{children}</ClerkProvider>
            </body>
        </html>
    );
}
