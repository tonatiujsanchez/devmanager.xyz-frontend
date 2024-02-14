import { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux'
import { Controller, useForm } from "react-hook-form"

import { IAppDispatch } from '../../store/store'
import { tasksOptions } from '../../constants'
import { CKEditorClassic, Select } from ".."

import { ITask } from "../../interfaces"
import { startAddNewTask, startCleanTaskEdit, startEditTask } from '../../store/data';


interface IFormData {
    name        : string
    description : string
    deliveryDate: string
    priority    : string
}

interface Props {
    task: ITask | null
    onCloseModal: () => void
}

export const TaskForm: FC<Props> = ({ task, onCloseModal }) => {

    const [loading, setLoading] = useState(false)

    const dispatch:IAppDispatch = useDispatch()


    const { register, control, handleSubmit, formState:{ errors }, reset, getValues, setValue } = useForm<IFormData>({
        defaultValues: {
            name: '',
            description: '',
            deliveryDate: '',
            priority: 'medium'
        }
    })

    useEffect(() => {
        if( task ){
            reset({
                name        : task.name,
                deliveryDate: String(task.deliveryDate).split('T')[0],
                priority    : task.priority,
                description : task.description
            })
        }
    
        return () => {
            if(task){
                dispatch( startCleanTaskEdit() )
            }
        }
    }, [task])
    


    const onChangePriority = ( value:string ) => {
        setValue('priority', value, { shouldValidate: true })
    }

    const onSubmitProject = async ( data:IFormData ) => {

        setLoading(true)
        if(task?._id){
            await dispatch( startEditTask({
                _id:task._id,
                ...data
            }))
        }else {
            await dispatch( startAddNewTask(data) )
        }
        setLoading(false)
        onCloseModal()

    }

    return (
        <article className="w-full sm:w-[30rem] px-5 py-2">
            <header className="flex justify-between items-center gap-5 py-2 border-b">
                <h3 className="font-semibold leading-6 text-slate-800 text-lg">{task ? 'Editar Tarea' : 'Nueva Tarea'}</h3>
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
                    <Controller
                        control={ control }
                        name="description"
                        render={({ field })=>(
                            <CKEditorClassic
                                value={ field.value }
                                onChanche={ field.onChange }
                                placeholder="Hacer el diseño del proyecto en Figma"
                            />
                        )}
                        rules={{
                            validate: ( value )=> value.length === 0 ? 'Ingrese la descripción de la tarea' : undefined
                        }}
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
                    <Select
                        optionKey={ task ? task.priority : getValues('priority') }
                        options={ tasksOptions }
                        setOption={ onChangePriority }
                    />
                </div>
                <button
                    type="submit"
                    disabled={ loading }
                    className="flex justify-center py-2 mt-1 bg-slate-800 hover:bg-slate-900 disabled:bg-slate-600 text-white font-medium uppercase rounded-md active:scale-[0.98]"
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
