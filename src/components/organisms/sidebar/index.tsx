import React from 'react';
import { sidebarVariants } from './sidebar.variants';

import Container from '@/components/atoms/container';

type SidebarProps = {
    collapse?: boolean;
};

const SideBar: React.FC<SidebarProps> = ({ collapse, ...props }) => {
    return (
        <Container className={sidebarVariants({ collapse })} {...props}>
            <nav className='mt-4'>
                <ul>
                    <li className='px-4 py-2'>
                        <a href='#'>Dashboard</a>
                    </li>
                    <li className='px-4 py-2'>
                        <a href='#'>Calender</a>
                    </li>
                    <li className='px-4 py-2'>
                        <a href='#'>In</a>
                    </li>
                </ul>
            </nav>
        </Container>
    );
};

export default SideBar;
