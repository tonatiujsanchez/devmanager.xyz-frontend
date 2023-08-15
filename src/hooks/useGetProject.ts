import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'

import { isAxiosError } from 'axios'
import { clientAxios } from '../config'

import { IRootState } from '../store/store'
import { IDataState } from '../store/data'

import { IProject } from '../interfaces'


export const useGetProject = ( id:string ) => {
    
    const [loading, setLoading] = useState(true)
    const [project, setProject] = useState<IProject>()
    
    const { projects:{ projects } }:IDataState = useSelector((state:IRootState)=> state.data)

    
    const getProject = async() => {
        
        const projectFind = projects.find( project => project._id === id ) 
    
        if( projectFind ){
            setProject( projectFind )
            return setLoading(false)
        }
    
        try {
            const { data } = await clientAxios.get(`/projects/${id}`)
            console.log(data)
            
            setProject(data)
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
