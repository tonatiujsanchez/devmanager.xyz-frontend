import { Navigate, Route, Routes } from "react-router-dom"

import { AuthLayout } from "../layouts"
import { 
    ConfirmAccountPage, 
    ForgotPasswordPage, 
    LoginPage, 
    NewPasswordPage, 
    RegisterPage 
} from "../pages"


export const AuthRoutes = () => {
    return (
        <Routes>
            <Route path="*" element={<AuthLayout />} >
                <Route index element={<LoginPage />} />
                <Route path="registrar" element={<RegisterPage />} />
                <Route path="olvide-password" element={<ForgotPasswordPage />} />
                <Route path="olvide-password/:token" element={<NewPasswordPage />} />
                <Route path="confirmar-cuenta/:token" element={<ConfirmAccountPage />} />
                <Route path="/*" element={<Navigate to="/" />} />
            </Route>
        </Routes>
    )
}
