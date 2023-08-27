import { FC, useState } from 'react';

import { useForm } from 'react-hook-form'


interface IFormData {
    email : string
}

interface Props {
    onCloseModal: () => void
}

export const CollaboratorAdd:FC<Props> = ({ onCloseModal }) => {

    const [loading, setLoading] = useState(false)

    const { register, handleSubmit, formState:{ errors } } = useForm<IFormData>({
        defaultValues: {
            email: '',
        }
    })


    const onSubmitSearchCollaborator = (data:IFormData) => {
        setLoading(true)
        console.log(data)
        setLoading(false)
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
                onSubmit={handleSubmit(onSubmitSearchCollaborator)}
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
                            placeholder="Ingrese el correo de usuario"
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
                        : 'Buscar colaborador'
                    }
                </button>
            </form>
            <section className="h-32 border rounded-lg flex justify-center items-center mt-2">
                <p className="w-44 text-center text-slate-400">Añade colaboradores a tu proyecto</p>
            </section>
        </article>
    )
}
