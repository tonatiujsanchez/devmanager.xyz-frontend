import { Link, Navigate, useParams } from "react-router-dom"
import { useGetProject } from "../hooks"

import { CollaboratorsSection, LoadingMain, TasksSection } from "../components"


export const ProjectPage = () => {

    const { id } = useParams() as { id: string }    
    const { project, loading, loadingTasks } = useGetProject(id)

    
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
        <div className="flex flex-col gap-5">
            <div>
                <div className="flex justify-between items-center gap-2">
                    <h1 className="font-bold text-slate-800 text-2xl sm:text-3xl">{ project.name }</h1>
                    <Link 
                        to={`/proyectos/editar/${id}`} 
                        className="flex items-center gap-1 text-slate-400 hover:text-slate-800 font-medium"
                    >
                        <i className='bx bxs-edit' ></i> <span className="hidden sm:inline-flex">Editar</span>
                    </Link>
                </div>
                <div dangerouslySetInnerHTML={{ __html: project.description }}></div>
            </div>
            <TasksSection
                projectTasks={ project.tasks }
                loadingTasks={ loadingTasks }
            />
            <CollaboratorsSection />
        </div>
    )
}
