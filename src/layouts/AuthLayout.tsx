import { Outlet } from 'react-router-dom'


export const AuthLayout = () => {
    return (
        <>
            <main className="h-screen flex justify-center items-center" >
                <Outlet />
            </main>
        </>
    )
}
