import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthLayout } from "./layouts"
import { LoginPage, RegisterPage, ForgotPasswordPage, NewPasswordPage, ConfirmAccountPage } from "./pages"


function App() {


    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<AuthLayout />} >
                    <Route index element={ <LoginPage /> } />
                    <Route path="registrar" element={ <RegisterPage /> } />
                    <Route path="olvide-password" element={ <ForgotPasswordPage /> } />
                    <Route path="olvide-password/:token" element={ <NewPasswordPage /> } />
                    <Route path="confirmar-cuenta/:token" element={ <ConfirmAccountPage /> } />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
