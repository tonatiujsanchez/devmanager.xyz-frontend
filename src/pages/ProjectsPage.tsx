import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import queryString from 'query-string'
import { Pagination } from "@nextui-org/pagination"

import { IDataState, startRefreshProjects } from '../store/data'
import { IAppDispatch, IRootState } from '../store/store'

import { LoadingMain, ProjectList } from '../components'
import { IAuthState } from '../store/auth'


export const ProjectsPage = () => {

    const [loading, setLoading] = useState(false)

    const dispatch:IAppDispatch = useDispatch()
    const { projects }: IDataState = useSelector(( state: IRootState ) => state.data)
    const { _id:idUser }: IAuthState = useSelector(( state: IRootState ) => state.auth)

    const location = useLocation()
    const navigate = useNavigate()
    const { page } = queryString.parse(location.search)
    
    const getProjects = async() => {
        
        if( !idUser ){
            return
        }

        let pageNum = 1

        if( page || Number(page) > 1 ){
            pageNum = Number(page)
        }

        setLoading(true)
        await dispatch( startRefreshProjects({ page:pageNum }) )
        setLoading(false)
    }


    useEffect(()=>{
        if(projects.projects.length === 0){
            getProjects()
        }
    },[projects.page, idUser])

    useEffect(()=>{
        if( projects.page > 0 ){
            navigate(`?page=${projects.page}`)
        }
    },[projects])

    const onPageChange = async(newPage:number) => {
        setLoading(true)
        await dispatch( startRefreshProjects({ page:newPage }) )
        setLoading(false)
    }


    return (
        <>
            <div className="flex items-end gap-1 mb-5">
                <h1 className="font-bold text-slate-800 text-2xl sm:text-3xl">Proyectos</h1>
                <button
                    className="text-sm text-slate-600 hover:bg-slate-200 hover:text-slate-900 py-1 px-2 rounded-full active:scale-95"
                    onClick={ getProjects }
                >
                    <i className='bx bx-revision'></i>
                </button>
            </div>
            <Link
                to={'nuevo-proyecto'} 
                className="bg-amber-300 hover:bg-amber-400 text-slate-800 inline-flex items-center gap-2 font-medium px-4 py-2 rounded-md mb-3 mt-5"
            >
                <i className='bx bx-plus font-bold'></i> Nuevo Proyecto
            </Link>
            {
                loading
                ?(
                    <div className="flex justify-center mt-52">
                        <LoadingMain />
                    </div>  
                ):(
                    <section className="z-0">
                        <ProjectList projects={ projects.projects } />
                        {
                            projects.totalPages > 1 && (
                                <div className="mb-5 sm:mb-10 mt-5 sm:px-5">
                                    <Pagination
                                        total={projects.totalPages}
                                        page={projects.page}
                                        onChange={onPageChange}
                                    />
                                </div>
                            )
                        }
                    </section>
                )
            }
        </>
    )
}
