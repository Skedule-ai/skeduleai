import React, { ReactNode } from 'react';
import { Flex } from '../flex';
import SideBar from '../Sidebar/SideBar';

const MainLayout = ({ children }: { children: ReactNode }) => {
    return (
        <main>
            <Flex dir='row' as={'div'}>
                <SideBar collapsible={true} responsive={true} />
                <section className='flex min-h-screen flex-1 flex-col px-6 pb-6 pt-28 max-md:pb-14 sm:px-14'>
                    <div className='w-full'>{children}</div>
                </section>
            </Flex>
        </main>
    );
};

export default MainLayout;
