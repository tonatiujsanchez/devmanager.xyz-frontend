
export const NewPasswordPage = () => {

    return (
        <section className="px-4">
            <div className="bg-white px-5 sm:px-12 pt-10 pb-8 rounded-lg shadow">
                <h1 className="text-3xl font-extrabold text-center uppercase mb-2">Nueva Contraseña</h1>
                <p className="max-w-[500px] mb-7 text-center">Ingrese su nueva contraseña y presione en guardar</p>
                <form className="flex flex-col gap-4">
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
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="uppercase bg-slate-800 hover:bg-slate-900 text-white font-medium rounded-md py-2 mt-2"
                    >
                        Guardar
                    </button>
                </form>

            </div>
        </section>
    )
}
