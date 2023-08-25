import { FC, Fragment } from "react"
import { useDispatch } from "react-redux"
import { Popover, Transition } from '@headlessui/react'

import { startSetTaskEdit } from "../../store/data"
import { IAppDispatch } from "../../store/store"

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

    const dispatch:IAppDispatch = useDispatch()


    const onEditTask = () => {
        dispatch( startSetTaskEdit({ task }) )
    }

    return (
            <div className="flex flex-col sm:flex-row justify-between gap-4 border-b last-of-type:border-b-0 -z-20 py-3">
                <div className="flex flex-col gap-1 animate-fade-down animate-duration-500">
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
                <div className="flex-1 sm:flex-initial flex items-center justify-between gap-3">
                    <button
                        className={`${ task.completed ? 'bg-green-200 text-green-700':'bg-gray-200 text-gray-800'} px-3 py-1 rounded-md active:scale-95 flex items-center justify-center gap-1 min-w-[9rem]`}
                    >
                        <i className={`transition-all bx ${ task.completed ? 'bx-check-circle text-green-600' : 'bx-time-five' }`} ></i>
                        { task.completed ? 'Completada' : 'Pendiente' }
                    </button>
                    <Popover className="relative">
                        <Popover.Button className="flex justify-center items-center bg-slate-100 hover:bg-slate-200 rounded-md px-1 py-2 active:scale-95">
                            <i className='bx bx-dots-vertical-rounded'></i>
                        </Popover.Button>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 translate-y-1"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-1"
                        >
                            <Popover.Panel className="absolute bottom-8 sm:bottom-auto right-0 sm:mt-2 z-10 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
                                <div className="flex flex-col items-start py-2 px-2">
                                    <button 
                                        onClick={ onEditTask }
                                        className="w-full flex items-center gap-2 px-3 py-1 transition duration-150 hover:bg-gray-100 rounded-md"
                                    >
                                        <i className='bx bxs-edit text-blue-800' ></i>
                                        Editar
                                    </button>
                                    <button className="w-full flex items-center gap-2 px-3 py-1 transition duration-150 hover:bg-gray-100 rounded-md">
                                        <i className='bx bxs-trash text-red-600'></i>
                                        Eliminar
                                    </button>
                                </div>
                            </Popover.Panel>
                        </Transition>
                    </Popover>
                </div>
            </div>
    )
}
