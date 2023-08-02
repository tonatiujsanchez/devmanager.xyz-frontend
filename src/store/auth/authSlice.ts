import { createSlice } from '@reduxjs/toolkit'

export const authStatus = {
    checking: 'checking',
    notAuthenticated: 'not-authenticated',
    authenticated: 'authenticated'
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: authStatus.checking,
        _id: null,
        email: null,
        name: null,
        errorMsg: null,
    },
    reducers: {
        login : (state, { payload }) => {
            state.status = authStatus.authenticated,
            state._id    = payload._id,
            state.email  = payload.email,
            state.name   = payload.name
        },
        logout: (state, { payload }) => {
            state.status = authStatus.notAuthenticated
            state._id = null
            state.email = null
            state.name = null,
            state.errorMsg = payload?.msg
        },
        checkingAuth: (state ) => {
            state.status = authStatus.checking
        },
    }
})

export const { login, logout, checkingAuth } = authSlice.actions
