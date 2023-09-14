import { createSlice } from "@reduxjs/toolkit"


export interface IUiState {
    toggleSideMenu: boolean
    showSearcher  : boolean
}

export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        toggleSideMenu: true,
        showSearcher: false
    } as IUiState,
    reducers: {
        toggleSideMenu: ( state )=>{
            state.toggleSideMenu = !state.toggleSideMenu
        },
        hideSideMenu: ( state )=>{
            state.toggleSideMenu = false
        },
        showSearcher: ( state )=>{
            state.showSearcher = true
        },
        hideSearcher: ( state )=>{
            state.showSearcher = false
        }
    }
})

export const {
    toggleSideMenu,
    hideSideMenu,
    showSearcher,
    hideSearcher,
} = uiSlice.actions