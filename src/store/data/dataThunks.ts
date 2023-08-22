import { Dispatch } from "@reduxjs/toolkit"

import { isAxiosError } from "axios"
import { clientAxios } from "../../config"

import { addNewProject, addNewTask, addNewTaskOfProjectActive, addTasksOfProject, addTasksOfProjectActive, deleteProject, editProject, refreshProjects, setProjectActive } from "./"
import { IRootState } from "../store"

import { IProject } from "../../interfaces"



interface StartRefreshNotesParams {
    page  : number
    count?: number
}
export const startRefreshProjects = ({ page, count=6 }:StartRefreshNotesParams ) => {
    return async( dispatch:Dispatch ) => {
        try {
            const { data } = await clientAxios.get(`/projects?page=${page}&count=${count}`)
            dispatch( refreshProjects( data ) )
            
        } catch (error) {
            if(isAxiosError(error)){
                const { msg } = error.response?.data as { msg: string }
                console.log({msg})
            }   
        }
    }
}



interface StartAddNewProjectParams {
    name        : string
    description : string
    deliveryDate: string 
    client      : string
}
export const startAddNewProject = ({ name, description, deliveryDate, client }:StartAddNewProjectParams) => {
    return async( dispatch:Dispatch, getState:()=> IRootState ) => {
        
        const { projects } = getState().data

        try {
            const { data } = await clientAxios.post(`/projects`,{
                name, description, deliveryDate, client
            })
            
            if( projects.page >= 1 ){
                dispatch( addNewProject(data) )
            }

        } catch (error) {
            if(isAxiosError(error)){
                const { msg } = error.response?.data as { msg: string }
                console.log({msg})
            }   
        }

    }
}



interface StartEditProjectParams {
    _id         : string
    name        : string
    description : string
    deliveryDate: string 
    client      : string
}
export const startEditProject = ({ _id, name, description, deliveryDate, client }:StartEditProjectParams) => {
    return async( dispatch:Dispatch ) => {

        try {
            const { data } = await clientAxios.put(`/projects/${_id}`,{
                name, description, deliveryDate, client
            })
            dispatch( editProject(data) )
        } catch (error) {
            if(isAxiosError(error)){
                const { msg } = error.response?.data as { msg: string }
                console.log({msg});
            }
        }
    }
}


interface StartRemoveProjectParams {
    _id: string
}
export const startDeleteProject = ({ _id }:StartRemoveProjectParams) => {
    return async( dispatch:Dispatch ) => {

        try {
            const { data } = await clientAxios.delete(`/projects/${_id}`)
            dispatch( deleteProject(data) )
        } catch (error) {
            if(isAxiosError(error)){
                const { msg } = error.response?.data as { msg: string }
                console.log({msg});
            }
        }
    }
    
}


interface StartSetProjectActive {
    project: IProject
}
export const startSetProjectActive = ({ project }:StartSetProjectActive) => {   
    return async( dispatch:Dispatch ) => {
        dispatch( setProjectActive( project ) )
    }
}

export const startCleanProjectActive = () => {
    return async( dispatch:Dispatch ) => {
        dispatch( setProjectActive( null ) )
    }
}

// ===== ===== ===== ===== TASKS ===== ===== ===== =====

interface StartGetTasksParams {
    id   : string
    page : number
    count: number
}
export const startGetTasks = ({ id, page, count }:StartGetTasksParams) => {
    return async( dispatch:Dispatch, getState:()=> IRootState ) => {
        
        const { projectActive } = getState().data

        try {
            const { data } = await clientAxios.get(`/projects/tasks/${id}?page=${page}&count=${count}`)
            dispatch( addTasksOfProject({ id, tasks:data }) )

            if( projectActive?._id === id ){
                dispatch( addTasksOfProjectActive( { tasks: data } ))    
            }
        } catch (error) {
            if(isAxiosError(error)){
                const { msg } = error.response?.data as { msg: string }
                console.log({msg})
            } 
        }
    }
}



interface StartAddNewTaskParams {
    name        : string
    description : string
    deliveryDate: string 
    priority    : string
    idProject   : string
}
export const startAddNewTask = ({ name, description, deliveryDate, priority, idProject }:StartAddNewTaskParams) => {
    return async( dispatch:Dispatch, getState:()=> IRootState ) => {
        
        const { projects } = getState().data

        try {
            const { data } = await clientAxios.post(`/tasks`,{
                name, description, deliveryDate, priority, project:idProject
            })
            
            if( projects.page >= 1 ){
                dispatch( addNewTask({ task:data, idProject }) )
            }

            dispatch(addNewTaskOfProjectActive({ task:data }))

        } catch (error) {
            if(isAxiosError(error)){
                const { msg } = error.response?.data as { msg: string }
                console.log({msg})
            }   
        }

    }
}





