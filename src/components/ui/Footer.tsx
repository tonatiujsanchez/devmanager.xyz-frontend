import { Link } from "react-router-dom"
import { XSocialIcon } from "../icons"

export const Footer = () => {
    return (
        <footer className="bg-slate-900 px-5">
            <div className="container text-white grid sm:grid-cols-2 lg:grid-cols-4 py-10 md:py-16 gap-y-12 gap-x-12">
                <div className="flex flex-col justify-start">
                    <Link 
                        to={"/"} 
                        className="flex gap-2 mb-4"
                    >
                        <img 
                            src="/devmanager-logo.svg" 
                            alt="Logo de DevManager"
                            className="w-9"
                        />
                        <span className={`transition-all duration-500 text-[1.2rem] font-light text-white`} >
                            <strong className="font-semibold">Dev</strong>Manager
                        </span>
                    </Link>
                    <p className="font-light max-w-[16rem]">¡Gestiona Proyectos con Colaboradores en Tiempo Real!</p>
                </div>
                <div className="flex flex-col">
                    <p className="mb-4 font-semibold">Contenido</p>
                    <div className="flex flex-col gap-3 font-normal">
                        <a 
                            href="#" 
                            className="font-light hover:underline"
                        >
                            Inicio
                        </a>
                        <a
                            href="#producto" 
                            className="font-light hover:underline"
                        >
                            Producto
                        </a>
                        <a
                            href="#soporte" 
                            className="font-light hover:underline"
                        >
                            Soporte
                        </a>
                        <Link
                            to={'/auth/login'} 
                            className="font-light hover:underline"
                        >
                            Iniciar Sesión
                        </Link>
                        <Link
                            to={'/auth/registrar'} 
                            className="font-light hover:underline"
                        >
                            Registrarme
                        </Link>
                    </div>
                </div>
                <div>
                    <p className="mb-4 font-semibold">Legal</p>
                    <div className="flex flex-col gap-3 font-normal">
                        <a 
                            href="#" 
                            className="font-light hover:underline"
                        >
                            Política de privacidad
                        </a>
                        <a
                            href="#" 
                            className="font-light hover:underline"
                        >
                            Términos
                        </a>
                    </div>
                </div>
                <div>
                    <p className="mb-4 font-semibold">Contacto</p>
                    <p className="font-light mb-4 max-w-[16rem]">¿Necesitas algo? Ponte en contacto con nosotros.</p>
                    <div className="flex items-center gap-2">
                        <a
                            href="https://linkedin.com/in/tonatiujsanchez"
                            target="_blank" 
                            className="flex justify-center items-center w-10 h-10 rounded-full bg-slate-700 hover:text-slate-700 hover:bg-amber-400 text-xl"
                        >
                            <i className='bx bxl-linkedin-square' ></i>
                        </a>
                        <a
                            href="https://twitter.com/tonatiujsanchez"
                            target="_blank" 
                            className="flex justify-center items-center w-10 h-10 rounded-full bg-slate-700 hover:text-slate-700 hover:bg-amber-400 text-xl p-3"
                        >
                            <XSocialIcon />
                        </a>
                        <a
                            href="https://instagram.com/tonatiujsanchez/"
                            target="_blank" 
                            className="flex justify-center items-center w-10 h-10 rounded-full bg-slate-700 hover:text-slate-700 hover:bg-amber-400 text-xl"
                        >
                            <i className='bx bxl-instagram'></i>
                        </a>
                        <a
                            href="https://github.com/tonatiujsanchez"
                            target="_blank" 
                            className="flex justify-center items-center w-10 h-10 rounded-full bg-slate-700 hover:text-slate-700 hover:bg-amber-400 text-xl"
                        >
                            <i className='bx bxl-github' ></i>
                        </a>
                    </div>
                </div>
            </div>
            <div className="text-slate-100 text-center text-sm border-t-1 border-t-slate-600 py-4">
                <p>© { new Date().getFullYear() } DevManager.xyz</p>
            </div>
        </footer>
    )
}
