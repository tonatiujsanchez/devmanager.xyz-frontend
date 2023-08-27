import { Link, Navigate, useParams } from "react-router-dom"
import { useGetProject } from "../hooks"

import { CollaboratorsSection, LoadingMain, TasksSection } from "../components"
import { tabOptions } from "../constants"
import { useState } from "react"


export const ProjectPage = () => {

    const [selectedTab, setSelectedTab] = useState<string>(tabOptions[0].value)

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
        <div className="flex flex-col gap-5 pb-5">
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
            <nav className={` sm:self-start flex gap-1 px-1 py-1 bg-slate-700/10 backdrop-blur-md rounded-lg`}>
                {
                    tabOptions.map( task => (
                        <button
                            key={ task.value }
                            onClick={ ()=> setSelectedTab( task.value ) } 
                            className={`${ selectedTab === task.value ? 'bg-white text-slate-800':'hover:bg-white/50 hover:text-slate-800' } flex-1 min-w-[9rem] px-3 py-2 text-slate-500 font-medium text-center rounded-lg transition-all`}
                        >
                            { task.text }
                        </button>
                    ))
                }
            </nav>
            {
                selectedTab === tabOptions[0].value && (
                    <TasksSection
                        projectTasks={ project.tasks }
                        loadingTasks={ loadingTasks }
                    />
                )
            }
            {
                selectedTab === tabOptions[1].value && (
                    <CollaboratorsSection />
                )   
            }
            
        </div>
    )
}
