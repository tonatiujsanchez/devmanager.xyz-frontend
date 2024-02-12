import { Navigate, Route, Routes } from "react-router-dom"

import { AuthRoutes, ProjectsRoutes } from "."
import { 
    ConfirmAccountPage,
    EditProjectPage,
    ForgotPasswordPage,
    LoginPage,
    NewPasswordPage,
    NewProjectPage,
    ProjectPage,
    ProjectsPage,
    RegisterPage 
} from "../pages"



export const AppRouter = () => {

    return (
        <Routes>
            <Route path="/" element={ <Navigate to="/auth/login"/> } />        
            <Route path="/auth" element={<AuthRoutes />} >
                <Route path="login" element={<LoginPage />} />
                <Route path="registrar" element={<RegisterPage />} />
                <Route path="olvide-password" element={<ForgotPasswordPage />} />
                <Route path="olvide-password/:token" element={<NewPasswordPage />} />
                <Route path="confirmar-cuenta/:token" element={<ConfirmAccountPage />} />
                <Route path="*" element={<Navigate to="/auth/login" />} />
            </Route>
            <Route path="/proyectos" element={<ProjectsRoutes />} >
                <Route index element={<ProjectsPage />} />
                <Route path="nuevo-proyecto" element={<NewProjectPage />} />
                <Route path="editar/:id" element={<EditProjectPage />} />
                <Route path="detalles/:id" element={<ProjectPage />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Route>            
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    )
}
