'use client';

import DashboardPage from '@/app/(dashboard)/dashboard/page';
import ApponitmentsModalTemplate from '@/components/organisms/appointments/modal-template';
import { Loader } from '@strapi/icons';
import { useEffect, useState } from 'react';

export default function Page() {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 4000);
    }, []);

    if (loading) {
        return <Loader fontSize={25} className='animate-spin' />;
    }

    return (
        <>
            <ApponitmentsModalTemplate />
            <DashboardPage />
        </>
    );
}
