import { BrowserRouter, Routes, Route } from "react-router-dom"

import { store } from './store/store'
import { Provider } from 'react-redux'


import { AuthLayout, ProjectsLayout } from "./layouts"
import { 
    LoginPage, 
    RegisterPage, 
    ForgotPasswordPage, 
    NewPasswordPage, 
    ConfirmAccountPage, 
    ProjectsPage 
} from "./pages"


function App() {


    return (
        <Provider store={store} >
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<AuthLayout />} >
                        <Route index element={ <LoginPage /> } />
                        <Route path="registrar" element={ <RegisterPage /> } />
                        <Route path="olvide-password" element={ <ForgotPasswordPage /> } />
                        <Route path="olvide-password/:token" element={ <NewPasswordPage /> } />
                        <Route path="confirmar-cuenta/:token" element={ <ConfirmAccountPage /> } />
                    </Route>
                    <Route>
                        <Route path="/proyectos" element={ <ProjectsLayout /> }>
                            <Route index element={ <ProjectsPage /> } />
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </Provider>
    )
}

export default App
