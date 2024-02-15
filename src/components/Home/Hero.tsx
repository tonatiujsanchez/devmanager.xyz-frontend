import { Link } from "react-router-dom"

export const Hero = () => {
    return (
        <section>
            <div className="container grid md:grid-cols-2 items-center gap-10 py-8 sm:py-12 md:py-20 lg:pt-32 lg:pb-44">
                <div className="flex flex-col items-start gap-5 px-5">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold lg:leading-[3.5rem] text-slate-800">¡Gestiona Proyectos con Colaboradores en Tiempo Real!</h1>
                    <p className="lg:text-lg">Una herramienta ágil y colaborativa para gestionar proyectos en equipo. Simplifica la coordinación, comunicación y seguimiento de tareas en tiempo real.</p>
                    <Link 
                        to={'/auth/registrar'}
                        className="bg-amber-300 hover:bg-amber-400 text-slate-800 inline-flex items-center gap-2 font-medium px-6 py-2 rounded-md text-lg"
                    > 
                        Registrate gratis 
                    </Link>
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
