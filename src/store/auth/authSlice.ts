import { PayloadAction, createSlice } from '@reduxjs/toolkit'



export enum AuthStatus {
    Checking = 'checking',
    NotAuthenticated = 'not-authenticated',
    Authenticated = 'authenticated',
}

export interface IAuthState {
    status: AuthStatus;
    _id   : string | null;
    email : string | null;
    name  : string | null;
    photo?: string
    errorMsg  : string | null;
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: AuthStatus.Checking,
        _id: null,
        email: null,
        name: null,
        errorMsg: null,
        successMsg: null,
    }as IAuthState,
    reducers: {
        login : ( state, { payload }:PayloadAction<{ _id: string; email: string; name: string, photo?:string }> ) => {
            state.status = AuthStatus.Authenticated,
            state._id    = payload._id,
            state.email  = payload.email,
            state.name   = payload.name,
            state.photo   = payload.photo,
            state.errorMsg   = null
        },
        logout: ( state, { payload }:PayloadAction<{ msg?:string }> ) => {
            state.status = AuthStatus.NotAuthenticated
            state._id    = null
            state.email  = null
            state.name   = null,
            state.errorMsg   = payload.msg ? payload.msg : null 
        },
        checkingAuth: ( state ) => {
            state.status = AuthStatus.Checking
        },

        clearMsgError: ( state ) => {
            state.errorMsg = null
        }
    }
})

export const { 
    login, 
    logout, 
    checkingAuth, 
    clearMsgError 
} = authSlice.actions
