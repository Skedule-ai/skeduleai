'use client';

import React from 'react';
import Link from 'next/link';

const Sidebar = () => {
    return (
        <section
            className='bg-dark-1 sticky left-0 top-0 flex h-screen w-fit flex-col justify-between p-6 pt-28 text-white
    max-sm:hidden lg:w-[264px]'
        >
            <div className='flex flex-1 flex-col gap-6'>
                {['home', 'contact us'].map((link) => {
                    return (
                        <Link href={'/'} key={link}>
                            <p className='text-lg font-semibold max-lg:hidden'>{link}</p>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
};

export default Sidebar;
