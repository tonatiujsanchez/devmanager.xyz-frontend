import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'

import { isAxiosError } from 'axios'
import { clientAxios } from '../config'

import { IAppDispatch, IRootState } from '../store/store'
import { IDataState, startSetProjectActive, startGetTasks, startCleanProjectActive} from '../store/data'

export const useGetProject = ( id:string ) => {
    
    const [loading, setLoading] = useState<boolean>(true)
    const [loadingTasks, setLoadingTasks] = useState<boolean>(true)
    
    const { projects:{ projects }, projectActive }:IDataState = useSelector((state:IRootState)=> state.data)
    const dispatch:IAppDispatch = useDispatch()

    
    const getProject = async() => {
        
        const projectFind = projects.find( project => project._id === id ) 
    
        if( projectFind && !projectFind.tasks ){
            
            dispatch(startSetProjectActive({ project: projectFind}))
            setLoading(false)

            await dispatch( startGetTasks({ id, page:1 }) )
            return setLoadingTasks(false)
        }

        if( projectFind ){
            dispatch(startSetProjectActive({ project: projectFind}))
            setLoading(false)
            return setLoadingTasks(false)
        }
    
        try {
            const [{ data }, {data: tasks}] = await Promise.all([
                clientAxios.get(`/projects/${id}`),
                clientAxios.get(`/projects/tasks/${id}?page=1&count=15`)
            ])

            const project = { ...data, tasks }
            
            dispatch( startSetProjectActive({ project }) )
            setLoading(false)
            setLoadingTasks(false)

        } catch (error) {
            if(isAxiosError(error)){
                const { msg } = error.response?.data as { msg: string }
                console.log({msg});
            } 
            setLoadingTasks(false)
            setLoading(false)
        }
    }
    
    useEffect(()=>{
        getProject()

        return () => {
            dispatch(startCleanProjectActive())
        }
    },[id])


    return {
        project: projectActive,
        loading,
        loadingTasks
    }
}
