import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Combobox } from '@headlessui/react'

import { useAdmin, useSearchProjects } from '../../hooks'
import { IProject } from '../../interfaces'

interface Props {
    onCloseModal: () => void
}

export const ProjectSearchContent:FC<Props> = ({ onCloseModal }) => {

    const [searchTerm, setSearchTerm] = useState<string>('')
    const navigate = useNavigate()
    const { user } = useAdmin()

    const { projects, loading, activeTimer } = useSearchProjects(searchTerm)


    const navigateToProject = ( project:IProject ) => {
        navigate(`/proyectos/detalles/${ project?._id }`)
        onCloseModal()
    }


    return (
        <Combobox
            as="div"
            className="mx-auto w-[20rem] sm:w-[35rem] max-w-xl transform divide-y divide-gray-100 overflow-hidden rounded-lg bg-white shadow-2xl transition-all"
            onChange={(project: IProject) => { navigateToProject(project) }}
        >
            <div className="flex relative">
                <div className="flex items-center px-3 text-xl">
                    <i className='bx bx-search font-semibold text-slate-700'></i>
                </div>
                <Combobox.Input
                    className="h-12 w-full bg-transparent text-gray-800 placeholder-gray-400 sm:text-sm pr-2 py-2 focus:outline-none"
                    placeholder="Buscar proyecto"
                    onChange={e => setSearchTerm(e.target.value)}
                />
                {
                    loading && (
                        <div className="flex items-center h-full px-2 absolute bg-white bg-opacity-70 right-0 top-0">
                            <div className="custom-loader-secondary w-[1.6rem] h-[1.6rem]"></div>
                        </div>
                    )
                }
            </div>
            {projects.length > 0 && (
                <Combobox.Options static className="max-h-72 scroll-py-2 overflow-y-auto py-2 text-sm text-gray-800">
                    {
                        projects.map(project => (
                            <Combobox.Option
                                key={project._id}
                                className="flex gap-2 px-4 py-3 border-b border-slate-100 last-of-type:border-b-0 hover:bg-slate-100 cursor-pointer"
                                value={project}
                            >
                                <span>{project.name}</span>
                                {
                                    project.creator !== user._id && (
                                        <span className="font-medium text-[0.7rem] px-2 rounded-xl bg-slate-600 text-slate-50">Colaborador</span>
                                    )
                                }
                            </Combobox.Option>
                        ))
                    }
                </Combobox.Options>
            )}
            {
                searchTerm.trim() !== '' && !activeTimer && !loading && projects.length === 0 && (
                    <p className="text-slate-800 text-center py-3">Sin resultados</p>
                )
            }
        </Combobox>
    )
}
