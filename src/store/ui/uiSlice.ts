import { createSlice } from "@reduxjs/toolkit"


export interface IUiState {
    toggleSideMenu: boolean
}

export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        toggleSideMenu: true
    } as IUiState,
    reducers: {
        toggleSideMenu: ( state )=>{
            state.toggleSideMenu = !state.toggleSideMenu
        }
    }
})

export const {
    toggleSideMenu
} = uiSlice.actions