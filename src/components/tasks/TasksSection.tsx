import { FC, useState } from 'react'
import { ITaskState } from "../../interfaces"
import { Modal, TaskForm, TaskList } from '..'


interface Props {
    projectTasks: ITaskState
    loadingTasks: boolean
}
export const TasksSection: FC<Props> = ({ projectTasks, loadingTasks }) => {

    
    const [openFormTask, setOpenFormTask] = useState(false)

    const onCloseModal = () => {
        setOpenFormTask(false)
    }

    
    return (
        <>
            <section className="animate-fade">
                <div className="flex justify-between items-center mb-3">
                    <h2 className="font-semibold text-slate-800 text-lg">Tareas del Proyecto</h2>
                    <button
                        onClick={ ()=> setOpenFormTask( true )}
                        className="bg-amber-300 hover:bg-amber-400 text-slate-800 text-sm inline-flex items-center gap-2 font-medium px-3 py-2 rounded-md"
                    >
                        <i className='bx bx-plus font-bold'></i> Nueva Tarea
                    </button>
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
            <Modal
                isOpen={openFormTask}
                closeModal={onCloseModal}
            >
                <TaskForm
                    onCloseModal={onCloseModal}
                />
            </Modal>
        </>
    )
}
