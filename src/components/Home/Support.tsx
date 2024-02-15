
export const Support = () => {
    return (
        <section id="soporte" className="py-16 lg:py-36 px-5">
            <div className="container flex flex-col lg:flex-row justify-between items-center gap-0 md:gap-16">
                <div className="mb-20 sm:mb-28 max-w-[60rem] mx-auto lg:mt-20 text-center lg:text-start">
                    <h2 className="text-3xl md:text-4xl font-bold mb-5">Soporte continuo</h2>
                    <p className="max-w-[58rem] mx-auto sm:text-lg mb-3">Soporte continuo y actualizaciones con nuevas características para garantizar que tu experiencia sea óptima en cada paso del camino.</p>
                    <p className="max-w-[58rem] mx-auto sm:text-lg">Estamos aquí para responder tus preguntas, resolver problemas y brindarte la asistencia que necesitas para aprovechar al máximo nuestra plataforma.</p>
                </div>
                <div className="md:min-w-[32rem]">
                    <img
                        src="/soporte.svg"
                        alt="soporte DevManager"
                        className="w-full"
                    />
                </div>
            </div>
        </section>
    )
}
