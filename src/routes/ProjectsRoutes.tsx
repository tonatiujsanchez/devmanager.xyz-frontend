import { Navigate, Route, Routes } from "react-router-dom"

import { ProjectsLayout } from "../layouts"
import { ProjectsPage } from "../pages"


export const ProjectsRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<ProjectsLayout />}>
                <Route index element={<ProjectsPage />} />
                <Route path="/*" element={<Navigate to="/proyectos" />} />
            </Route>
        </Routes>
    )
}
