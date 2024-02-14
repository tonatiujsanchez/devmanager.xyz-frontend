import { Link } from 'react-router-dom'

export const Header = () => {
    return (
        <header className="container flex justify-between items-center px-3 md:px-5 py-2 md:py-5">
            <Link 
                to={"/"} 
                className="flex gap-2 text-lg p-2 rounded-md"
            >
                <img 
                    src="/devmanager-logo.svg" 
                    alt="Logo de DevManager"
                    className="w-5 md:w-8"
                />
                <span className={`min-w-[150px] transition-all duration-500 md:text-[1.5rem] font-light`}>
                    <strong className="font-semibold">Dev</strong>Manager
                </span>
            </Link>
            <Link 
                to={'/auth/iniciar-sesion'}
                className="bg-amber-300 hover:bg-amber-400 text-slate-800 inline-flex items-center gap-2 font-medium px-4 py-2 rounded-md"
            > 
                Iniciar Sesión 
            </Link>
        </header>
    )
}
