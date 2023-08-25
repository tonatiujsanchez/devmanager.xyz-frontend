import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IProject, IProjectsState, ITask, ITaskState } from "../../interfaces";



export interface IDataState {
    projects: {
        page : number
        count: number
        total: number
        totalPages: number
        projects  : IProject[]
    },
    projectActive: IProject | null
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
        projectActive: null,
        taskEdit: null
    } as IDataState,
    reducers: {
        refreshProjects: ( state, { payload }:PayloadAction<IProjectsState> ) => {
            state.projects = { ...payload }
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
        setProjectActive: ( state, { payload }:PayloadAction<IProject | null> ) => {
            state.projectActive = payload
        },
        addTasksOfProject: ( state, { payload }:PayloadAction<{ id:string, tasks: ITaskState }> ) => {
            state.projects.projects.forEach( project => {
                if( project._id === payload.id ) {
                    project.tasks = payload.tasks
                }
            })
        },
        addTasksOfProjectActive: ( state, { payload }:PayloadAction<{ tasks:ITaskState }> ) => {
            if(state.projectActive){
                state.projectActive.tasks = payload.tasks
            }    
        },
        addNewTask: ( state, { payload }:PayloadAction<{ idProject: string, task: ITask }> ) => {   
            state.projects.projects.forEach(project => {
                if(project._id === payload.idProject){
                    project.tasks.tasks.push(payload.task)
                    project.tasks.count++
                    project.tasks.total++
                }
            })
        },
        editTask: ( state, { payload }:PayloadAction<{ idProject: string, task: ITask }> ) => {   
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
        deleteTask: ( state, { payload }:PayloadAction<ITask> ) => {   
            state.projectActive!.tasks.tasks  = state.projectActive!.tasks.tasks.filter( task => task._id !== payload._id )
            state.projectActive!.tasks.count--
            state.projectActive!.tasks.total--

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
        addNewTaskOfProjectActive: ( state, { payload }:PayloadAction<{ task: ITask }> ) => {
            if(state.projectActive){
                state.projectActive.tasks.tasks.push(payload.task)
                state.projectActive.tasks.count++
                state.projectActive.tasks.total++
            }
        },
        setTaskEdit: ( state, { payload }:PayloadAction<ITask | null> ) => {
            state.taskEdit = payload
        },
    }
})


export const {
    refreshProjects,
    addNewProject,
    editProject,
    deleteProject,

    setProjectActive,
    addTasksOfProject,

    addTasksOfProjectActive,
    addNewTask,
    editTask,
    deleteTask,

    addNewTaskOfProjectActive,
    setTaskEdit
} = dataSlice.actions