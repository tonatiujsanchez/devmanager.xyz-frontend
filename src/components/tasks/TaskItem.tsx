import { FC } from "react"

import { tasksOptions } from "../../constants"
import { getSelectValueOption } from "../../helpers"

import { ITask } from "../../interfaces"


interface Props {
    task: ITask
}
export const TaskItem:FC<Props> = ({ task }) => {
    return (
        <div className="border-b py-3 animate-fade-down animate-duration-500">
            <p className="font-semibold text-slate-800">{ task.name }</p>
            <div 
                dangerouslySetInnerHTML={{ __html: task.description }}
                className="text-slate-600 text-[0.9rem]"
            >
            </div>
            <p className="text-slate-600 text-[0.9rem]"><span className="underline">Entrega:</span> { JSON.stringify(task.deliveryDate) }</p>
            <p className="text-slate-600 text-[0.9rem]"><span>Prioridad:</span> { getSelectValueOption( tasksOptions, task.priority )  }</p>
        </div>
    )
}
