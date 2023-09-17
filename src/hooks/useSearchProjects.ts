import { useState, useEffect, useRef } from 'react';

import { IProject } from '../interfaces'
import { useData } from '.'



export const useSearchProjects = (searchTerm:string) => {
    
    const [milliseconds, setMilliseconds] = useState<number>(1000)
    const [loading, setLoading] = useState(false)
    const [filteredProjects, setSetFilteredProjects] = useState<IProject[]>([])

    const ref = useRef<NodeJS.Timer>()

    const { projects:{ projects }, projectsCollaborative } = useData()


    const onSearchProject = async() => {

        if( searchTerm.trim() === '' ){
            return setSetFilteredProjects([])
        }

        // TODO: Hacer la búsqueda a la DB
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
        setSetFilteredProjects([...results, ...resultsCollaborative])
        setLoading(false)
    }
    
    useEffect(() => {
        
        ref.current && clearInterval( ref.current )

        // ref.current = setInterval(() => {
        //     setMilliseconds( s => s - 1 )
        // }, 1)
            
        return ()=>{
            clearInterval( ref.current )
        }      
    }, [searchTerm])
    

    useEffect(() => {
        if( milliseconds === 0 ){
            clearInterval( ref.current )
            onSearchProject()
        }
    
    }, [milliseconds])
    
    
    return {
        projects:filteredProjects,
        loading
    }
}
