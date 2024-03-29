import { Link, useLocation } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import isMobile from "is-mobile"

import { startLogout } from "../../store/auth"
import { IAppDispatch, IRootState } from "../../store/store"
import { IUiState, startHideSideMenu, startShowSearcher, startToggleSideMenu } from "../../store/ui"

export const SideBar = () => {

    const dispatch:IAppDispatch = useDispatch()
    const { toggleSideMenu }: IUiState = useSelector(( state: IRootState ) => state.ui)

    const { pathname } = useLocation()
    const isOpenOnMobile = isMobile()

    const onShowSearcher = () => {
        dispatch( startShowSearcher() )
        if( isOpenOnMobile ){
            dispatch( startHideSideMenu() )
        }
    }
    
    return (
        <>
            <div className={`relative z-30 min-h-screen ${toggleSideMenu ? 'translate-x-0 sm:min-w-[240px]':' -translate-x-full sm:translate-x-0 sm:w-[60px]'}`}></div>

            <div className={`fixed left-0 top-0 bottom-0 z-30 min-h-screen py-4 bg-slate-800 transition-all duration-500 ${toggleSideMenu ? 'w-[260px] translate-x-0 sm:w-[240px]':'w-[270px] -translate-x-full sm:translate-x-0 sm:w-[60px]'} animate-fade`}>
                
                <nav className={`fixed top-0 bottom-0 h-full group flex flex-col bg-slate-800 py-4 px-1 transition-all duration-500 overflow-hidden z-40 ${toggleSideMenu ? 'sm:w-[240px]':'w-[252px] sm:w-[60px] sm:hover:w-[240px]'}`}>
                    <div className="flex items-center gap-2">
                        <Link 
                            to={"/proyectos"} 
                            className="flex gap-2 text-white text-lg p-2 rounded-md"
                        >
                            <img 
                                src="/devmanager-logo.svg" 
                                alt="Logo de DevManager"
                                className="w-5"
                            />
                            <span className={`min-w-[150px] transition-all duration-500 text-[1.1rem] font-light ${ toggleSideMenu ? 'opacity-100':'sm:opacity-0 group-hover:opacity-100'}`}><strong className="font-semibold">Dev</strong>Manager</span>
                        </Link>
                        <button
                            onClick={ ()=> dispatch( startToggleSideMenu() ) } 
                            className="flex sm:hidden justify-center items-center bg-slate-700 hover:bg-slate-600 rounded-md px-1 active:scale-95"
                        >
                            <i className='bx bx-x text-2xl'></i>
                        </button>
                    </div>
                    <ul className="flex-1 mt-16 flex flex-col gap-1">
                        <li>
                            <Link 
                                to={"/proyectos/nuevo-proyecto"} 
                                className={`flex items-center gap-5 text-white px-4 py-2 rounded-md hover:bg-slate-700 ${ pathname === '/proyectos/nuevo-proyecto' ? 'bg-slate-700':'' }`}
                            >
                                <i className="bx bxs-plus-square text-lg text-slate-400"></i> 
                                <span className={`min-w-[150px] transition-all duration-500 ${ toggleSideMenu ? 'opacity-100':'sm:opacity-0 group-hover:opacity-100'}`}>Nuevo proyecto</span>
                            </Link>
                        </li>
                        <li>
                            <Link 
                                to={"/proyectos"} 
                                className={`flex items-center gap-5 text-white px-4 py-2 rounded-md hover:bg-slate-700 ${ pathname === '/proyectos' ? 'bg-slate-700':'' }`}
                            >
                                <i className="bx bxs-food-menu text-lg text-slate-400"></i>
                                <span className={`min-w-[150px] transition-all duration-500 ${ toggleSideMenu ? 'opacity-100':'sm:opacity-0 group-hover:opacity-100'}`}>Proyectos</span>
                            </Link>
                        </li>
                        <li>
                            <button 
                                onClick={ onShowSearcher }
                                className="w-full flex items-center gap-5 text-white px-4 py-2 rounded-md hover:bg-slate-700"
                            >
                                <i className='bx bxs-search text-lg text-slate-400'></i>
                                <span className={`w-auto transition-all duration-500 ${ toggleSideMenu ? 'opacity-100':'sm:opacity-0 group-hover:opacity-100'}`}>Buscar proyecto</span>
                            </button>
                        </li>
                    </ul>
                    <div className="border-t border-t-slate-700 py-2">
                        <button
                            onClick={ ()=> dispatch( startLogout() ) } 
                            className="flex items-center w-full gap-5 text-white px-4 py-2 rounded-md hover:bg-slate-700 mb-2"
                        >
                            <i className='bx bx-log-out text-lg'></i>
                            <span className={`text-left min-w-[150px] transition-all duration-500 ${ toggleSideMenu ? 'opacity-100':'sm:opacity-0 group-hover:opacity-100'}`}>
                                Cerrar Sesión
                            </span>
                        </button>
                    </div>
                </nav>
            </div>

        </>
    )
}
