import { FC, ReactNode } from 'react'
import { Footer, Header } from '..'

interface Props {
    children: ReactNode
}
export const SiteLayout:FC<Props> = ({ children }) => {
    return (
        <>            
            <Header />
            { children }
            <Footer />

        </>
    )
}
