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
        projectActive: null
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
        addNewTaskOfProjectActive: ( state, { payload }:PayloadAction<{ task: ITask }> ) => {
            if(state.projectActive){
                state.projectActive.tasks.tasks.push(payload.task)
                state.projectActive.tasks.count++
                state.projectActive.tasks.total++
            }
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
    addNewTaskOfProjectActive
} = dataSlice.actions