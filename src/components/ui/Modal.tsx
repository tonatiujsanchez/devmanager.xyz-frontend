import { Fragment, FC } from 'react';
import { Dialog, Transition } from '@headlessui/react'


interface Props {
    children: JSX.Element
    isOpen: boolean
    closeModal: () => void
}

export const Modal:FC<Props> = ({ children, isOpen, closeModal }) => {

    return (
        <Transition show={isOpen} as={Fragment}>
            <Dialog open={isOpen} onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/40 z-20" />
                </Transition.Child>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >
                    <div className="fixed inset-0 flex items-center justify-center p-4 z-20">
                        <Dialog.Panel className="bg-white max-w-[500px] rounded-md">
                            { children }
                        </Dialog.Panel>
                    </div>
                </Transition.Child>
            </Dialog>
        </Transition>
    )
}
