import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import queryString from 'query-string'

import { IDataState, startRefreshNotes } from '../store/data'
import { IAppDispatch, IRootState } from '../store/store'

import { LoadingMain, ProjectList } from '../components'


export const ProjectsPage = () => {

    const [loading, setLoading] = useState(false)

    const dispatch:IAppDispatch = useDispatch()
    const { projects }: IDataState = useSelector(( state: IRootState ) => state.data)

    const location = useLocation()
    const { page, count } = queryString.parse(location.search)
    
    const getProjects = async() => {
        
        let pageNum = 1
        let countNum = 10

        if( page || Number(page) > 1 ){
            pageNum = Number(page)
        }

        if( count && Number(count) >= 1 ){
            countNum = Number(count)
        }
        setLoading(true)
        await dispatch( startRefreshNotes({ page:pageNum, count: countNum }) )
        setLoading(false)
    }


    useEffect(()=>{
        if(projects.projects.length === 0){
            getProjects()
        }
    },[])



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
                    <section>
                        <ProjectList projects={ projects.projects } />
                    </section>
                )
            }
        </>
    )
}
