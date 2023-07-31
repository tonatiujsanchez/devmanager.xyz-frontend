import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'

import { useForm } from 'react-hook-form'
import { isAxiosError } from 'axios'

import { clientAxios } from '../config'
import { LoadingMain } from '../components'


interface Alert {
    title: string
    type: 'error' | 'success'
}

interface FormData {
    password : string
    passwordConfirm: string
}

export const NewPasswordPage = () => {

    const [loading, setLoading] = useState(true)
    const [savingNewPassword, setSavingNewPassword] = useState(false)
    const [alert, setAlert] = useState<Alert>()
    const [msg, setMsg] = useState<string>()


    const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>({
        defaultValues: {
            password: '',
            passwordConfirm:'',
        }
    })

    const password = useRef({})
    password.current = watch('password', '')


    const { token } =  useParams()
    const navigate = useNavigate()


    const checkToken = async() => {
        try {
            await clientAxios.get(`/users/change-password/${token}`)
            setLoading(false)
        } catch (error) {
            navigate('/', { replace: true })
        }
    }

    useEffect(() => {
        checkToken()
    }, [])



    const onSaveNewPassword = async( password:string ) => {
        try {
            const { data } = await clientAxios.post(`/users/change-password/${token}`,{
                password
            })
            setMsg(data.msg)

        } catch (error) {
            if(isAxiosError(error)){
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



    const onSavePasswordSubmit = async({ password }: FormData ) => {
        setSavingNewPassword(true)
        await onSaveNewPassword( password )
        setSavingNewPassword(false)
    }


    if(loading){
        return (
            <div className="h-screen flex justify-center items-center">
                <LoadingMain />
            </div>
        )
    }

    if(msg){
        return (
            <section className="px-4 animate-jump animate-duration-200 animate-ease-linear">
                <div className="bg-white px-9 pt-10 pb-8 rounded-lg shadow">
                    <h1 className="text-3xl font-extrabold text-center uppercase mb-5">Contraseña Actualizada</h1>
                    <p className="max-w-[500px] mb-7 text-center">{ msg }</p>
                    <div className="flex justify-center gap-1 mt-10">
                        <Link to="/" className="font-medium text-slate-700 hover:text-slate-950">Iniciar Sesion</Link>
                    </div>
                </div>
            </section>
        )
    }

    return (
        <section className="px-4 animate-fade">
            <div className="relative bg-white px-5 sm:px-12 pt-10 pb-10 rounded-lg shadow">
                {
                    alert &&
                    <div className="absolute -top-5 left-0 right-0 w-full shadow-lg flex justify-center p-4 mb-4 text-sm border border-red-400 text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800 animate-jump animate-duration-200 animate-ease-linear" role="alert">
                        <svg aria-hidden="true" className="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
                        <span>
                            { alert.title }
                        </span>
                    </div>
                }
                <h1 className="text-3xl font-extrabold text-center uppercase mb-2">Nueva Contraseña</h1>
                <p className="max-w-[500px] mb-7 text-center">Ingrese su nueva contraseña y presione en guardar</p>
                <form 
                    onSubmit={ handleSubmit( onSavePasswordSubmit ) }
                    className="flex flex-col gap-4"
                >
                    <div>
                        <label
                            htmlFor="password"
                            className="block mb-1 font-semibold"
                        >
                            Nueva Contraseña
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
                            <span className="block text-sm text-red-600 mt-1 animate-fade-down animate-duration-100">{errors.password.message}</span>
                        }
                    </div>
                    <div>
                        <label
                            htmlFor="passwordConfirm"
                            className="block mb-1 font-semibold"
                        >
                            Confirmar Nueva Contraseña
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
                            <span className="block text-sm text-red-600 mt-1 animate-fade-down animate-duration-100">{errors.passwordConfirm.message}</span>
                        }
                    </div>
                    <button
                        type="submit"
                        disabled={savingNewPassword}
                        className="uppercase bg-slate-800 hover:bg-slate-900 text-white font-medium rounded-md py-2 mt-2 flex justify-center"
                    >
                        {
                            savingNewPassword
                            ?<div className="custom-loader-white"></div>
                            :'Guardar'
                        }
                    </button>
                </form>

            </div>
        </section>
    )
}
