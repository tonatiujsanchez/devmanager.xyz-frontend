import { Link } from "react-router-dom"
import { IProject } from "../../interfaces"
import { FC } from 'react'

interface Props {
    project: IProject
}

export const ProjectItem: FC<Props> = ({ project }) => {
    return (
        <li className="flex justify-between items-center gap-3 flex-wrap bg-white rounded-md px-4 py-3 animate-fade shadow">
            <div className="flex-1">
                <Link 
                    to={`/proyectos/${ project._id }`} 
                    className="text-[1.2rem] text-slate-800 hover:text-amber-400 font-semibold"
                >
                    { project.name }
                </Link>
                <div 
                    className="text-slate-600 text-[0.9rem]" 
                    dangerouslySetInnerHTML={{ __html: project.description }}>
                </div>
            </div>
            <Link
                className="flex justify-center w-full sm:w-auto bg-slate-100 hover:bg-slate-200 rounded-md py-1 px-3 font-medium text-slate-600 hover:text-slate-800 text-[0.9rem]" 
                to={`/proyectos/${ project._id }`} 
            >
                Ver proyecto
            </Link>
        </li>
    )
}
