'use client'

import React, { useState } from 'react'
import { sidebarVariants  } from './sidebar.variants';

interface SidebarProps {
    collapsible?: boolean;
    hide?: boolean;
}


const SideBar: React.FC<SidebarProps> = ({ collapsible = false, hide =  false }) => {
  const [isCollapsed, setIsCollapsed] = useState(collapsible);
  const [ isOpen, setIsOpen ] = useState(hide);

  return (
    <div className='relative'>
        <button className='md:hidden p-2 text-black absolute top-2 left-2 z-50 nav !h-fit' onClick={() => setIsOpen(!isOpen)}>
          ☰
        </button>

     <div className={`${sidebarVariants({ collapsible: isCollapsed })}`}>
        <button onClick={() => setIsCollapsed(!isCollapsed)} className='p-2 text-black'>
            {isCollapsed ?  '→' : '←' }
        </button>
        <nav className='mt-4'>
            <ul>
                <li className='py-2 px-4'><a href="/dashboard">Dashboard</a></li>
                <li className='py-2 px-4'><a href="/calender">Calender</a></li>
                <li className='py-2 px-4'><a href="/inbox">In</a></li>
            </ul>
        </nav>
     </div>
    </div>
  )
}

export default SideBar