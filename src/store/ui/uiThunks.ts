import { Dispatch } from '@reduxjs/toolkit';
import { toggleSideMenu } from './uiSlice';



export const startToggleSideMenu = ()=> {
    return async( dispatch:Dispatch ) => {

        dispatch( toggleSideMenu() )
    }
}