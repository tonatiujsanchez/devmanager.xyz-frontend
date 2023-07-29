import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import { useForm } from 'react-hook-form'

import { validators } from '../helpers';
import axios from 'axios';


interface Alert {
    title: string
    type: 'error' | 'success'
}

interface FormData {
    name     : string
    email    : string
    password : string
    passwordConfirm: string
}

export const RegisterPage = () => {

    const [loading, setLoading] = useState(false)
    const [remindMe, setRemindMe] = useState(false)
    const [alert, setAlert] = useState<Alert>()

    const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>({
        defaultValues: {
            name    : '',
            email   : '',
            password: '',
            passwordConfirm:'',
        }
    })

    const password = useRef({})
    password.current = watch('password', '')

    const handleCheckboxChange = () => {       
        setRemindMe(!remindMe) 
    }


    const onRegister = async( name:string, email:string, password:string, remindMe:boolean ) => {
        try {
            const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/users`, {
                name, email, password
            })
            console.log({ data, remindMe })
             
        } catch (error) {

            if(axios.isAxiosError(error)){
                const { msg } = error.response?.data as { msg: string }
                setAlert({
                    title: msg,
                    type: 'error'
                })

                setTimeout(() => {
                    setAlert(undefined)
                }, 3000);
            }
        }
    }

    const onRegisterSubmit = async({ name, email, password }: FormData ) => {
        setLoading(true)
        await onRegister( name, email, password, remindMe )
        setLoading(false)
    }


    return (
        <section className="px-4">
            <div className="relative bg-white px-5 sm:px-9 pt-10 pb-8 rounded-lg shadow">
                <h1 className="text-3xl mb-8 font-extrabold text-center uppercase">Crear Cuenta</h1>
                <form 
                    onSubmit={ handleSubmit( onRegisterSubmit ) }
                    autoComplete="off"
                    className="flex flex-col gap-4"
                >
                    {
                        alert &&
                        <div className="absolute -top-5 left-0 right-0 w-full shadow-lg flex justify-center p-4 mb-4 text-sm border border-red-400 text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
                            <svg aria-hidden="true" className="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
                            <span>
                                { alert.title }
                            </span>
                        </div>
                    }
                    <div>
                        <label
                            htmlFor="name"
                            className="block mb-1 font-semibold"
                        >
                            Nombre
                        </label>
                        <div className="flex">
                            <span className="flex justify-center items-center px-3 py-2 border border-r-0 rounded-tl-md rounded-bl-md">
                                <i className='bx bxs-user text-slate-700'></i>
                            </span>
                            <input
                                type="text"
                                id="name"
                                placeholder="John Doe"
                                className="border px-3 py-2 rounded-tr-md rounded-br-md flex-1"
                                { ...register('name', {
                                        validate: ( value ) => value.trim() === '' ? 'Ingrese su nombre' : undefined
                                    })
                                }
                            />
                        </div>
                        {
                            !!errors.name &&
                            <span className="block text-sm text-red-600 mt-1">{errors.name.message}</span>
                        }
                    </div>
                    <div>
                        <label
                            htmlFor="email"
                            className="block mb-1 font-semibold"
                        >
                            Correo
                        </label>
                        <div className="flex">
                            <span className="flex justify-center items-center px-3 py-2 border border-r-0 rounded-tl-md rounded-bl-md">
                                <i className='bx bxs-envelope text-slate-700'></i>
                            </span>
                            <input
                                type="text"
                                id="email"
                                placeholder="correo@mail.com"
                                className="border px-3 py-2 rounded-tr-md rounded-br-md flex-1"
                                { ...register('email', {
                                        required: 'Ingrese su correo',
                                        validate: ( value ) => validators.isValidEmail(value) ? undefined : 'Correo no válido'
                                }) }
                            />
                        </div>
                        {
                            !!errors.email &&
                            <span className="block text-sm text-red-600 mt-1">{errors.email.message}</span>
                        }
                    </div>
                    <div>
                        <label
                            htmlFor="password"
                            className="block mb-1 font-semibold"
                        >
                            Contraseña
                        </label>
                        <div className="flex">
                            <span className="flex justify-center items-center px-3 py-2 border border-r-0 rounded-tl-md rounded-bl-md">
                                <i className='bx bxs-lock text-slate-700'></i>
                            </span>
                            <input
                                type="password"
                                id="password"
                                placeholder="Contraseña"
                                className="border px-3 py-2 rounded-tr-md rounded-br-md flex-1"
                                { ...register('password', {
                                        required: 'Ingrese una Contraseña',
                                        minLength: { value: 6, message: 'Se requiere minimo 6 caracteres' }
                                    })
                                }
                            />
                        </div>
                        {
                            !!errors.password &&
                            <span className="block text-sm text-red-600 mt-1">{errors.password.message}</span>
                        }
                    </div>
                    <div>
                        <label
                            htmlFor="passwordConfirm"
                            className="block mb-1 font-semibold"
                        >
                            Confirmar Contraseña
                        </label>
                        <div className="flex">
                            <span className="flex justify-center items-center px-3 py-2 border border-r-0 rounded-tl-md rounded-bl-md">
                                <i className='bx bxs-lock text-slate-700'></i>
                            </span>
                            <input
                                type="password"
                                id="passwordConfirm"
                                placeholder="Confirmar Contraseña"
                                className="border px-3 py-2 rounded-tr-md rounded-br-md flex-1"
                                { ...register('passwordConfirm', {
                                        required: 'Repita su contraseña',
                                        validate: value => value !== password.current ? 'Las contraseñas no son iguales' : undefined 
                                    })                                
                                }
                            />
                        </div>
                        {
                            !!errors.passwordConfirm &&
                            <span className="block text-sm text-red-600 mt-1">{errors.passwordConfirm.message}</span>
                        }
                    </div>
                    <div className="flex justify-between gap-5 mt-2 mb-3">
                        <div>
                            <input
                                type="checkbox"
                                id="checkbox-remindme"
                                disabled={loading}
                                checked={remindMe}
                                onChange={handleCheckboxChange}
                                className="hidden"
                            />
                            <label
                                htmlFor="checkbox-remindme"
                                className={`flex items-center select-none ${ loading ? '' : 'cursor-pointer'}`}
                            >
                                <div className={`w-5 h-5 border border-gray-300 rounded-md mr-2 flex justify-center items-center ${ remindMe ? 'bg-slate-800' : 'bg-white'}`}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        style={{ fill: '#fff' }}
                                        className={ remindMe ? 'block' : 'hidden'}
                                    >
                                        <path d="m10 15.586-3.293-3.293-1.414 1.414L10 18.414l9.707-9.707-1.414-1.414z"></path>
                                    </svg>
                                </div>
                                <span className="text-gray-800 hover:text-gray-950 font-medium leading-5">Recordarme</span>
                            </label>
                        </div>
                        <Link to="/olvide-password" className="text-gray-800 hover:text-gray-950 font-medium leading-5">Olvide mi contraseña</Link>
                    </div>
                    <button
                        type="submit"
                        className="uppercase bg-slate-800 hover:bg-slate-900 text-white font-medium rounded-md py-2"
                    >
                        Crear Cuenta
                    </button>
                </form>
                <div className="text-center pt-8 pb-8 flex justify-center overflow-hidden">
                    <p className="flex items-center gap-2 leading-5
                    before:content-[''] before:h-[1px] before:w-16 sm:before:w-36 before:bg-slate-600 
                    after:content-[''] after:h-[1px] after:w-16 sm:after:w-36 after:bg-slate-600"
                    >
                        O registrate con
                    </p>
                </div>
                <div className="flex justify-center gap-3">
                    <button
                        className="border rounded-md px-2 py-1 hover:bg-slate-800 hover:text-white transition-all duration-300"
                    >
                        <i className='bx bxl-facebook text-2xl'></i>
                    </button>
                    <button
                        className="border rounded-md px-2 py-1 hover:bg-slate-800 hover:text-white transition-all duration-300"
                    >
                        <i className='bx bxl-google text-2xl'></i>
                    </button>
                    <button
                        className="border rounded-md px-2 py-1 hover:bg-slate-800 hover:text-white transition-all duration-300"
                    >
                        <i className='bx bxl-github text-2xl'></i>
                    </button>
                </div>
                <div className="flex justify-center items-center gap-1 mt-7">
                    <span className="inline-block leading-5 text-slate-700">¿Ya tienes una cuenta?</span>
                    <Link to="/" className="font-semibold text-slate-700 hover:text-slate-950">Inicia Sesión</Link>
                </div>
            </div>
        </section>
    )
}
