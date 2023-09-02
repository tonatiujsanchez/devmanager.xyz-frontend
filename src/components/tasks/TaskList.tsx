import { FC } from "react"
import { ITaskState } from "../../interfaces"
import { TaskItem } from ".."


interface Props {
    projectTasks: ITaskState
}

export const TaskList:FC<Props> = ({ projectTasks }) => {


    if(projectTasks.tasks.length === 0){
        return (
            <p className="text-center text-slate-400">No hay tareas en este proyecto</p>
        )
    }

    return (
        projectTasks.tasks.map(task => (
            <TaskItem
                key={task._id}
                task={ task }
            />
        ))
    )
}
