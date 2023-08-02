import { Outlet } from 'react-router-dom'


export const ProjectsLayout = () => {
    return (
        <>
            <main className="h-screen flex justify-center items-center" >
                <Outlet />
            </main>
        </>
    )
}
