import { FC, ReactNode } from "react"


interface Props {
    processing?: boolean
    title      : string
    subtitle   : ReactNode
    onResult   : ( result: () => Promise<{ confirm: boolean }> ) => void
}

export const ModalDelete:FC<Props> = ({ processing = false, title, subtitle, onResult }) => {
    
    const resultConfirm = async() => {
        return { confirm: true }
    }
    
    const resultCancel = async() => {
        return { confirm: false }
    }

    return (
        <>
            <div className="w-full px-4 pt-7 sm:pt-8 sm:px-8">
                <div className="sm:flex sm:items-start sm:gap-3">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0">
                        <i className='bx bx-trash text-red-600 text-lg'></i>
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:text-left">
                        <h3 className="font-semibold leading-6 text-slate-800 text-lg" id="modal-title">{ title }</h3>
                        <div className="mt-1 text-slate-600">
                            { subtitle }
                        </div>
                    </div>
                </div>
            </div>
            <div className="px-4 py-6 sm:flex sm:flex-row-reverse sm:px-6">
                <button 
                    type="button" 
                    disabled={processing}
                    onClick={ ()=> onResult( resultConfirm ) }
                    className="flex w-full justify-center items-center text-sm rounded-md border border-transparent bg-red-600 font-semibold py-2 px-4 text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-36 disabled:bg-red-400 disabled:cursor-not-allowed">
                    {
                        processing
                        ? (
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle 
                                        className="opacity-25" 
                                        cx="12" 
                                        cy="12" 
                                        r="10" 
                                        stroke="currentColor" 
                                        strokeWidth="4">   
                                    </circle>
                                    <path 
                                        className="opacity-75" 
                                        fill="currentColor" 
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                    </path>
                                </svg>
                        )
                        : 'Eliminar'
                    }
                </button>
                <button
                    type="button"
                    disabled={processing} 
                    onClick={ ()=> onResult( resultCancel ) } 
                    className="text-sm mt-3 inline-flex w-full sm:w-32 justify-center rounded-md border border-slate-200 bg-white py-2 px-4 text-slate-700 shadow-sm hover:bg-slate-100 focus:outline-none sm:mt-0 sm:ml-3 disabled:opacity-70 disabled:cursor-not-allowed">
                    Cancelar
                </button>
            </div>
        </>
    )
}
