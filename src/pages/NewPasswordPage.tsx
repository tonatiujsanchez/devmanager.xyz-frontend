import { useRef, useState } from 'react';
import { useForm } from "react-hook-form"


interface FormData {
    password : string
    passwordConfirm: string
}

export const NewPasswordPage = () => {

    const [loading, setLoading] = useState(false)

    const { register, handleSubmit, watch } = useForm<FormData>({
        defaultValues: {
            password: '',
            passwordConfirm:'',
        }
    })

    const password = useRef({})
    password.current = watch('password', '')


    const onSaveNewPassword = ( data: FormData ) => {
        setLoading(true)
        console.log( data )
        setLoading(false)
    }


    return (
        <section className="px-4">
            <div className="bg-white px-5 sm:px-12 pt-10 pb-8 rounded-lg shadow">
                <h1 className="text-3xl font-extrabold text-center uppercase mb-2">Nueva Contraseña</h1>
                <p className="max-w-[500px] mb-7 text-center">Ingrese su nueva contraseña y presione en guardar</p>
                <form 
                    onSubmit={ handleSubmit( onSaveNewPassword ) }
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
                                        minLength: { value: 6, message: 'Se requieren minimo 6 caracteres' },
                                        validate: value => value !== password.current ? 'Las contraseñas no son iguales' : undefined 
                                    })                                
                                }
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="uppercase bg-slate-800 hover:bg-slate-900 text-white font-medium rounded-md py-2 mt-2"
                    >
                        Guardar
                    </button>
                </form>

            </div>
        </section>
    )
}
