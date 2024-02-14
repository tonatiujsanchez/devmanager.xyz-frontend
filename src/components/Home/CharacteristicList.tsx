

export const CharacteristicList = () => {
    return (
        <section className="bg-slate-800 py-8 sm:py-12 md:py-20 lg:py-28">
            <div className="text-slate-50">
                <div className="text-center mb-20 sm:mb-28 max-w-[60rem] mx-auto">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 max-w-[45rem] mx-auto">Mantén el rumbo y logra tus metas de manera más eficiente.</h2>
                    <p className="max-w-[58rem] mx-auto">Consigue tus metas de forma más eficiente con nuestra aplicación de gestión de proyectos. Con características avanzadas y colaboración en tiempo real, estarás en el camino correcto hacia el éxito en poco tiempo.</p>
                </div>
                <div className=" container flex justify-between items-center gap-10 mb-10">
                    <div className="md:min-w-[37rem]">
                        <img
                            src="/listado_de_proyectos.webp"
                            alt="DevManager Hero"
                            title="DevManager Hero"
                            className="px-2 pb-4 w-full"
                        />
                    </div>
                    <div>
                        <h3 className="text-xl sm:text-2xl font-bold mb-4">Interfaz Intuitiva</h3>
                        <p>Disfruta de una experiencia fluida y sin complicaciones con una interfaz intuitiva. Diseñada pensando en la comodidad del usuario, con una navegación sencilla y accesible, lo que te permite concentrarte en lo que más importa: tus proyectos.</p>
                    </div>
                </div>

                <div className=" container flex justify-between items-center gap-10 mb-10">
                    <div className="md:min-w-[37rem]">
                        <img
                            src="/agregar_colaborador.webp"
                            alt="DevManager Hero"
                            title="DevManager Hero"
                            className="px-2 pb-4 w-full"
                        />
                    </div>
                    <div>
                        <h3 className="text-xl sm:text-2xl font-bold mb-4">Colaboradores</h3>
                        <p>Agrega colaboradores a tus proyectos y lleva tu trabajo al siguiente nivel. Trabaja de manera conjunta con colegas y amigos para lograr tus objetivos de manera eficiente y efectiva.</p>
                    </div>
                </div>

                <div className=" container flex justify-between items-center gap-10 mb-10">
                    <div className="md:min-w-[37rem]">
                        <img
                            src="/buscar_proyecto.webp"
                            alt="DevManager Hero"
                            title="DevManager Hero"
                            className="px-2 pb-4 w-full"
                        />
                    </div>
                    <div>
                        <h3 className="text-xl sm:text-2xl font-bold mb-4">Encuentra tu proyecto</h3>
                        <p>Encuentra tu proyecto rápidamente y sin complicaciones con nuestro buscador intuitivo. Navega fácilmente a través de tus propios proyectos y en los que eres colaborador en un abrir y cerrar de ojos.</p>
                    </div>
                </div>

                <div className=" container flex justify-between items-center gap-10">
                    <div className="md:min-w-[37rem]">
                        <img
                            src="/listado_de_tareas.webp"
                            alt="DevManager Hero"
                            title="DevManager Hero"
                            className="px-2 pb-4 w-full"
                        />
                    </div>
                    <div>
                        <h3 className="text-xl sm:text-2xl font-bold mb-4">Seguimiento de tareas</h3>
                        <p>Agrega tareas y realiza un seguimiento completo de tu progreso en tiempo real. Organiza tus actividades, asigna responsabilidades y mantén a todos informados sobre el estado de cada tarea para lograr tus objetivos de manera más efectiva.</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
