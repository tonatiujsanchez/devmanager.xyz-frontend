import { FC } from "react"
import { IProject } from "../../interfaces"
import { ProjectItem } from "./ProjectItem"

interface Props {
    projects: IProject[]
} 

export const ProjectList:FC<Props> = ({ projects }) => {
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
