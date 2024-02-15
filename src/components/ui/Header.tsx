import { Link, useNavigate } from 'react-router-dom'
import { useCheckAuth } from '../../hooks'
import { AuthStatus } from '../../store/auth'

export const Header = () => {

    const { status, name } = useCheckAuth()
    const navigate = useNavigate()

    const navigateToHome = () => {
        navigate('/')
        window.scrollTo(0, 0)
    }
    

    return (
        <header className="bg-slate-100 sticky top-0 z-10">
            <nav className="container flex justify-between items-center px-3 md:px-5 py-2 md:py-4">
                <button 
                    onClick={ navigateToHome } 
                    className="flex gap-2 text-lg"
                >
                    <img 
                        src="/devmanager-logo.svg" 
                        alt="Logo de DevManager"
                        className="w-5 md:w-8"
                    />
                    <span className={`min-w-[150px] transition-all duration-500 md:text-[1.5rem] font-light text-slate-800`}>
                        <strong className="font-semibold">Dev</strong>Manager
                    </span>
                </button>
                {
                    status === AuthStatus.Checking
                    ?(
                        <div className="animate-pulse h-6 my-[0.4rem] w-20 bg-slate-300 rounded"></div>
                    ):(
                        status === AuthStatus.NotAuthenticated 
                        ? (
                            <Link 
                                to={'/auth/login'}
                                className="bg-amber-300 hover:bg-amber-400 text-slate-800 inline-flex items-center gap-2 font-medium px-4 py-2 rounded-md animate-fade animate-once"
                            > 
                                Iniciar Sesión 
                            </Link>
                        ):(
                            <Link
                                to={'/proyectos'} 
                                className="flex items-center gap-2 font-semibold animate-fade animate-once"
                            >
                                { name }
                                <span className="bg-slate-700 text-slate-100 w-9 h-9 flex justify-center items-center rounded-full">
                                { name?.slice(0, 1) }
                                </span>
                            </Link>
                        )
                    )
                }
            </nav>
        </header>
    )
}
