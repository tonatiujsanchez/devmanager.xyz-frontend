import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IProject, IProjectState } from "../../interfaces";



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
        projects: {}
    } as IDataState,
    reducers: {
        refreshProjects: ( state, { payload }:PayloadAction<IProjectState> ) => {
            state.projects = { ...payload }
        }
    }
})


export const {
    refreshProjects
} = dataSlice.actions