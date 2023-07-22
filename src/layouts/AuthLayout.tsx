import { Outlet } from 'react-router-dom'


export const AuthLayout = () => {
    return (
        <>
            <main>
                <p>AuthLayout</p>
                <Outlet />
            </main>
        </>
    )
}
