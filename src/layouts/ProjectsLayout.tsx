import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import isMobile from 'is-mobile'

import { IAppDispatch } from '../store/store'
import { startToggleSideMenu } from '../store/ui'

import { NavBar, SideBar } from '../components'


export const ProjectsLayout = () => {

    const dispatch:IAppDispatch = useDispatch()
    const isOpenOnMobile = isMobile()

    useEffect(()=>{
        if( isOpenOnMobile ){
            dispatch( startToggleSideMenu() )    
        }
    },[])
    

    return (
        <div className="flex">  
            <SideBar />
            <div className="w-full flex flex-col ">
                <NavBar />
                <main className="w-full h-full px-5 py-6" >
                    <Outlet />
                </main>
            </div>
        </div>
    )
}
