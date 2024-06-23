'use client';

import DashboardPage from '@/app/(dashboard)/dashboard/page';
import ApponitmentsModalTemplate from '@/components/organisms/appointments/modal-template';

export default function Page() {
    return (
        <>
            <ApponitmentsModalTemplate />
            <DashboardPage />
        </>
    );
}
