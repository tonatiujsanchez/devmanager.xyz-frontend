import { useState } from 'react'
import { Link } from 'react-router-dom'

import { Helmet } from 'react-helmet'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'

import { IRootState, IAppDispatch  } from '../store/store'
import { IAuthState, startUserWithEmailAndPassword } from '../store/auth'

import { showNotify, validators } from '../helpers'
import { GoogleLoginButton } from '../components'


interface FormData {
    email    : string
    password : string
}

export const LoginPage = () => {

    const [loading, setLoading] = useState(false)
    const [remindMe, setRemindMe] = useState(true)

    const dispatch:IAppDispatch = useDispatch()
    const { errorMsg }: IAuthState = useSelector(( state: IRootState ) => state.auth)

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        defaultValues: {
            email: '',
            password: ''
        }
    })

    
    const onLoginSubmit = async( { email, password }: FormData ) => {
        setLoading(true)
        await dispatch( startUserWithEmailAndPassword({ email, password, remindMe }) )
        setLoading(false)        
    }
    
    

    return (
        <>
            <Helmet>
                <title>DevManager | Iniciar Sesión</title>
            </Helmet>    
            <section className="px-4 animate-fade">
                <div className="relative bg-white px-5 sm:px-9 pt-10 pb-8 rounded-lg shadow">
                    {
                        errorMsg &&
                        <div className="absolute -top-5 left-0 right-0 w-full shadow-lg flex justify-center p-4 mb-4 text-sm border border-red-400 text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800 animate-jump animate-duration-200 animate-ease-linear" role="alert">
                            <svg aria-hidden="true" className="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
                            <span>
                                { errorMsg }
                            </span>
                        </div>
                    }
                    <h1 className="text-3xl mb-10 font-extrabold text-center uppercase">Iniciar Sesión</h1>
                    <form 
                        onSubmit={ handleSubmit(onLoginSubmit) }
                        autoComplete="off"
                        className="flex flex-col gap-4"
                    >
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
                                        }) 
                                    }
                                />
                            </div>
                            {
                                !!errors.email &&
                                <span className="block text-sm text-red-600 mt-1 animate-fade-down animate-duration-100">{errors.email.message}</span>
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
                                            required: 'Ingrese su contraseña'
                                        }) 
                                    }
                                />
                            </div>
                            {
                                !!errors.password &&
                                <span className="block text-sm text-red-600 mt-1 animate-fade-down animate-duration-100">{errors.password.message}</span>
                            }
                        </div>
                        <div className="flex justify-between gap-5 mt-2 mb-3">
                            <div>
                                <input
                                    type="checkbox"
                                    id="myCheckbox"
                                    disabled={loading}
                                    checked={remindMe}
                                    onChange={ ()=> setRemindMe( !remindMe) }
                                    className="hidden"
                                />
                                <label
                                    htmlFor="myCheckbox"
                                    className={`flex items-center select-none ${ remindMe ? '' : 'cursor-pointer'}`}
                                >
                                    <div className={`w-5 h-5 border border-gray-300 rounded-md mr-2 flex justify-center items-center ${ remindMe ? 'bg-slate-800' : 'border-gray-300 bg-white'}`}>
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
                            <Link to="/auth/olvide-password" className="text-gray-800 hover:text-gray-950 font-medium leading-5">Olvide mi contraseña</Link>
                        </div>
                        <button
                            type="submit"
                            disabled={ loading }
                            className="uppercase bg-slate-800 hover:bg-slate-900 disabled:bg-slate-600 text-white font-medium rounded-md py-2 flex justify-center"
                        >
                            {
                                loading
                                ?<div className="custom-loader-white"></div>
                                :'Iniciar Sesión'
                            }
                        </button>
                    </form>
                    <div className="text-center pt-8 pb-8 flex justify-center overflow-hidden">
                        <p className="flex items-center gap-2 leading-5
                            before:content-[''] before:h-[1px] before:w-16 sm:before:w-36 before:bg-slate-600 
                            after:content-[''] after:h-[1px] after:w-16 sm:after:w-36 after:bg-slate-600"
                        >
                            O inicia sesión con
                        </p>
                    </div>
                    <div className="flex justify-center gap-3">
                        <button 
                            className="border rounded-md px-2 py-1 hover:bg-slate-800 hover:text-white transition-all duration-300"
                            onClick={()=> showNotify('Funcionalidad en construcción', 'error')}
                        >
                            <i className='bx bxl-facebook text-2xl'></i>
                        </button>
                        {/* <button 
                            className="border rounded-md px-2 py-1 hover:bg-slate-800 hover:text-white transition-all duration-300"
                            onClick={()=> showNotify('Funcionalidad en construcción', 'error')}
                        >
                            <i className='bx bxl-google text-2xl'></i>
                        </button> */}
                        <GoogleLoginButton 
                            loading={ loading }
                            setLoading={ setLoading }
                            remindMe={ remindMe }
                        />
                        <button 
                            className="border rounded-md px-2 py-1 hover:bg-slate-800 hover:text-white transition-all duration-300"
                            onClick={()=> showNotify('Funcionalidad en construcción', 'error')}
                        >
                            <i className='bx bxl-github text-2xl'></i>
                        </button>
                    </div>
                    <div className="flex justify-center items-center gap-1 mt-7">
                        <span className="inline-block leading-5 text-slate-700">¿Aun no tienes una cuenta?</span>
                        <Link to="/auth/registrar" className="font-semibold text-slate-700 hover:text-slate-950">Registrate</Link>
                    </div>
                </div>
            </section>
        </>
    )
}
