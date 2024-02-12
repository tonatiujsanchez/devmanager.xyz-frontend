import { Navigate, Outlet } from "react-router-dom"

import { useCheckAuth } from "../hooks"
import { AuthStatus } from "../store/auth"
import { ProjectsLayout } from "../layouts"
import { LoadingMain } from "../components"


export const ProjectsRoutes = () => {

    const { status } = useCheckAuth()
    
    if(status === AuthStatus.Checking){
        return (
            <div className="h-screen flex justify-center items-center">
                <LoadingMain />
            </div>
        )
    }

    return (
        status === AuthStatus.Authenticated
        ? <ProjectsLayout>
            <Outlet />
        </ProjectsLayout>
        : <Navigate to="/auth/login" />
    )
}
