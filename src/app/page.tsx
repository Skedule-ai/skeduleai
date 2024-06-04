import AuthHeader from '@/components/organisms/auth-header';
import Switch from '../components/atoms/switch/index';

export default function Home() {
    return (
        <main className='flex min-h-screen flex-col items-center justify-between p-24'>
            <AuthHeader />
            <Switch />
        </main>
    );
}
