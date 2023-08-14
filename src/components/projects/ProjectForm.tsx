import { useState, useEffect } from 'react';
import { useForm } from "react-hook-form"
import { useDispatch } from 'react-redux'

import { IAppDispatch } from '../../store/store'
import { startAddNewProject } from '../../store/data'
import { TextEditor } from "../"



interface IFormData {
    name        : string
    description : string
    deliveryDate: string
    client      : string
}

export const ProjectForm = () => {

    const [loading, setLoading] = useState(false)
    const [description, setDescription] = useState('')

    const dispatch:IAppDispatch = useDispatch()

    const { register, handleSubmit, formState:{ errors, isSubmitted }, getValues, setValue, setError, clearErrors } = useForm<IFormData>({
        defaultValues: {
            name: '',
            description: '',
            deliveryDate: '',
            client: ''
        }
    })

    useEffect(() => {
        setValue('description', description, { shouldValidate: true })
    }, [description])
    
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

    const onDescriptionChange = ( content:string ) => {
        setDescription(content)
    } 

    const onProjectSubmit = async( data:IFormData ) => {       
        if( description.trim() === '' ){ return }

        setLoading(true)
        await dispatch( startAddNewProject( data ) )   
        setLoading(false)
    }

    return (
        <form
            onSubmit={ handleSubmit( onProjectSubmit ) } 
            className="flex flex-col gap-5 w-full sm:max-w-[550px] bg-white px-5 sm:px-8 pt-10 pb-10 rounded-lg shadow animate-fade"
        >
            <div>
                <label
                    htmlFor="name"
                    className="block mb-1 font-semibold"
                >
                    Nombre del proyecto
                </label>
                <div className="flex">
                    <span className="flex justify-center items-center px-3 py-2 border border-r-0 rounded-tl-md rounded-bl-md">
                        <i className='bx bxs-book-content text-slate-700'></i>
                    </span>
                    <input
                        type="text"
                        id="name"
                        placeholder="Tienda virtual"
                        className="border px-3 py-2 rounded-tr-md rounded-br-md flex-1"
                        { ...register('name', {
                                validate: ( value ) => value.trim() === '' ? 'Ingrese el nombre del proyecto' : undefined
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
                    placeholder="Tienda virtual para una tienda de ropa"
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
                    htmlFor="client"
                    className="block mb-1 font-semibold"
                >
                    Cliente
                </label>
                <div className="flex">
                    <span className="flex justify-center items-center px-3 py-2 border border-r-0 rounded-tl-md rounded-bl-md">
                        <i className='bx bxs-user-rectangle text-slate-700'></i>
                    </span>
                    <input
                        type="text"
                        id="client"
                        placeholder="Cliente del proyecto"
                        className="border px-3 py-2 rounded-tr-md rounded-br-md flex-1"
                        { ...register('client', {
                                validate: ( value ) => value.trim() === '' ? 'Ingrese el cliente del proyecto' : undefined
                            })
                        }
                    />
                </div>
                {
                    !!errors.client &&
                    <span className="block text-sm text-red-600 mt-1 animate-fade-down animate-duration-100">{errors.client.message}</span>
                }
            </div>
            <button
                type="submit"
                disabled={ loading }
                className="flex justify-center py-2 mt-1 bg-slate-800 hover:bg-slate-900 disabled:bg-slate-600 text-white font-medium uppercase rounded-md"
            >
                {
                    loading
                    ?<div className="custom-loader-white"></div>
                    :'Crear Proyecto'
                }
            </button>
        </form>
    )
}
