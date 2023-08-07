import { Link } from "react-router-dom"

export const SideBar = () => {
    return (
        <nav className="h-screen flex flex-col bg-slate-800 w-[300px] py-4 px-3 shadow">
            <Link 
                to={"/projects"} 
                className="block text-white text-lg p-2 rounded-md"
            >
                ⚡ UpTask
            </Link>
            <ul className="flex-1 mt-16 flex flex-col gap-1">
                <li>
                    <Link 
                        to={"/projects"} 
                        className="flex items-center gap-3 text-white px-4 py-2 rounded-md hover:bg-slate-700"
                    >
                        <i className="bx bxs-plus-square text-lg text-slate-400"></i> Nuevo proyecto
                    </Link>
                </li>
                <li>
                    <Link 
                        to={"/projects"} 
                        className="flex items-center gap-3 text-white px-4 py-2 rounded-md hover:bg-slate-700"
                    >
                        <i className="bx bxs-food-menu text-lg text-slate-400"></i> Proyectos
                    </Link>
                </li>
                <li>
                    <Link 
                        to={"/projects"} 
                        className="flex items-center gap-3 text-white px-4 py-2 rounded-md hover:bg-slate-700"
                    >
                        <i className='bx bxs-user text-lg text-slate-400'></i> Colaboradores
                    </Link>
                </li>
                <li>
                    <Link 
                        to={"/projects"} 
                        className="flex items-center gap-3 text-white px-4 py-2 rounded-md hover:bg-slate-700"
                    >
                        <i className='bx bxs-search text-lg text-slate-400'></i> Buscar proyecto
                    </Link>
                </li>
            </ul>
            <div className="border-t border-t-slate-700 py-2">
                <button className="flex items-center gap-3 w-full text-white px-4 py-2 rounded-md hover:bg-slate-700 mb-5">
                    <i className='bx bx-log-out' ></i>
                    Cerrar Sesión
                </button>
            </div>
        </nav>
    )
}
