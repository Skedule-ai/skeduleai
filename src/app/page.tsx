import AuthHeader from '@/components/organisms/auth-header';
import Switch from '../components/atoms/switch/index';
import PageHeader from '../components/atoms/pageheader/index';
export default function Home() {
    return (
        <main className='flex min-h-screen flex-col items-center justify-between p-24'>
            <PageHeader logoSrc='skedule' OrganizationName='Organization name' logoAlt='Logo' />
            <AuthHeader />
            {/* <Switch togglebtn1='Organization ' togglebtn2='Individual' /> */}
            <Switch />
        </main>
    );
}
