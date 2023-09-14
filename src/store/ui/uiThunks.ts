import { Dispatch } from '@reduxjs/toolkit';
import { showSearcher, hideSearcher, toggleSideMenu, hideSideMenu } from './uiSlice';



export const startToggleSideMenu = ()=> {
    return ( dispatch:Dispatch ) => {
        dispatch( toggleSideMenu() )
    }
}
export const startHideSideMenu = ()=> {
    return ( dispatch:Dispatch ) => {
        dispatch( hideSideMenu() )
    }
}

export const startShowSearcher = ()=> {
    return ( dispatch:Dispatch ) => {
        dispatch( showSearcher() )
    }
}
export const startHideSearcher = ()=> {
    return ( dispatch:Dispatch ) => {
        dispatch( hideSearcher() )
    }
}