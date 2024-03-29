import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import { clientAxios } from '../config'
import { LoadingMain } from '../components'


export const ConfirmAccountPage = () => {

    const [loading, setLoading] = useState(true)
    
    const { token } =  useParams()
    const navigate = useNavigate()

    const checkToken = async() => {
        try {
            await clientAxios.get(`/users/confirm/${token}`)
            setLoading(false)
        } catch (error) {
            navigate('/', { replace: true })
        }
    }

    useEffect(() => {
        checkToken()
    }, [])
    

    if(loading){
        return (
            <div className="h-screen flex justify-center items-center">
                <LoadingMain />
            </div>
        )
    }


    return (
        <>
            <Helmet>
                <title>DevManager | Cuenta Confirmada</title>
            </Helmet> 
            <section className="px-4 animate-jump animate-duration-200 animate-ease-linear">
                <div className="bg-white px-9 pt-10 pb-8 rounded-lg shadow">
                    <h1 className="text-3xl font-extrabold text-center uppercase mb-5">Cuenta Confirmada</h1>
                    <p className="max-w-[500px] mb-7 text-center">Su cuenta ha sido confirmada correctamente, inicie sesión y comience a administar sus proyectos</p>
                    <div className="flex justify-center gap-1 mt-10">
                        <Link to="/auth/login" className="font-medium text-slate-700 hover:text-slate-950">Iniciar Sesión</Link>
                    </div>
                </div>
            </section>
        </>
    )
}
