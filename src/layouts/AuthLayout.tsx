import { FC, ReactNode } from 'react'
import { SiteLayout } from '../components'

interface Props {
    children: ReactNode
}
export const AuthLayout:FC<Props> = ({ children }) => {
    return (
        <>
        <SiteLayout>
            <main className="flex justify-center pt-20 pb-32" >
                { children }
            </main>
        </SiteLayout>
        </>
    )
}
