import { Link } from "react-router-dom"
import { useCheckAuth } from "../../hooks"
import { AuthStatus } from "../../store/auth"

export const Hero = () => {

    const { status } = useCheckAuth()


    return (
        <section>
            <div className="container grid md:grid-cols-2 items-center gap-10 py-8 sm:py-12 md:py-20 lg:pt-32 lg:pb-44">
                <div className="flex flex-col items-start gap-5 px-5">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold lg:leading-[3.5rem] text-slate-800">¡Gestiona Proyectos con Colaboradores en Tiempo Real!</h1>
                    <p className="lg:text-lg">Una herramienta ágil y colaborativa para gestionar proyectos en equipo. Simplifica la coordinación, comunicación y seguimiento de tareas en tiempo real.</p>
                    
                    {
                        status === AuthStatus.Checking
                        ? (
                            <div className="animate-pulse h-11 w-44 bg-slate-300 rounded"></div>
                        ):(
                            status === AuthStatus.Authenticated
                            ?(
                                <Link 
                                    to={'/proyectos'}
                                    className="bg-amber-300 hover:bg-amber-400 text-slate-800 inline-flex items-center gap-2 font-medium px-6 py-2 rounded-md text-lg animate-fade animate-once"
                                > 
                                    Mis proyectos 
                                </Link>
                            ):(
                                <Link 
                                    to={'/auth/registrar'}
                                    className="bg-amber-300 hover:bg-amber-400 text-slate-800 inline-flex items-center gap-2 font-medium px-6 py-2 rounded-md text-lg animate-fade animate-once"
                                > 
                                    Regístrate gratis 
                                </Link>
                            )
                        )
                    }
                </div>
                <div>
                    <img 
                        src="/hero.webp" 
                        alt="DevManager Hero"
                        title="DevManager Hero"
                        className="px-2 float-animation pb-4"
                    />
                </div>
            </div>
        </section>
    )
}
