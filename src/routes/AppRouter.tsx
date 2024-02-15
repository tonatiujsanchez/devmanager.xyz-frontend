import { Navigate, Route, Routes } from "react-router-dom"
import {Helmet} from 'react-helmet'

import { AuthRoutes, ProjectsRoutes } from "."
import { 
    ConfirmAccountPage,
    EditProjectPage,
    ForgotPasswordPage,
    HomePage,
    LoginPage,
    NewPasswordPage,
    NewProjectPage,
    ProjectPage,
    ProjectsPage,
    RegisterPage 
} from "../pages"



export const AppRouter = () => {

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>DevManager | Gestiona Proyectos con Colaboradores en Tiempo Real</title>
                <link rel="canonical" href="https://devmanager.vercel.app" />
                <meta name="description" content="Una herramienta ágil y colaborativa para gestionar proyectos en equipo con seguimiento de tareas en tiempo real." />
                <meta name="keywords" content="Proyectos,  Gestión de proyectos, Proyectos colaborativos"/>
                <meta name="robots" content="index, follow" />
                <meta name="author" content="Tonatiuj Sánchez" />

                <meta property="og:image" content="https://devmanager.vercel.app/home_inicio.jpg" />
                <meta name="twitter:image" content="https://devmanager.vercel.app/home_inicio.jpg" />
            </Helmet>
            
            <Routes>
                <Route path="/" element={ <HomePage /> } />        
                <Route path="/auth" element={<AuthRoutes />} >
                    <Route path="login" element={<LoginPage />} />
                    <Route path="registrar" element={<RegisterPage />} />
                    <Route path="olvide-password" element={<ForgotPasswordPage />} />
                    <Route path="olvide-password/:token" element={<NewPasswordPage />} />
                    <Route path="confirmar-cuenta/:token" element={<ConfirmAccountPage />} />
                    <Route path="/auth" element={<Navigate to="/auth/login" />} />
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
        </>
    )
}
