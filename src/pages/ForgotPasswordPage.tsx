import { useState } from 'react'
import { Link } from 'react-router-dom'

import { useForm } from 'react-hook-form'

import { validators } from '../helpers'



interface FormData {
    email    : string
}

export const ForgotPasswordPage = () => {

    const [loading, setLoading] = useState(false)

    const { register, handleSubmit } = useForm<FormData>({
        defaultValues: {
            email: ''
        }
    })

    const onSendSubmit = ( data: FormData ) => {
        setLoading(true)
        console.log(data)
        setLoading(false)
    }

    return (
        <section className="px-4">
            <div className="bg-white px-9 pt-10 pb-8 rounded-lg shadow">
                <h1 className="text-3xl font-extrabold text-center uppercase mb-2">Recuperar Contraseña</h1>
                <p className="max-w-[500px] mb-7 text-center">Ingrese su correo y enviaremos las instrucciones para restablecer su contraseña</p>
                <form
                    onSubmit={ handleSubmit(onSendSubmit) } 
                    className="flex flex-col gap-6"
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
                    </div>

                    <button
                        type="submit"
                        disabled={ loading }
                        className="uppercase bg-slate-800 hover:bg-slate-900 text-white font-medium rounded-md py-2"
                    >
                        Enviar
                    </button>
                </form>
                
                
                <div className="flex justify-between items-center gap-1 mt-10">
                    <Link 
                        to="/" 
                        className="font-medium text-slate-700 hover:text-slate-950"
                    >
                        Iniciar Sesion
                    </Link>
                    <Link 
                        to="/registrar" 
                        className="font-medium text-slate-700 hover:text-slate-950"
                    >
                        Registrate
                    </Link>
                </div>
            </div>
        </section>
    )
}
