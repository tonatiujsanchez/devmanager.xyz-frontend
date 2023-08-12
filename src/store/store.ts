import { configureStore } from '@reduxjs/toolkit'

import { authSlice } from './auth'
import { uiSlice } from './ui'
import { dataSlice } from './data'


export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        ui  : uiSlice.reducer,
        data: dataSlice.reducer
    },
    // devTools: false
})

export type IRootState = ReturnType<typeof store.getState>
export type IAppDispatch = typeof store.dispatch