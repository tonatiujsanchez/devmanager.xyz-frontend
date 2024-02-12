import { Navigate, Route, Routes } from "react-router-dom"

import { useCheckAuth } from "../hooks"
import { AuthStatus } from "../store/auth"

import { ProjectsRoutes } from "."
import { LoadingMain } from "../components"
import { ConfirmAccountPage, EditProjectPage, ForgotPasswordPage, LoginPage, NewPasswordPage, NewProjectPage, ProjectPage, ProjectsPage, RegisterPage } from "../pages"
import { AuthLayout } from "../layouts"



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
        // <Routes>
        //     {
        //         status === AuthStatus.Authenticated
        //         ?<Route path="/proyectos/*" element={<ProjectsRoutes />} />
        //         :<Route path="/auth/*" element={<AuthRoutes />} />
        //     }
        //     <Route path="/*" element={ <Navigate to="/auth/login"/> } />           
        // </Routes>
        <Routes>
            {
                status !== AuthStatus.Authenticated
                ?<Route path="/" element={<AuthLayout />} >
                    <Route path="auth/login" element={<LoginPage />} />
                    <Route path="auth/registrar" element={<RegisterPage />} />
                    <Route path="auth/olvide-password" element={<ForgotPasswordPage />} />
                    <Route path="auth/olvide-password/:token" element={<NewPasswordPage />} />
                    <Route path="auth/confirmar-cuenta/:token" element={<ConfirmAccountPage />} />
                    <Route path="/*" element={<Navigate to="/auth/login" />} />
                </Route>
                :<Route path="/proyectos" element={<ProjectsRoutes />} >
                    <Route index element={<ProjectsPage />} />
                    <Route path="nuevo-proyecto" element={<NewProjectPage />} />
                    <Route path="editar/:id" element={<EditProjectPage />} />
                    <Route path="detalles/:id" element={<ProjectPage />} />
                    <Route path="/*" element={<Navigate to="/proyectos" />} />
                </Route>
                
            }
            <Route path="/*" element={ <Navigate to="/auth/login"/> } />           
        </Routes>
    )
}
