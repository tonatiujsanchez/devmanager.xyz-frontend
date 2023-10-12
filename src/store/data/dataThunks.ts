import { Dispatch } from "@reduxjs/toolkit"

import { isAxiosError } from "axios"
import { clientAxios } from "../../config"

import { io, Socket } from "socket.io-client"

import { 
    addCollaboratorToProject,
    addNewProject,
    addNewTask,
    addNewTaskOfProjectActive,
    addNewTaskToCollaborator,
    addTasksOfProject,
    addTasksOfProjectActive,
    deleteProject,
    deleteTask,
    deleteTaskOfProjectActive,
    deleteTaskToCollaborator,
    editOfProjectActive,
    editProject,
    editTask,
    editTaskToCollaborator,
    refreshProjects,
    refreshProjectsCollaborative,
    removeCollaboratorToProject,
    setProjectActive,
    setTaskEdit, 
    updateCompletedTasks
} from "./"

import { IRootState } from "../store"

import { showNotify } from "../../helpers"
import { IProject, ITask } from "../../interfaces"


// ===== ===== ===== SOCKET.IO - Config ===== ===== =====
const socket:Socket = io(import.meta.env.VITE_API_URL)


// ===== ===== ===== ===== PROJECTS ===== ===== ===== =====

interface StartRefreshProjectsParams {
    page  : number
    count?: number
}
export const startRefreshProjects = ({ page, count=6 }:StartRefreshProjectsParams ) => {
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


interface StartRefreshProjectsCollaborativeParams {
    page  : number
    count?: number
}
export const startRefreshProjectsCollaborative = ({ page, count=6 }:StartRefreshProjectsCollaborativeParams ) => {
    return async( dispatch:Dispatch ) => {
        try {
            const { data } = await clientAxios.get(`/projects/collaborative?page=${page}&count=${count}`)
            dispatch( refreshProjectsCollaborative( data ) )
            
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

            showNotify('Proyecto agregado correctamente', 'success')

        } catch (error) {
            if(isAxiosError(error)){
                const { msg } = error.response?.data as { msg: string }
                showNotify(msg, 'error')
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
    return async( dispatch:Dispatch, getState:()=> IRootState ) => {

        const { _id } = getState().auth

        const typeProject = _id === project.creator ? 'admin' : 'collaborative'

        dispatch( setProjectActive( {...project, type: typeProject} ) )
    }
}

export const startCleanProjectActive = () => {
    return async( dispatch:Dispatch ) => {
        dispatch( setProjectActive( null ) )
    }
}



// ===== ===== ===== ===== TASKS ===== ===== ===== =====

interface StartGetTasksParams {
    id    : string
    page  : number
    count?: number
}
export const startGetTasks = ({ id, page, count=10 }:StartGetTasksParams) => {
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
}
export const startAddNewTask = ({ name, description, deliveryDate, priority }:StartAddNewTaskParams) => {
    return async( dispatch:Dispatch, getState:()=> IRootState ) => {
        
        const { projects, projectActive } = getState().data

        if(!projectActive?._id){ return }

        try {
            const { data } = await clientAxios.post(`/tasks`,{
                name, description, deliveryDate, priority, project:projectActive._id
            })
            
            // Dispatch al a los proyectos de administrador
            if( projects.projects.length > 0 ){
                dispatch( addNewTask({ task:data, idProject:projectActive._id }) )
            }
            
            showNotify('Tarea agregada', 'success')

            socket.emit('new-task', { task:data })
            
        } catch (error) {
            if(isAxiosError(error)){
                const { msg } = error.response?.data as { msg: string }
                showNotify(msg, 'error')
            }   
        }

    }
}


interface StartAddNewTaskWithSocketIOParams {
    task : ITask
}

export const startAddNewTaskWithSocketIO = ({ task }:StartAddNewTaskWithSocketIOParams) => {
    return async( dispatch:Dispatch, getState:()=> IRootState ) => {
        
        const { projectsCollaborative, projectActive } = getState().data

        if(!projectActive?._id){ return }
        
        // Dispatch al proyecto activo en caso de que la tarea pertenezca a ese proyecto
        if(projectActive._id === task.project){

            dispatch(addNewTaskOfProjectActive({ task })) 
            
            const newTask = projectActive.tasks.tasks.find( taskState => taskState._id === task._id )
                        
            if(!newTask && projectActive.type === 'collaborative'){
                showNotify('Se agregó una nueva tarea al proyecto', 'success')
            }  
        }

        // Dispatch al a los proyectos de colaborador
        if( projectsCollaborative.projects.length > 0 ){
            dispatch( addNewTaskToCollaborator({ task, idProject:task.project.toString() }) )
        }
    }
}



interface StartSetTaskEdit {
    task: ITask
}
export const startSetTaskEdit = ({ task }:StartSetTaskEdit) => {   
    return async( dispatch:Dispatch ) => {
        dispatch( setTaskEdit( task ) )
    }
}

export const startCleanTaskEdit = () => {
    return async( dispatch:Dispatch ) => {
        dispatch( setTaskEdit( null ) )
    }
}



interface StartEditTaskParams {
    _id         : string
    name        : string
    description : string
    deliveryDate: string 
    priority    : string
}
export const startEditTask = ({ _id, name, description, deliveryDate, priority }:StartEditTaskParams) => {
    return async( dispatch:Dispatch, getState:()=> IRootState ) => {

        const { projects, projectActive } = getState().data

        if(!projectActive?._id){ return }

        try {
            const { data } = await clientAxios.put(`/tasks/${_id}`,{
                name, description, deliveryDate, priority
            })
            
            if( projects.projects.length > 0 ){
                dispatch( editTask({ task:data, idProject:projectActive._id }) )
            }

            showNotify('Tarea actualizada', 'success')

            socket.emit('edit-task', { task:data })

        } catch (error) {
            if(isAxiosError(error)){
                const { msg } = error.response?.data as { msg: string }
                showNotify(msg, 'error')
            }
        }
    }
}


interface StartEditTaskWithSocketIOParams {
    task : ITask
}
export const startEditTaskWithSocketIO = ({ task }:StartEditTaskWithSocketIOParams) => {
    return async( dispatch:Dispatch, getState:()=> IRootState ) => {
        
        const { projectsCollaborative, projectActive } = getState().data

        if(!projectActive?._id){ return }
        
        // Dispatch al proyecto activo en caso de que la tarea pertenezca a ese proyecto
        if(projectActive._id === (task.project as IProject)._id){

            dispatch(editOfProjectActive({ task })) 
            
            if(projectActive.type === 'collaborative'){
                showNotify('Se editó una tarea del proyecto', 'success')
            }  
        }

        // Dispatch al a los proyectos de colaborador
        if( projectsCollaborative.projects.length > 0 ){
            dispatch( editTaskToCollaborator({ task, idProject:(task.project as IProject)._id!.toString() }) )
        }
    }
}



interface StartDeleteTaskParams {
    _id: string
}
export const startDeleteTask = ({ _id }:StartDeleteTaskParams) => {
    return async( dispatch:Dispatch, getState:()=> IRootState ) => {
        const { projects } = getState().data

        try {
            const { data } = await clientAxios.delete(`/tasks/${_id}`)

            if( projects.projects.length > 0 ){
                dispatch( deleteTask(data) )
            }

            showNotify('Tarea eliminada', 'success')

            socket.emit('delete-task', { task:data })

        } catch (error) {
            if(isAxiosError(error)){
                const { msg } = error.response?.data as { msg: string }
                console.log({msg});
            }
        }
    }
}


// TODO:
interface StartDeleteTaskWithSocketIOParams {
    task : ITask
}
export const startDeleteTaskWithSocketIO = ({ task }:StartDeleteTaskWithSocketIOParams) => {
    return async( dispatch:Dispatch, getState:()=> IRootState ) => {

        const { projectsCollaborative, projectActive } = getState().data

        if(!projectActive?._id){ return }


        if(projectActive._id === (task.project as IProject)._id){
            
            dispatch(deleteTaskOfProjectActive( task )) 

            const newTask = projectActive.tasks.tasks.find( taskState => taskState._id === task._id )
            
            if(newTask && projectActive.type === 'collaborative'){
                showNotify('Se eliminó una tarea del proyecto', 'success')
            }  
        }

        // Dispatch al a los proyectos de colaborador
        if( projectsCollaborative.projects.length > 0 ){
            dispatch( deleteTaskToCollaborator( task ) )
        }

    }
}




interface StartToggleCompleteTaskParams {
    taskId: string
}
export const startToggleCompleteTask = ({ taskId }:StartToggleCompleteTaskParams ) => {
    return async( dispatch:Dispatch, getState:()=> IRootState ) => {

        const { projectActive } = getState().data

        if(!projectActive?._id){ return }
        
        try {
            const { data } = await clientAxios.post(`/tasks/to-complete/${taskId}`)
            dispatch( editTask({ task:data, idProject:projectActive._id  }) )
            dispatch( updateCompletedTasks( data ) )

        } catch (error) {
            if(isAxiosError(error)){
                const { msg } = error.response?.data as { msg: string }
                console.log({msg});
            }
        }
    }
}



// ===== ===== ===== ===== COLLABORATORS ===== ===== ===== =====
interface StartAddCollaboratorToProjectParams {
    idCollaborator: string
}
export const startAddCollaboratorToProject = ({ idCollaborator }:StartAddCollaboratorToProjectParams) => {
    return async( dispatch:Dispatch, getState:()=> IRootState )=> {

        const { projectActive } = getState().data

        if(!projectActive){
            return
        }

        try {
            const { data } = await clientAxios.post(`/collaborators/${ projectActive._id }`, {
                idCollaborator
            })
            dispatch( addCollaboratorToProject(data) )
            showNotify('Colaborador agregado al proyecto', 'success')
        } catch (error) {
            if(isAxiosError(error)){
                const { msg } = error.response?.data as { msg: string }
                showNotify(msg, 'error')
            }
        }        
    }
}

interface StartRemoveCollaboratorToProjectParams {
    idCollaborator: string
}
export const startRemoveCollaboratorToProject = ({ idCollaborator }:StartRemoveCollaboratorToProjectParams) => {
    return async( dispatch:Dispatch, getState:()=> IRootState )=> {

        const { projectActive } = getState().data

        if(!projectActive){
            return
        }

        try {
            const { data } = await clientAxios.delete(`/collaborators/${ projectActive._id }`, {
                data: {
                    idCollaborator
                }
            })
            dispatch( removeCollaboratorToProject(data) )
            showNotify('Colaborador elimnado del proyecto', 'success')
        } catch (error) {
            if(isAxiosError(error)){
                const { msg } = error.response?.data as { msg: string }
                showNotify(msg, 'error')
            }
        }        
    }
}
