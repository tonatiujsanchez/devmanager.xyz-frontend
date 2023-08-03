import { configureStore } from '@reduxjs/toolkit'

import { authSlice } from './auth'


export const store = configureStore({
    reducer: {
        auth: authSlice.reducer
    },
})

export type IRootState = ReturnType<typeof store.getState>
export type IAppDispatch = typeof store.dispatch