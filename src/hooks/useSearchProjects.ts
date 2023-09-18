import { useState, useEffect, useRef } from 'react';

import { IProject } from '../interfaces'
import { useData } from '.'



export const useSearchProjects = (searchTerm:string) => {

    console.log({searchTerm})
    
    
    const [milliseconds, setMilliseconds] = useState<number>(0)
    const [loading, setLoading] = useState(false)
    const [filteredProjects, setSetFilteredProjects] = useState<IProject[]>([])

    const ref = useRef<number>()

    const { projects:{ projects }, projectsCollaborative } = useData()


    const onSearchProject = async() => {

        setLoading(true)
        const results = projects.filter( project => {
            if( project.name.toLowerCase().includes( searchTerm.toLowerCase() ) ){
               return project 
            }
        })
        const resultsCollaborative = projectsCollaborative.projects.filter( project => {
            if( project.name.toLowerCase().includes( searchTerm.toLowerCase() ) ){
               return project 
            }
        })
        
        setTimeout(() => {
            setSetFilteredProjects([...results, ...resultsCollaborative])
            setLoading(false)
        }, 1000);
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
        console.log({milliseconds})
        
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
