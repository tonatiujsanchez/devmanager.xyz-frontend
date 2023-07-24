import { Link } from 'react-router-dom'


export const RegisterPage = () => {
    return (
        <section className="px-4">
            <div className="bg-white px-9 pt-10 pb-8 rounded-lg shadow">
                <h1 className="text-3xl mb-8 font-extrabold text-center uppercase">Crear Cuenta</h1>
                <form className="flex flex-col gap-4">
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
                            />
                        </div>
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
                                placeholder="correo@email.com"
                                className="border px-3 py-2 rounded-tr-md rounded-br-md flex-1"
                            />
                        </div>
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
                            />
                        </div>
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
                            />
                        </div>
                    </div>
                    <div className="flex justify-between gap-5 mt-2 mb-3">
                        <div>
                            <input
                                type="checkbox"
                                id="myCheckbox"
                                // disabled={loading}
                                // checked={getValues('receivePromotions')}
                                // onChange={handleCheckboxChange}
                                className="hidden"
                            />
                            <label
                                htmlFor="myCheckbox"
                                className={`flex items-center select-none ${'true'.trim() === '' ? '' : 'cursor-pointer'}`}
                            >
                                <div className={`w-5 h-5 border border-gray-300 rounded-md mr-2 flex justify-center items-center ${'true'.trim() === '' ? 'bg-slate-800' : 'border-gray-300 bg-white'}`}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        style={{ fill: '#fff' }}
                                        className={'block'}
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
