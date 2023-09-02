import { FC } from "react"
import { IProject } from "../../interfaces"
import { ProjectItem } from "./ProjectItem"

interface Props {
    projects: IProject[]
} 

export const ProjectList:FC<Props> = ({ projects }) => {


    if( projects.length === 0 ){
        return (
            <div className="bg-white rounded-md p-4">
                <p className="text-slate-400 text-center">No hay proyectos agregados</p>
            </div>
        )
    }

    return (
        <ul className="flex flex-col gap-1">
            {
                projects.map( project => (
                    <ProjectItem 
                        key={project._id} 
                        project={ project }
                    />
                ))
            }
        </ul>
    )
}
