'use client'

import React, { useState } from 'react'
import { sidebarVariants  } from './sidebar.variants';

interface SidebarProps {
    collapsible?: boolean;
    responsive?: boolean;
}


const SideBar: React.FC<SidebarProps> = ({ collapsible = false, responsive = false }) => {
  const [isCollapsed, setIsCollapsed] = useState(collapsible);
  const [ isOpen, setIsOpen ] = useState(!responsive);

  return (
    <>
     {responsive && (
        <button className='md:hidden p-2 text-black' onClick={() => setIsOpen(!isOpen)}>
          ☰
        </button>
     )}

     <div className={`${sidebarVariants({ collapsible: isCollapsed, responsive })} ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:relative`}>
        <button onClick={() => setIsCollapsed(!isCollapsed)} className='p-2 text-black'>
            {isCollapsed ?  '→' : '←' }
        </button>
        <nav className='mt-4'>
            <ul>
                <li className='py-2 px-4 hover:bg-blue-700'></li>
            </ul>
        </nav>
     </div>
    </>
  )
}

export default SideBar