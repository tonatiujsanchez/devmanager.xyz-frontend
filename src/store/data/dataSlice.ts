import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IProject, IProjectsState } from "../../interfaces";



export interface IDataState {
    projects: {
        page : number
        count: number
        total: number
        totalPages: number
        projects  : IProject[]
    }
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
        }
    } as IDataState,
    reducers: {
        refreshProjects: ( state, { payload }:PayloadAction<IProjectsState> ) => {
            state.projects = { ...payload }
        },
        addNewProject: ( state, { payload }:PayloadAction<IProject> ) => {   
            state.projects.projects.unshift(payload)
            state.projects.count++
            state.projects.total++
        }
    }
})


export const {
    refreshProjects,
    addNewProject
} = dataSlice.actions