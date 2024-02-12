import { FC, ReactNode } from 'react'

interface Props {
    children: ReactNode
}
export const AuthLayout:FC<Props> = ({ children }) => {
    return (
        <>
            <main className="h-screen flex justify-center items-center" >
                { children }
            </main>
        </>
    )
}
