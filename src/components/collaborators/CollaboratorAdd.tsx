import { FC, useState } from 'react';

import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { isAxiosError } from 'axios'

import { clientAxios } from '../../config'
import { IAppDispatch } from '../../store/store'
import { startAddCollaboratorToProject } from '../../store/data'


interface ICollaborator {
    _id   :string,
    name  :string,
    email :string,
    photo?: string

}

interface IFormData {
    email : string
}

interface Props {
    onCloseModal: () => void
}

export const CollaboratorAdd:FC<Props> = ({ onCloseModal }) => {

    const [loading, setLoading] = useState(false)
    const [loadingAddCollaborator, setLoadingAddCollaborator] = useState(false)
    const [collaborator, setCollaborator] = useState<ICollaborator>()
    const [errorMsg, setErrorMsg] = useState<string>()

    const dispatch:IAppDispatch = useDispatch()

    const { register, handleSubmit, formState:{ errors } } = useForm<IFormData>({
        defaultValues: {
            email: '',
        }
    })

    const searchCollaboratorByEmail = async( email: string ):Promise<{collaborator?: ICollaborator, msgErrorResp?:string }> => {
        try {
            const { data } = await clientAxios.post('/collaborators',{
                email
            })

            return {
                collaborator: data,
                msgErrorResp: undefined
            }
        } catch (error) {
            if(isAxiosError(error)){
                const { msg } = error.response?.data as { msg: string }
                return {
                    collaborator: undefined,
                    msgErrorResp: msg
                } 
            }
            return {
                collaborator: undefined,
                msgErrorResp: 'Usuario no encontrado'
            } 
        }
    }


    const onSubmitSearchCollaborator = async(data:IFormData) => {
        setLoading(true)
        const { collaborator, msgErrorResp } = await searchCollaboratorByEmail( data.email )
        setLoading(false)

        if( msgErrorResp ){
            setCollaborator( undefined )
            return setErrorMsg( msgErrorResp )
        }

        setErrorMsg( undefined )
        setCollaborator( collaborator )
    }

    const onAddCollaboratorToProject = async() => {
        setLoadingAddCollaborator(true)
        await dispatch( startAddCollaboratorToProject({ idCollaborator: collaborator!._id }) )
        setLoadingAddCollaborator(false)
    }


    return (
        <article className="w-full sm:w-[30rem] px-5 pt-2 pb-6">
            <header className="flex justify-between items-center gap-5 py-2 border-b">
                <h3 className="font-semibold leading-6 text-slate-800 text-lg">Agregar colaborador</h3>
                <button
                    onClick={onCloseModal}
                    className="flex justify-center items-center bg-slate-100 hover:bg-slate-200 rounded-md h-7 w-7 active:scale-95"
                >
                    <i className='bx bx-x text-xl text-slate-500 hover:text-slate-800'></i>
                </button>
            </header>
            <form
                onSubmit={ handleSubmit(onSubmitSearchCollaborator) }
                className="flex flex-col gap-1 py-5"
            >
                <div>
                    <div className="flex">
                        <span className="flex justify-center items-center px-3 py-2 border border-r-0 rounded-tl-md rounded-bl-md">
                            <i className='bx bxs-user text-lg text-slate-700'></i>
                        </span>
                        <input
                            type="text"
                            id="name"
                            placeholder="Ingrese el correo del usuario"
                            className="border px-3 py-2 rounded-tr-md rounded-br-md flex-1"
                            {...register('email', {
                                validate: (value) => value.trim() === '' ? 'Ingrese el correo de un usuario' : undefined
                            })
                            }
                        />
                    </div>
                    {
                        !!errors.email &&
                        <span className="block text-sm text-red-600 mt-1 animate-fade-down animate-duration-100">{errors.email.message}</span>
                    }
                </div>
                <button
                    type="submit"
                    disabled={ loading }
                    className="flex justify-center py-2 mt-1 bg-slate-800 hover:bg-slate-900 disabled:bg-slate-600 text-white font-medium uppercase rounded-md active:scale-[0.98]"
                >
                    {
                        loading
                        ?<div className="custom-loader-white"></div>
                        : 'Buscar'
                    }
                </button>
            </form>
            <section className="h-36 border rounded-lg flex justify-center items-center mt-2 p-2">
                {
                    collaborator ? (
                        <div className={`flex-1 sm:flex-initial flex flex-wrap gap-3 items-center bg-slate-100 px-4 py-3 rounded-lg animate-jump animate-duration-200 animate-ease-linear`}>
                            <div className="relative w-11 h-11 rounded-full overflow-hidden cursor-pointer group border">
                                {
                                    collaborator?.photo 
                                    ?(
                                        <img
                                            src={collaborator.photo}
                                            alt={collaborator.name}
                                            className='cover bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden lg:aspect-none'
                                        />
                                    ):(
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
                            <button
                                onClick={ onAddCollaboratorToProject }
                                disabled={loadingAddCollaborator}
                                className="flex-1 sm:flex-initial min-w-[16rem] sm:min-w-[6.2rem] sm:w-[6.2rem] h-[2.2rem] flex justify-center items-center gap-1 text-sm text-emerald-600 hover:text-white bg-emerald-100 hover:bg-emerald-500 disabled:bg-emerald-200 disabled:active:scale-100 transition-colors py-1 px-2 sm:ml-8 rounded-md active:scale-95"
                            >{
                                loadingAddCollaborator ?
                                (
                                    <div className="custom-loader-white"></div>
                                ):(
                                    <>
                                        <i className='bx bx-plus text-xl'></i>
                                        <span>Agregar</span>
                                    </>
                                )
                            }
                            </button>
                        </div>
                    ):(
                        errorMsg ? (
                            <div className="flex justify-center gap-1 text-sm text-red-700 animate-jump animate-duration-200 animate-ease-linear" role="alert">
                                <svg 
                                    aria-hidden="true" 
                                    fill="currentColor" 
                                    viewBox="0 0 20 20" 
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="flex-shrink-0 inline w-5 h-5"
                                >
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd">
                                        </path>
                                </svg>
                                <span>
                                    { errorMsg }
                                </span>
                            </div>
                        ):(
                            <p className="w-44 text-center text-slate-400">Añade colaboradores a tu proyecto</p>
                        )
                    )
                }
            </section>
        </article>
    )
}
