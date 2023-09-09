import { FC, useState, useEffect } from 'react';
import { useSelector } from 'react-redux'

import { IRootState } from '../../store/store'
import { IDataState } from '../../store/data'

import { useAdmin } from '../../hooks'
import { Modal, TaskForm, TaskList } from '..'
import { ITaskState } from "../../interfaces"


interface Props {
    projectTasks: ITaskState
    loadingTasks: boolean
    refreshTasks: ({ page }: { page: number }) => Promise<void>
}
export const TasksSection: FC<Props> = ({ projectTasks, loadingTasks, refreshTasks }) => {

    
    const [openFormTask, setOpenFormTask] = useState(false)
    const { taskEdit, projectActive }:IDataState = useSelector((state:IRootState)=> state.data)
    
    const { isAdmin } = useAdmin()

    const onCloseModal = () => {
        setOpenFormTask(false)
    }

    useEffect(() => {
        if(taskEdit) {
            setOpenFormTask(true)
        }
    }, [taskEdit])

    
    return (
        <>
            <section className="animate-fade">
                <div className="flex justify-between items-center mb-3">
                    <div className="flex items-end">
                        <h2 className="font-semibold text-slate-800 text-lg">Tareas del Proyecto</h2>
                        <button
                            className="text-sm text-slate-600 hover:bg-slate-200 hover:text-slate-900 py-1 px-2 rounded-full active:scale-95"
                            onClick={ ()=> refreshTasks({ page: projectActive!.tasks.page }) }
                        >
                            <i className='bx bx-revision'></i>
                        </button>
                    </div>
                    {
                        isAdmin && (
                            <button
                                onClick={ ()=> setOpenFormTask( true )}
                                className="bg-amber-300 hover:bg-amber-400 text-slate-800 text-sm inline-flex items-center gap-2 font-medium px-3 py-2 rounded-md"
                            >
                                <i className='bx bx-plus font-bold'></i> Nueva Tarea
                            </button>
                        )
                    }
                </div>
                <div className="bg-white rounded-md p-4">
                    {
                        loadingTasks
                        ?(
                            <p className="text-center">Cargando...</p>
                        ):(
                            <TaskList
                                projectTasks={ projectTasks }
                            />
                        )
                    }
                </div>
            </section>
            {
                isAdmin && (
                    <Modal
                        isOpen={openFormTask}
                        closeModal={onCloseModal}
                    >
                        <TaskForm
                            onCloseModal={onCloseModal}
                            task={taskEdit}
                        />
                    </Modal>
                )
            }
        </>
    )
}
