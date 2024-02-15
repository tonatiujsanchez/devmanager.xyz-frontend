import { FC, ReactNode, useEffect } from 'react'

import { useDispatch } from 'react-redux'
import { Helmet } from 'react-helmet'
import isMobile from 'is-mobile'

import { IAppDispatch } from '../store/store'
import { startToggleSideMenu } from '../store/ui'

import { NavBar, ProjectSearch, SideBar } from '../components'

interface Props {
    children: ReactNode
}
export const ProjectsLayout:FC<Props> = ({ children }) => {

    const dispatch:IAppDispatch = useDispatch()
    const isOpenOnMobile = isMobile()

    useEffect(()=>{
        if( isOpenOnMobile ){
            dispatch( startToggleSideMenu() )    
        }
    },[])
    

    return (
        <>
            <Helmet>
                <title>DevManager | Proyectos</title>
            </Helmet>        
            <div className="flex">  
                <SideBar />
                <div className="w-full flex flex-col ">
                    <NavBar />
                    <main className="w-full h-full px-5 py-6" >
                        { children }
                    </main>
                    <ProjectSearch />
                </div>
            </div>
        </>
    )
}
