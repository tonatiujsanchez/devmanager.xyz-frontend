import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IProject, IProjectsState, ITaskState } from "../../interfaces";



export interface IDataState {
    projects: {
        page : number
        count: number
        total: number
        totalPages: number
        projects  : IProject[]
    },
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
        addTasksOfProject: ( state, { payload }:PayloadAction<{ id:string, tasks: ITaskState }> ) => {
            state.projects.projects.forEach( project => {
                if( project._id === payload.id ) {
                    project.tasks = payload.tasks
                }
            })
        }
    }
})


export const {
    refreshProjects,
    addNewProject,
    editProject,
    addTasksOfProject
} = dataSlice.actions