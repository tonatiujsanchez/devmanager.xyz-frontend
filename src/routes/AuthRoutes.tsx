import { Navigate, Outlet } from "react-router-dom"

import { useCheckAuth } from "../hooks"
import { AuthStatus } from "../store/auth"
import { AuthLayout } from "../layouts"
import { LoadingMain } from "../components"


export const AuthRoutes = () => {

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
        ? <Navigate to="/proyectos" />
        : <AuthLayout>
            <Outlet />
         </AuthLayout>
    )
}
