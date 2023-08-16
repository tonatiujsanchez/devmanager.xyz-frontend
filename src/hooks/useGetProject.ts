import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'

import { isAxiosError } from 'axios'
import { clientAxios } from '../config'

import { IAppDispatch, IRootState } from '../store/store'
import { IDataState, startGetTasks} from '../store/data'

import { IProject } from '../interfaces'


export const useGetProject = ( id:string ) => {
    
    const [loading, setLoading] = useState(true)
    const [project, setProject] = useState<IProject>()
    
    const { projects:{ projects } }:IDataState = useSelector((state:IRootState)=> state.data)
    const dispatch:IAppDispatch = useDispatch()

    
    const getProject = async() => {
        
        const projectFind = projects.find( project => project._id === id ) 
    
        if( projectFind && !projectFind.tasks ){
            dispatch( startGetTasks({ id, page:1, count: 15 }) )
        }

        if( projectFind ){
            setProject( projectFind )
            return setLoading(false)
        }
    
        try {
            const [{ data }, {data: tasks}] = await Promise.all([
                clientAxios.get(`/projects/${id}`),
                clientAxios.get(`/projects/tasks/${id}?page=1&count=15`)
            ])

            setProject({...data, tasks})
            setLoading(false)
        } catch (error) {
            if(isAxiosError(error)){
                const { msg } = error.response?.data as { msg: string }
                console.log({msg});
            } 
            setLoading(false)
        }
    }
    
    useEffect(()=>{
        getProject()
    },[id])


    return {
        project,
        loading
    }
}
