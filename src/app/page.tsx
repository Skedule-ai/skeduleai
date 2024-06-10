import AuthHeader from '@/components/organisms/auth-header';
import LandingPageHeader from '@/components/organisms/headers/landingpage-header';
export default function Home() {
    return (
        <main className='flex min-h-screen flex-col items-center justify-between p-24'>
            <AuthHeader />
            <LandingPageHeader />
        </main>
    );
}
