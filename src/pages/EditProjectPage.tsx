import { Navigate, useParams } from "react-router-dom"
import { useGetProject } from "../hooks"


import { LoadingMain, ProjectForm } from "../components"


export const EditProjectPage = () => {

    const { id } = useParams() as { id: string }    
    const { project, loading } = useGetProject(id)

    if(loading){
        return (
            <div className="h-screen flex justify-center items-center">
                <LoadingMain />
            </div>
        )
    }

    if(!project) {
        return ( <Navigate to={'/proyectos'} /> )
    }

    return (
        <>
            <h1 className="font-bold text-slate-800 text-2xl sm:text-3xl">Editar: { project.name }</h1>
            <section className="grid place-items-center mt-5 sm:mt-10">
                <ProjectForm project={ project } />
            </section>
        </>
    )
}
