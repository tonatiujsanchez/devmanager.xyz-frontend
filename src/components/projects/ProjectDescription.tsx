import { FC } from 'react'
import { IProject } from '../../interfaces'
import { dateFormat } from '../../helpers'

interface Props {
    project     : IProject
    onCloseModal: () => void
}
export const ProjectDescription:FC<Props> = ({ project, onCloseModal }) => {
    return (
        <div className="px-4 sm:px-6 pt-4 pb-6 sm:py-8">
            <div className="border-b-1 pb-2 mb-1 flex justify-between items-center">
                <p className="font-bold text-xl sm:text-2xl">{project.name}</p>
                <button
                    onClick={onCloseModal}
                    className="flex justify-center items-center bg-slate-100 hover:bg-slate-200 rounded-md h-7 w-7 active:scale-95"
                >
                    <i className='bx bx-x text-xl text-slate-500 hover:text-slate-800'></i>
                </button>
            </div>
            <div
                className={"description-project pb-4 pt-2"}
                dangerouslySetInnerHTML={{ __html: project.description }}
            >
            </div>
            <div className="pt-3 border-t-1 flex flex-col gap-2">
                <div><span className="font-semibold">Cliente:</span> <span>{ project.client }</span></div>
                <div><span className="font-semibold">Fecha de entrega:</span> <span>{ dateFormat( project.deliveryDate ) }</span></div>
                <div>
                    <span className="font-semibold">Tareas completadas:</span>
                    <span
                    className={`${ project.tasks.total > 0 && project.tasks.total === project.tasks.completedTasks ? 'bg-emerald-500 text-white' : 'bg-slate-200' } rounded px-2 py-1 ms-1 text-sm`}
                    >
                        {` ${project.tasks.completedTasks } / ${project.tasks.total}`}
                    </span>
                </div>
            </div>
        </div>
    )
}
