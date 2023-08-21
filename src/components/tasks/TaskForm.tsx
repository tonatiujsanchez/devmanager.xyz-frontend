import { FC, useEffect, useState } from 'react';
import { useForm } from "react-hook-form"

import { ITask, PriorityTask } from "../../interfaces"
import { TextEditor } from ".."


interface IFormData {
    name: string
    description: string
    deliveryDate: string
    priority: PriorityTask
}

interface Props {
    task?: ITask
    onCloseModal: () => void
}
export const TaskForm: FC<Props> = ({ task, onCloseModal }) => {

    const [loading, setLoading] = useState(false)
    const [description, setDescription] = useState('')


    const { register, handleSubmit, formState:{ errors, isSubmitted }, getValues, setValue, setError, clearErrors } = useForm<IFormData>({
        defaultValues: {
            name: '',
            description: '',
            deliveryDate: '',
            priority: 'medium'
        }
    })

    useEffect(() => {
        if(isSubmitted) {
            if( description.trim() === '' ){
                setError("description", {
                    message: "Ingrese la descripción del proyecto",
                })
            }else {
                clearErrors('description')
            }
        }
    }, [setError, description, isSubmitted])

    useEffect(() => {
        setValue('description', description, { shouldValidate: true })
    }, [description])
    
    const onDescriptionChange = ( content:string ) => {
        setDescription(content)
    } 



    const onSubmitProject = async () => {
        if( description.trim() === '' ){ return }

        setLoading(true)
        // TODO: 
        setLoading(false)


    }

    return (
        <article className="w-full sm:w-[30rem] px-5 py-2">
            <header className="flex justify-between items-center gap-5 py-2 border-b">
                <h3 className="font-semibold leading-6 text-slate-800 text-lg">Nueva Tarea</h3>
                <button
                    onClick={onCloseModal}
                    className="flex justify-center items-center bg-slate-100 hover:bg-slate-200 rounded-md h-7 w-7 active:scale-95"
                >
                    <i className='bx bx-x text-xl text-slate-500 hover:text-slate-800'></i>
                </button>
            </header>
            <form
                onSubmit={handleSubmit(onSubmitProject)}
                className="flex flex-col gap-5 py-5"
            >
                <div>
                    <label
                        htmlFor="name"
                        className="block mb-1 font-semibold"
                    >
                        Nombre de la tarea
                    </label>
                    <div className="flex">
                        <span className="flex justify-center items-center px-3 py-2 border border-r-0 rounded-tl-md rounded-bl-md">
                            <i className='bx bxs-book-content text-slate-700'></i>
                        </span>
                        <input
                            type="text"
                            id="name"
                            placeholder="Hacer el diseño"
                            className="border px-3 py-2 rounded-tr-md rounded-br-md flex-1"
                            {...register('name', {
                                validate: (value) => value.trim() === '' ? 'Ingrese el nombre de la tarea' : undefined
                            })
                            }
                        />
                    </div>
                    {
                        !!errors.name &&
                        <span className="block text-sm text-red-600 mt-1 animate-fade-down animate-duration-100">{errors.name.message}</span>
                    }
                </div>
                <div>
                    <label
                        htmlFor="description"
                        className="block mb-1 font-semibold"
                    >
                        Descripción
                    </label>
                    <TextEditor
                        placeholder="Hacer el diseño del proyecto en Figma"
                        content={ getValues('description') }
                        onChangeContent={ onDescriptionChange }
                    />
                    {
                        !!errors.description &&
                        <span className="block text-sm text-red-600 mt-1 animate-fade-down animate-duration-100">{errors.description.message}</span>
                    }
                </div>
                <div>
                    <label
                        htmlFor="deliveryDate"
                        className="block mb-1 font-semibold"
                    >
                        Fecha de entrega
                    </label>
                    <div className="flex">
                        <span className="flex justify-center items-center px-3 py-2 border border-r-0 rounded-tl-md rounded-bl-md">
                            <i className='bx bx bxs-calendar-check text-slate-700'></i>
                        </span>
                        <input
                            type="date"
                            id="deliveryDate"
                            placeholder="Tienda virtual para una tienda de ropa"
                            className="border px-3 py-2 rounded-tr-md rounded-br-md flex-1"
                            { ...register('deliveryDate', {
                                    validate: ( value ) => value.trim() === '' ? 'Seleccione la fecha de entrega' : undefined
                                })
                            }
                        />
                    </div>
                    {
                        !!errors.deliveryDate &&
                        <span className="block text-sm text-red-600 mt-1 animate-fade-down animate-duration-100">{errors.deliveryDate.message}</span>
                    }
                </div>
                <div>
                    <label
                        htmlFor="priority"
                        className="block mb-1 font-semibold"
                    >
                        Prioridad
                    </label>

                </div>
                <button
                    type="submit"
                    disabled={ loading }
                    className="flex justify-center py-2 mt-1 bg-slate-800 hover:bg-slate-900 disabled:bg-slate-600 text-white font-medium uppercase rounded-md"
                >
                    {
                        loading
                        ?<div className="custom-loader-white"></div>
                        : task ? 'Guardar' : 'Crear Tarea'
                    }
                </button>
            </form>
        </article>
    )
}
