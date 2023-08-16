import { Navigate, useParams } from "react-router-dom"
import { useGetProject } from "../hooks"

import { LoadingMain } from "../components"


export const ProjectPage = () => {

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
        <div className="flex flex-col gap-5">
            <div>
                <h1 className="font-bold text-slate-800 text-2xl sm:text-3xl">{ project.name }</h1>
                <div dangerouslySetInnerHTML={{ __html: project.description }}></div>
            </div>
            <section>
                <div className="flex justify-between items-center mb-3">
                    <h2 className="font-semibold text-slate-800 text-lg">Tareas del Proyecto</h2>
                    <button
                        className="bg-amber-300 hover:bg-amber-400 text-slate-800 text-sm inline-flex items-center gap-2 font-medium px-3 py-2 rounded-md"
                    >
                        <i className='bx bx-plus font-bold'></i> Nueva Tarea
                    </button>
                </div>
                <div className="bg-white rounded-md p-4">
                    Tareas
                </div>
            </section>
            <section>
                <div className="flex justify-between items-center mb-3 mt-5">
                    <h2 className="font-semibold text-slate-800 text-lg">Colaboradores</h2>
                    <button
                        className="bg-amber-300 hover:bg-amber-400 text-slate-800 text-sm inline-flex items-center gap-2 font-medium px-3 py-2 rounded-md"
                    >
                        <i className='bx bx-plus font-bold'></i> Agregar Colaborador
                    </button>
                </div>
                <div className="bg-white rounded-md p-4">
                    Colaboradores
                </div>
            </section>
        </div>
    )
}
