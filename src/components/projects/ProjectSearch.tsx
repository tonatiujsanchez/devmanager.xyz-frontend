import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { Combobox } from '@headlessui/react'

import { useAdmin, useData, useUi } from '../../hooks'
import { IAppDispatch } from '../../store/store'
import { startHideSearcher } from '../../store/ui'
import { Modal } from '..'

import { IProject } from '../../interfaces'



export const ProjectSearch = () => {

    const [searchTerm, setSearchTerm] = useState<string>('')
    const [filteredProjects, setSetFilteredProjects] = useState<IProject[]>([])
    
    const dispatch:IAppDispatch = useDispatch()
    const navigate = useNavigate()

    const { showSearcher } = useUi()
    const { user } = useAdmin()
    const { projects:{ projects }, projectsCollaborative } = useData()

    const onCloseModal = () => {
        setSearchTerm('')
        dispatch( startHideSearcher() )
    }

    const navigateToProject = ( project:IProject ) => {

        navigate(`/proyectos/detalles/${ project?._id }`)
        onCloseModal()
    }

    const onSearchProject = async() => {

        if( searchTerm.trim() === '' ){
            return setSetFilteredProjects([])
        }

        const results = projects.filter( project => {
            if( project.name.toLowerCase().includes( searchTerm.toLowerCase() ) ){
               return project 
            }
        })
        const resultsCollaborative = projectsCollaborative.projects.filter( project => {
            if( project.name.toLowerCase().includes( searchTerm.toLowerCase() ) ){
               return project 
            }
        })
        setSetFilteredProjects([...results, ...resultsCollaborative])
    }

    useEffect(()=> {
        onSearchProject()
    },[searchTerm])


    return (

        <Modal
            isOpen={showSearcher}
            closeModal={onCloseModal}
            classPosition="flex items-start justify-center pt-36"
        >
            <Combobox
                as="div"
                className="mx-auto w-[20rem] sm:w-[35rem] max-w-xl transform divide-y divide-gray-100 overflow-hidden rounded-lg bg-white shadow-2xl transition-all"
                onChange={ ( project:IProject) => { navigateToProject( project ) } }
            >
                <div className="relative">
                    <Combobox.Input
                        className="h-12 w-full bg-transparent text-gray-800 placeholder-gray-400 sm:text-sm px-4 py-2 focus:outline-none"
                        placeholder="Buscar proyecto"
                        onChange={ e => setSearchTerm( e.target.value ) }
                    />
                </div>
                {filteredProjects.length > 0 && (
                    <Combobox.Options static className="max-h-72 scroll-py-2 overflow-y-auto py-2 text-sm text-gray-800">
                        {
                            filteredProjects.map( project => (
                                <Combobox.Option
                                    key={ project._id }
                                    className="flex gap-2 px-4 py-3 border-b border-slate-100 last-of-type:border-b-0 hover:bg-slate-100 cursor-pointer"
                                    value={ project }
                                >
                                    <span>{ project.name }</span>
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
            </Combobox>
        </Modal>
    )
}
