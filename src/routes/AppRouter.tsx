import { Navigate, Route, Routes } from "react-router-dom"

import { useCheckAuth } from "../hooks"
import { AuthStatus } from "../store/auth"

import { AuthRoutes, ProjectsRoutes } from "."
import { LoadingMain } from "../components"



export const AppRouter = () => {

    const { status } = useCheckAuth()
    
    if(status === AuthStatus.Checking){
        return (
            <div className="h-screen flex justify-center items-center">
                <LoadingMain />
            </div>
        )
    }

    return (
        <Routes>
            {
                status === AuthStatus.Authenticated
                ?<Route path="/proyectos/*" element={<ProjectsRoutes />} />
                :<Route path="/*" element={<AuthRoutes />} />
            }
            <Route path="/*" element={ <Navigate to="/proyectos/*"/> } />           
        </Routes>
    )
}
