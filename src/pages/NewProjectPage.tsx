import { Helmet } from "react-helmet"
import { ProjectForm } from "../components"


export const NewProjectPage = () => {
    return (
        <>
            <Helmet>
                <title>DevManager | Crear Proyecto</title>
            </Helmet> 
            <h1 className="font-bold text-slate-800 text-2xl sm:text-3xl">Nuevo proyecto</h1>
            <section className="grid place-items-center mt-5 sm:mt-10">
                <ProjectForm />
            </section>
        </>

    )
}
