import { Fragment, useState } from 'react'
import { useDispatch } from 'react-redux'

import { Combobox, Dialog, Transition } from '@headlessui/react'

import { useUi } from '../../hooks'
import { IAppDispatch } from '../../store/store'
import { startHideSearcher } from '../../store/ui'
import { Modal } from '..'



export const ProjectSearch = () => {

    const [searchTerm, setSearchTerm] = useState<string>('')
    const dispatch:IAppDispatch = useDispatch()

    const { showSearcher } = useUi()
    const onCloseModal = () => {
        dispatch( startHideSearcher() )
    }


    return (

        <Modal
            isOpen={showSearcher}
            closeModal={onCloseModal}
            classPosition="flex items-start justify-center pt-36"
        >
            <Combobox
                as="div"
                className="mx-auto w-[19rem] sm:w-[24rem] max-w-xl transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-al"
            >
                <div className="relative">
                    <Combobox.Input
                        className="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-800 placeholder-gray-400 focus:ring-0 sm:text-sm"
                        placeholder="Buscar..."
                    />
                </div>

                {/* {proyectosFiltrados.length > 0 && (
                    <Combobox.Options static className="max-h-72 scroll-py-2 overflow-y-auto py-2 text-sm text-gray-800">
                    </Combobox.Options>
                )} */}
            </Combobox>
        </Modal>
    )
}
