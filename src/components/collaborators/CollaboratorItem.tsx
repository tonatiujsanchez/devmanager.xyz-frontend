import { FC, Fragment, useState } from 'react'
import { useDispatch } from 'react-redux'

import { Popover, Transition } from '@headlessui/react'

import { useAdmin } from '../../hooks'
import { startRemoveCollaboratorToProject } from '../../store/data'
import { IAppDispatch } from '../../store/store'

import { Modal, ModalDelete } from '..'
import { IUser } from "../../interfaces"

interface Props {
    collaborator: IUser
}
export const CollaboratorItem: FC<Props> = ({ collaborator }) => {

    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const [loadingDelete, setLoadingDelete] = useState(false)

    const { isAdmin } = useAdmin()
    const dispatch:IAppDispatch = useDispatch()

    const onCloseModal = () => {
        setOpenDeleteModal(false)
    }


    const onDeleteCollaborator = async(result: () => Promise<{ confirm: boolean; }>) => {
        
        const { confirm } = await result()
        
        if( !confirm ){
            return onCloseModal()
        }

        setLoadingDelete(true)
        await dispatch( startRemoveCollaboratorToProject({ idCollaborator: collaborator._id! }) )        
        setLoadingDelete(false)
        onCloseModal()
    }


    return (
        <>
            <div className={`w-full sm:w-auto flex flex-wrap gap-3 items-center bg-slate-100 px-4 py-3 rounded-lg animate-jump animate-duration-200 animate-ease-linear`}>
                <div className="relative w-12 h-12 rounded-full overflow-hidden cursor-pointer group border">
                    {
                        collaborator?.photo
                            ? (
                                <img
                                    src={collaborator.photo}
                                    alt={collaborator.name}
                                    className='cover bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden lg:aspect-none'
                                />
                            ) : (
                                <div className='w-full h-full flex justify-center items-center bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden lg:aspect-none'>
                                    <p className="font-bold text-xl text-slate-800 uppercase">{collaborator.name.slice(0, 1)}</p>
                                </div>
                            )
                    }
                </div>
                <div className="flex-1">
                    <p className="font-bold -mb-1 text-slate-800">{collaborator.name}</p>
                    <p className="text-slate-500 w-auto text-sm">{collaborator.email}</p>
                </div>
                {
                    isAdmin && (
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
                                <Popover.Panel className="absolute bottom-8 sm:bottom-auto right-2 z-10 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
                                    <div className="flex flex-col items-start py-2 px-2">
                                        <button
                                            onClick={() => setOpenDeleteModal(true)}
                                            className="w-full flex items-center gap-2 px-3 py-1 transition duration-150 hover:bg-gray-100 rounded-md"
                                        >
                                            <i className='bx bxs-trash text-red-600'></i>
                                            Eliminar
                                        </button>
                                    </div>
                                </Popover.Panel>
                            </Transition>
                        </Popover>
                    )
                }
            </div>
            <Modal
                isOpen={ openDeleteModal }
                closeModal={ onCloseModal }
            >
                <ModalDelete
                    title={`Remover colaborador`}
                    subtitle={`¿Deseas eliminar a "${ collaborator.name }" del proyecto?`}
                    processing={loadingDelete}
                    onResult={onDeleteCollaborator}
                />
            </Modal>
        </>
    )
}
