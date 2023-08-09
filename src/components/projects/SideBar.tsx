import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import { startLogout } from "../../store/auth"
import { IAppDispatch, IRootState } from "../../store/store"
import { IUiState } from "../../store/ui"

export const SideBar = () => {

    const dispatch:IAppDispatch = useDispatch()
    const { toggleSideMenu }: IUiState = useSelector(( state: IRootState ) => state.ui)

    return (
        <div className={`h-screen py-4 px-1 bg-slate-800 transition-all duration-500 overflow-hidden ${toggleSideMenu ? 'w-[300px]':'w-[60px]'}`}>
            
            <nav className={`absolute top-0 bottom-0 h-full group flex flex-col bg-slate-800 py-4 px-1 shadow-lg transition-all duration-500 overflow-hidden ${toggleSideMenu ? 'w-[240px]':'w-[60px] hover:w-[250px]'}`}>
                <Link 
                    to={"/projects"} 
                    className="flex gap-5 text-white text-lg p-2 rounded-md"
                >
                    ⚡ <span className={`min-w-[150px] transition-all duration-500 ${ toggleSideMenu ? 'opacity-100':'opacity-0 group-hover:opacity-100'}`}>UpTask</span>
                </Link>
                <ul className="flex-1 mt-16 flex flex-col gap-1">
                    <li>
                        <Link 
                            to={"/projects"} 
                            className="flex items-center gap-5 text-white px-4 py-2 rounded-md hover:bg-slate-700"
                        >
                            <i className="bx bxs-plus-square text-lg text-slate-400"></i> 
                            <span className={`min-w-[150px] transition-all duration-500 ${ toggleSideMenu ? 'opacity-100':'opacity-0 group-hover:opacity-100'}`}>Nuevo proyecto</span>
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to={"/projects"} 
                            className="flex items-center gap-5 text-white px-4 py-2 rounded-md hover:bg-slate-700"
                        >
                            <i className="bx bxs-food-menu text-lg text-slate-400"></i>
                            <span className={`min-w-[150px] transition-all duration-500 ${ toggleSideMenu ? 'opacity-100':'opacity-0 group-hover:opacity-100'}`}>Proyectos</span>
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to={"/projects"} 
                            className="flex items-center gap-5 text-white px-4 py-2 rounded-md hover:bg-slate-700"
                        >
                            <i className='bx bxs-user text-lg text-slate-400'></i>
                            <span className={`min-w-[150px] transition-all duration-500 ${ toggleSideMenu ? 'opacity-100':'opacity-0 group-hover:opacity-100'}`}>Colaboradores</span>
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to={"/projects"} 
                            className="flex items-center gap-5 text-white px-4 py-2 rounded-md hover:bg-slate-700"
                        >
                            <i className='bx bxs-search text-lg text-slate-400'></i>
                            <span className={`min-w-[150px] transition-all duration-500 ${ toggleSideMenu ? 'opacity-100':'opacity-0 group-hover:opacity-100'}`}>Buscar proyecto</span>
                        </Link>
                    </li>
                </ul>
                <div className="border-t border-t-slate-700 py-2">
                    <button
                        onClick={ ()=> dispatch( startLogout() ) } 
                        className="flex items-center gap-5 text-white px-4 py-2 rounded-md hover:bg-slate-700 mb-5"
                    >
                        <i className='bx bx-log-out text-lg'></i>
                        <span className={`text-left min-w-[150px] transition-all duration-500 ${ toggleSideMenu ? 'opacity-100':'opacity-0 group-hover:opacity-100'}`}>
                            Cerrar Sesión
                        </span>
                    </button>
                </div>
            </nav>
        </div>
    )
}
