import React, { ReactNode } from 'react'
import Sidebar from '../Sidebar/Sidebar'
import { Flex } from '../flex'

const MainLayout = ({ children }: {children : ReactNode}) => {
  return (
    <main>
      <Flex dir='row' as={"div"}>
        <Sidebar />
        <section className="flex min-h-screen flex-col flex-1 px-6 pb-6 pt-28 max-md:pb-14 sm:px-14">
            <div className="w-full">
                {children}
            </div>
        </section>
      </Flex>
    </main>
  )
}

export default MainLayout