import { useState } from 'react'
import { Navigate, useNavigate, useParams } from "react-router-dom"
import { useDispatch } from "react-redux"

import { useGetProject } from "../hooks"
import { IAppDispatch } from "../store/store"
import { startDeleteProject } from "../store/data"

import { LoadingMain, Modal, ModalDelete, ProjectForm } from "../components"


export const EditProjectPage = () => {

    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const [loadingDelete, setLoadingDelete] = useState(false)

    const navigate = useNavigate()
    const { id } = useParams() as { id: string }    
    const { project, loading } = useGetProject(id)

    const dispatch:IAppDispatch = useDispatch()

    const onCloseModal = () => {
        setOpenDeleteModal(false)
    }

    const onDeleteProject = async( onResult: () => Promise<{ confirm: boolean }> ) => {
        
        if(!project?._id) { return }

        const { confirm } = await onResult()

        if(!confirm){
            return onCloseModal()
        }
               
        setLoadingDelete(true)
        await dispatch( startDeleteProject({ _id:project._id }) )

        navigate('/proyectos',{ replace: true })
    }


    if(loading){
        return (
            <div className="h-screen flex justify-center items-center">
                <LoadingMain />
            </div>
        )
    }

    if(!project) {
        return ( <Navigate to={'/proyectos'} /> )
    }

    if(project.type !== 'admin') {
        return ( <Navigate to={'/proyectos'} /> )
    }

    return (
        <>
            <div className="flex justify-between items-center gap-2">
                <h1 className="font-bold text-slate-800 text-2xl sm:text-3xl">Editar: { project.name }</h1>
                <button
                onClick={ ()=> setOpenDeleteModal(true) } 
                    className="flex items-center gap-1 text-slate-400 hover:text-red-700 font-medium"
                >
                    <i className='bx bxs-trash' ></i> <span className="hidden sm:inline-flex">Eliminar</span>
                </button>
            </div>
            <section className="grid place-items-center mt-5 sm:mt-10">
                <ProjectForm project={ project } />
            </section>
            <Modal
                isOpen={ openDeleteModal }
                closeModal={ onCloseModal }
            >
                <ModalDelete
                    title={`Eliminar proyecto`}
                    subtitle={`¿Deseas eliminar el proyecto "${ project.name }"?`}
                    processing={loadingDelete}
                    onResult={onDeleteProject}
                />
            </Modal>
        </>
    )
}
