import { Dispatch } from '@reduxjs/toolkit';
import { toggleSideMenu } from './uiSlice';



export const startToggleSideMenu = ()=> {
    return ( dispatch:Dispatch ) => {
        dispatch( toggleSideMenu() )
    }
}