import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { IProject, IProjectActive, IProjectsState, ITask, ITaskState, IUser } from "../../interfaces"



export interface IDataState {
    projects: IProjectsState,
    projectsCollaborative: IProjectsState,
    projectActive: IProjectActive | null
    taskEdit: ITask | null
}

export const dataSlice = createSlice({
    name: 'data',
    initialState: {
        projects: {
            page: 0,
            count: 0,
            total: 0,
            totalPages: 0,
            projects: []
        },
        projectsCollaborative: {
            page: 0,
            count: 0,
            total: 0,
            totalPages: 0,
            projects: []
        },
        projectActive: null,
        taskEdit: null
    } as IDataState,
    reducers: {
        refreshProjects: ( state, { payload }:PayloadAction<IProjectsState> ) => {
            state.projects = { ...payload }
        },
        refreshProjectsCollaborative: ( state, { payload }:PayloadAction<IProjectsState> ) => {
            state.projectsCollaborative = { ...payload }
        },
        addNewProject: ( state, { payload }:PayloadAction<IProject> ) => {   
            state.projects.projects.unshift(payload)
            state.projects.count++
            state.projects.total++
        },
        editProject: ( state, { payload }:PayloadAction<IProject> ) => {   
            state.projects.projects = state.projects.projects.map( project => {
                if( project._id === payload._id ){
                    return payload
                }
                return project
            })
        },
        deleteProject: ( state, { payload }:PayloadAction<IProject> ) => {   
            state.projects.projects = state.projects.projects.filter( project => project._id !== payload._id )
            state.projects.count--
            state.projects.total--
        },
        setProjectActive: ( state, { payload }:PayloadAction<IProjectActive | null> ) => {
            state.projectActive = payload
        },
        addTasksOfProject: ( state, { payload }:PayloadAction<{ id:string, tasks: ITaskState }> ) => {
            if( state.projectActive?.type === 'admin' ){
                state.projects.projects.forEach( project => {
                    if( project._id === payload.id ) {
                        project.tasks = payload.tasks
                    }
                })
            }else {
                state.projectsCollaborative.projects.forEach( project => {
                    if( project._id === payload.id ) {
                        project.tasks = payload.tasks
                    }
                })
            }
        },
        addTasksOfProjectActive: ( state, { payload }:PayloadAction<{ tasks:ITaskState }> ) => {
            if(state.projectActive){
                state.projectActive.tasks = payload.tasks
            }    
        },
        addNewTask: ( state, { payload }:PayloadAction<{ idProject: string, task: ITask }> ) => {   
            state.projects.projects.forEach(project => {

                if(project._id === payload.idProject){

                    const newTask = project.tasks.tasks.find( taskState => taskState._id === payload.task._id )
                    if( !newTask ){
                        project.tasks.tasks.push(payload.task)
                        project.tasks.count++
                        project.tasks.total++
                    }

                }
            })
        },
        addNewTaskToCollaborator: ( state, { payload }:PayloadAction<{ idProject: string, task: ITask }> ) => {            
            state.projectsCollaborative.projects.forEach(project => {
                if(project._id === payload.idProject){

                    const newTask = project.tasks.tasks.find( taskState => taskState._id === payload.task._id )
                    if(!newTask){
                        project.tasks.tasks.push(payload.task)
                        project.tasks.count++
                        project.tasks.total++
                    }
                }
            })
        },
        editTask: ( state, { payload }:PayloadAction<{ idProject: string, task: ITask }> ) => {   
            if( state.projects.projects.length > 0 ){
                state.projects = {
                    ...state.projects,
                    projects: state.projects.projects.map( project => {
                        if( project._id === payload.idProject ){
                            project.tasks.tasks = project.tasks.tasks.map( taskState => taskState._id === payload.task._id ? payload.task : taskState )
                        }
                        return project
                    })                    
                }
            }
        },
        editTaskToCollaborator: ( state, { payload }:PayloadAction<{ idProject: string, task: ITask }> ) => {   
            if( state.projectsCollaborative.projects.length > 0 ){
                state.projectsCollaborative = {
                    ...state.projectsCollaborative,
                    projects: state.projectsCollaborative.projects.map( project => {
                        if( project._id === payload.idProject ){
                            project.tasks.tasks = project.tasks.tasks.map( taskState => taskState._id === payload.task._id ? payload.task : taskState )
                        }
                        return project
                    })                    
                }
            }
        },
        editOfProjectActive: ( state, { payload }:PayloadAction<{ task: ITask }> ) => {   
            if( state.projectActive ){
                state.projectActive.tasks = {
                    ...state.projectActive.tasks,
                    tasks: state.projectActive.tasks.tasks.map( task => {
                        if( task._id === payload.task._id ) {
                            return payload.task
                        }
                        return task
                    })
                }               
            }
        },
        deleteTaskOfProjectActive: ( state, { payload }:PayloadAction<ITask> ) => {   
            state.projectActive!.tasks.tasks = state.projectActive!.tasks.tasks.filter( task => task._id !== payload._id )
            state.projectActive!.tasks.count--
            state.projectActive!.tasks.total--
        },
        deleteTask: ( state, { payload }:PayloadAction<ITask> ) => {   

            if( state.projects.projects.length > 0 ){
                state.projects = {
                    ...state.projects,
                    projects: state.projects.projects.map( project => {
                         if( project._id === (payload.project as IProject)._id ){
                            project.tasks.tasks = project.tasks.tasks.filter( task => task._id !== payload._id )
                            project.tasks.count--
                            project.tasks.total--
                        }
                        return project
                    })                    
                }
            }
        },
        deleteTaskToCollaborator: ( state, { payload }:PayloadAction<ITask> ) => {

            if( state.projectsCollaborative.projects.length > 0 ){
                state.projectsCollaborative = {
                    ...state.projectsCollaborative,
                    projects: state.projectsCollaborative.projects.map( project => {
                        if( project._id === (payload.project as IProject)._id ){
                            project.tasks.tasks = project.tasks.tasks.filter( task => task._id !== payload._id )
                            project.tasks.count--
                            project.tasks.total--
                        }
                        return project
                    })                    
                }
            }
        },
        addNewTaskOfProjectActive: ( state, { payload }:PayloadAction<{ task: ITask }> ) => {

                const newTask = state.projectActive!.tasks.tasks.find( taskState => taskState._id === payload.task._id )

                if(!newTask){
                    state.projectActive!.tasks.tasks.push(payload.task)
                    state.projectActive!.tasks.count++
                    state.projectActive!.tasks.total++
                }
            
        },
        setTaskEdit: ( state, { payload }:PayloadAction<ITask | null> ) => {
            state.taskEdit = payload
        },
        updateCompletedTasks: ( state, { payload }:PayloadAction<ITask> ) => {
            if( payload.completed ) {
                state.projectActive!.tasks.completedTasks++
            }else {
                state.projectActive!.tasks.completedTasks--
            }
            if(state.projectActive?.type === 'admin' && state.projects.projects.length > 0 ){
                state.projects = {
                    ...state.projects,
                    projects: state.projects.projects.map( project => {
                        if( state.projectActive?._id === project._id ){
                            return state.projectActive!
                        }
                        return project
                    })                    
                }
            }
            if(state.projectActive?.type === 'collaborative' && state.projectsCollaborative.projects.length > 0 ){
                state.projectsCollaborative = {
                    ...state.projectsCollaborative,
                    projects: state.projectsCollaborative.projects.map( project => {
                        if( state.projectActive?._id === project._id ){
                            return state.projectActive!
                        }
                        return project
                    })                    
                }
            }
        },
        addCollaboratorToProject: ( state, { payload }:PayloadAction<IUser> ) => {
            state.projectActive?.collaborators.push( payload )
            
            if( state.projects.projects.length > 0 ){
                state.projects = {
                    ...state.projects,
                    projects: state.projects.projects.map( project => {
                        if( state.projectActive?._id === project._id ){
                            project.collaborators.push( payload )
                        }
                        return project
                    })                    
                }
            }

        },
        removeCollaboratorToProject: ( state, { payload }:PayloadAction<{ idCollaborator:string }> ) => {
            state.projectActive!.collaborators = state.projectActive!.collaborators.filter( collaborator => collaborator._id !== payload.idCollaborator )
            
            if( state.projects.projects.length > 0 ){
                state.projects = {
                    ...state.projects,
                    projects: state.projects.projects.map( project => {
                        if( state.projectActive?._id === project._id ){
                            return state.projectActive!
                        }
                        return project
                    })                    
                }
            }

        },
        clearProjectsLogout: ( state ) => {
            state.projectActive = null
            state.taskEdit = null
            state.projects = {
                page: 0,
                count: 0,
                total: 0,
                totalPages: 0,
                projects: []
            }
        }
    }
})


export const {
    refreshProjects,
    refreshProjectsCollaborative,
    addNewProject,
    editProject,
    deleteProject,
    
    setProjectActive,
    addTasksOfProject,
    
    addTasksOfProjectActive,
    addNewTask,
    addNewTaskToCollaborator,
    editTask,
    editOfProjectActive,
    editTaskToCollaborator,
    deleteTaskOfProjectActive,
    deleteTask,
    deleteTaskToCollaborator,

    addNewTaskOfProjectActive,
    addCollaboratorToProject,
    removeCollaboratorToProject,
    setTaskEdit,
    updateCompletedTasks,

    clearProjectsLogout
} = dataSlice.actions