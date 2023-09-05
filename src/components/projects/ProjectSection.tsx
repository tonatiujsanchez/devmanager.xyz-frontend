import { FC, useEffect, useState } from 'react'
import { Link} from 'react-router-dom'
import { useSelector } from 'react-redux'

import { Pagination } from "@nextui-org/pagination"

import { IRootState } from '../../store/store'
import { IAuthState } from '../../store/auth'

import { LoadingMain, ProjectList } from ".."
import { IProjectsState } from '../../interfaces'



interface Props {
    title: string
    showBtnAdd?: boolean
    projects: IProjectsState,
    page?:string
    loadProjects: (newPage:number) => Promise<void>
}
export const ProjectSection:FC<Props> = ({ title, showBtnAdd, projects, page, loadProjects }) => {

    const [loading, setLoading] = useState(false)

    const { _id:idUser }: IAuthState = useSelector(( state: IRootState ) => state.auth)


    const getProjects = async() => {
        
        if( !idUser ){
            return
        }

        let pageNum = 1

        if( page || Number(page) > 1 ){
            pageNum = Number(page)
        }

        setLoading(true)
        await loadProjects( pageNum )
        setLoading(false)
    }

    useEffect(()=>{
        if(projects.projects.length === 0){
            getProjects()
        }
    },[projects.page, idUser])


    const onPageChange = async(newPage:number) => {
        setLoading(true)
        await loadProjects( newPage )
        setLoading(false)
    }

    return (
        <section>
            <div className="flex justify-between items-center mb-3 mt-5">
                <div className="flex items-end">
                    <h2 className="font-semibold text-slate-800 text-lg">{ title }</h2>
                    <button
                        className="text-sm text-slate-600 hover:bg-slate-200 hover:text-slate-900 py-1 px-2 rounded-full active:scale-95"
                        onClick={ getProjects }
                    >
                        <i className='bx bx-revision'></i>
                    </button>
                </div>
                {
                    showBtnAdd && (
                        <Link
                            to={'nuevo-proyecto'} 
                            className="bg-amber-300 hover:bg-amber-400 text-slate-800 inline-flex items-center gap-2 font-medium px-4 py-2 rounded-md"
                        >
                            <i className='bx bx-plus font-bold'></i> Nuevo Proyecto
                        </Link>
                    )
                }
            </div>
            {                
                loading
                ?(
                    <div className="flex justify-center mt-40">
                        <LoadingMain />
                    </div>  
                ):(
                    <div className="z-0">
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
                    </div>
                )
            }
        </section>
        
    )
}
