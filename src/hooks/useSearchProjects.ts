import { useState, useEffect, useRef } from 'react'

import { isAxiosError } from 'axios'
import { clientAxios } from '../config'

import { showNotify } from '../helpers'
import { IProject } from '../interfaces'



export const useSearchProjects = (searchTerm:string) => {

    const [milliseconds, setMilliseconds] = useState<number>(0)
    const [loading, setLoading] = useState(false)
    const [filteredProjects, setSetFilteredProjects] = useState<IProject[]>([])

    const ref = useRef<number>()


    const onSearchProject = async() => {
        setLoading(true)
        try {
            const { data } = await clientAxios.post('/projects/search', { searchTerm })
            setSetFilteredProjects(data)
            setLoading(false)
        } catch (error) {
            if(isAxiosError(error)){
                const { msg } = error.response?.data as { msg: string }
                showNotify(msg, 'error')
            }
            setLoading(false)
        }
    }

    const onStartInterval = () => {
        ref.current && clearInterval( ref.current )
        setMilliseconds(200)
    
        ref.current = setInterval(() => {
            setMilliseconds( s => s - 1 )
        }, 1)   
    }
    
    useEffect(() => {
        onStartInterval()
        return ()=>{
            clearInterval( ref.current )
        } 
    }, [searchTerm])
    

    useEffect(() => {        
        if( milliseconds <= 0 ){
            clearInterval( ref.current )
            
            if( searchTerm.trim() === '' ){
                return setSetFilteredProjects([])
            }else {
                onSearchProject()
            }
        }
    }, [milliseconds])
    
    
    return {
        projects:filteredProjects,
        loading,
        activeTimer: milliseconds > 0
    }
}
