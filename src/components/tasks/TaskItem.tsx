import { FC } from "react"

import { tasksOptions } from "../../constants"
import { dateFormat, getSelectValueOption } from "../../helpers"

import { ITask } from "../../interfaces"


const classBgPriority = {
    low   : 'bg-lime-500',
    medium: 'bg-amber-400',
    high  : 'bg-red-600'
}

interface Props {
    task: ITask
}
export const TaskItem:FC<Props> = ({ task }) => {
    return (
        <div className="flex flex-col gap-1 border-b last-of-type:border-b-0 py-3 animate-fade-down animate-duration-500">
            <p className="font-semibold text-slate-800">{ task.name }</p>
            <div 
                dangerouslySetInnerHTML={{ __html: task.description }}
                className="text-slate-600 text-[0.9rem]"
            >
            </div>
            <p className="text-slate-600 text-[0.9rem] flex items-center gap-1">
                <span className="underline font-semibold text-slate-700">Entrega:</span> 
                { dateFormat(task.deliveryDate) }
            </p>
            <p className="flex items-center gap-2">
                <span className="text-slate-700 text-[0.9rem] font-semibold">
                    Prioridad:
                </span>
                <span 
                    className={`${ classBgPriority[task.priority] } text-[0.8rem] font-medium text-white px-2 rounded-lg`}
                >
                    { getSelectValueOption( tasksOptions, task.priority )  }
                </span> 
            </p>
        </div>
    )
}
