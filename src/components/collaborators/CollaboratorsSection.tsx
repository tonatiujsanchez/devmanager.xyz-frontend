import { FC, useState } from 'react'

import { useAdmin } from '../../hooks'
import { CollaboratorAdd, CollaboratorList, Modal } from '..'

import { IUser } from "../../interfaces"


interface Props {
    collaborators: IUser[]
}

export const CollaboratorsSection:FC<Props> = ({ collaborators }) => {

    const [openAddCollaborator, setOpenAddCollaborator] = useState(false)
    const { isAdmin } = useAdmin()


    const onCloseModal = () => {
        setOpenAddCollaborator(false)
    }


    return (
        <>
            <section className="animate-fade">
                <div className="flex justify-between items-center mb-3">
                    <h2 className="font-semibold text-slate-800 text-lg">Colaboradores</h2>
                    {
                        isAdmin && (
                            <button
                                onClick={ ()=> setOpenAddCollaborator( true )}
                                className="bg-amber-300 hover:bg-amber-400 text-slate-800 text-sm inline-flex items-center gap-2 font-medium px-3 py-2 rounded-md"
                            >
                                <i className='bx bx-plus font-bold'></i> Agregar Colaborador
                            </button>
                        )
                    }
                </div>
                <div className="bg-white rounded-md p-4">
                    <CollaboratorList collaborators={ collaborators} />
                </div>
            </section>
            <Modal
                isOpen={ openAddCollaborator }
                closeModal={ onCloseModal }
            >
                <CollaboratorAdd
                    onCloseModal={ onCloseModal }
                />
            </Modal>
        </>
    )
}
