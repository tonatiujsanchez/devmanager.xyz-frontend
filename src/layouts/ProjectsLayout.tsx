import { Outlet } from 'react-router-dom'

import { NavBar, SideBar } from '../components'


export const ProjectsLayout = () => {
    return (
        <div className="flex">  
            <SideBar />
            <div className="w-full flex flex-col ">
                <NavBar />
                <main className="px-5 py-6" >
                    <Outlet />
                </main>
            </div>
        </div>
    )
}
