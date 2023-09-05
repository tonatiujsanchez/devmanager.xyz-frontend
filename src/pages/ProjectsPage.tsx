import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import queryString from 'query-string'

import { IAppDispatch, IRootState } from '../store/store'
import { IDataState, startRefreshProjects, startRefreshProjectsCollaborative } from '../store/data'

import { ProjectSection } from '../components'


interface IQueryParams {
    page?:string
    collaborativePage?:string
}

export const ProjectsPage = () => {

    const { projects, projectsCollaborative }: IDataState = useSelector(( state: IRootState ) => state.data)

    const navigate = useNavigate()
    const dispatch:IAppDispatch = useDispatch()
    const { page, collaborativePage } = queryString.parse(location.search) as IQueryParams


    
    useEffect(()=>{

        if( projects.page > 0 && projects.projects.length > 0 ){
            navigate(`?page=${projects.page}`)
        }
        if( projectsCollaborative.page > 0 && projectsCollaborative.projects.length > 0 ){
            navigate(`?page=${projects.page}&collaborativePage=${projectsCollaborative.page}`)
        }
    },[projects, projectsCollaborative])


    const loadProjects = async( newPage:number ) => {
        await dispatch( startRefreshProjects({ page:newPage }) )
    }

    const loadProjectsCollaborative = async( newPage:number ) => {
        await dispatch( startRefreshProjectsCollaborative({ page:newPage }) )
    }

    return (
        <>
            <div className="mb-5">
                <h1 className="font-bold text-slate-800 text-2xl sm:text-3xl">Proyectos</h1>
            </div>
            <div className="flex flex-col gap-10">
                <ProjectSection
                    title="Mis proyectos"
                    showBtnAdd
                    projects={ projects }
                    page={page}
                    loadProjects={ loadProjects }
                />
                <ProjectSection
                    title="En colaboración"
                    projects={ projectsCollaborative }
                    page={collaborativePage}
                    loadProjects={ loadProjectsCollaborative }
                />
            </div>
        </>
    )
}
