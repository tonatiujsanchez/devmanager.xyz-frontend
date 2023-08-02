## UpTask - Frontend


## Redux Toolkit :: React + Typescript

1. Instalar R
```
yarn add @reduxjs/toolkit
```

2. Instalar Redux
```
yarn add react-redux
```

3. Configuracion del strore
    
    3.1. Crear la carpeta store en dentro de src

    3.2. Crear el archivo store.ts
    
    3.2. Dentro de la carpeta agregar la configuracion del store:
    
```
    import { configureStore } from '@reduxjs/toolkit'

    export const store = configureStore({
        reducer: {

        },
    })
```

4. Proveer el store a nuestra aplicación (Poniendolo en el punto más alto de la aplicación por encima del BrowserRouter)
```
import { store } from './store/store'
import { Provider } from 'react-redux'


<Provider store={store} >
    <BrowserRouter>
        <Routes>
            <Route path="/" element={ <HomePage/> }/>
            <Route path="/about" element={ <AboutPage/> }/>
        </Routes>
    </BrowserRouter>
</Provider>
```

5. Agregar un Slice
    5.1. Crear el archivo authSlice.ts
    5.2. Dentro del archivo authSlice.ts :
```
    import { createSlice } from '@reduxjs/toolkit'

    export const authSlice = createSlice({
        name: 'auth',
        initialState: {

        },
        reducers: {
            login : (state, { payload }) => {

            },
            logout: (state, { payload }) => {

            },
            checkingAuth: (state, { payload }) => {
                
            },
        }
    })

    export const { login, logout, checkingAuth } = authSlice.actions
```

6. Añadir el slice del authReducer al store
```
    import { configureStore } from '@reduxjs/toolkit'
    import { authSlice } from './auth'

    export const store = configureStore({
        reducer: {
            auth: authSlice.reducer
        },
    })
```






