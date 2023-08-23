import { FC } from "react"
import { ITaskState } from "../../interfaces"
import { TaskItem } from ".."


interface Props {
    projectTasks: ITaskState
}

export const TaskList:FC<Props> = ({ projectTasks }) => {
  return (
        projectTasks.tasks.length === 0
        ?(
            <p className="text-center">No hay tareas en este proyecto</p>
        )
        :(
            projectTasks.tasks.map(task => (
                <TaskItem
                    key={task._id}
                    task={ task }
                />
            ))
        )
  )
}
