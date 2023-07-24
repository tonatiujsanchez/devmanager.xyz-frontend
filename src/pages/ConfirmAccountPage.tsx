import { Link } from 'react-router-dom'

export const ConfirmAccountPage = () => {
    return (
        <section className="px-4">
            <div className="bg-white px-9 pt-10 pb-8 rounded-lg shadow">
                <h1 className="text-3xl font-extrabold text-center uppercase mb-2">Cuenta Confirmada</h1>
                <p className="max-w-[500px] mb-7 text-center">Su cuenta ha sido confirmada correctamente, inicie sesión y comience a administar sus proyectos</p>
                <div className="flex justify-center gap-1 mt-10">
                    <Link to="/" className="font-medium text-slate-700 hover:text-slate-950">Iniciar Sesion</Link>
                </div>
            </div>
        </section>
    )
}
