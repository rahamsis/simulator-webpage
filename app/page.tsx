'use client'
import Image from "next/image";
import { useState } from "react";

const Main = () => {

    const [showMore, setShowMore] = useState(false);

    const arrayUno = [
        {
            char: "P",
            title: "Planeación",
            concept: "Inicia tu sesión de estudio con una planificación clara y específica de los objetivos que deseas alcanzar. "
                + "Establece metas realistas y divide tu tiempo de estudio de manera efectiva",
        },
        {
            char: "O",
            title: "Organización",
            concept: "Organiza tus materiales de estudio de forma estructurada y coherente. Utiliza esquemas, mapas mentales, "
                + "resúmenes y otras herramientas visuales para facilitar la comprensión y la memorización.",
        },
        {
            char: "N",
            title: "Neuro Aprendizaje",
            concept: "Aplica los principios de la neurociencia en tu proceso de estudio. Por ejemplo, intercala distintas materias o "
                + "temas para mantener la atención, practica la recuperación activa para fortalecer la memoria y releva el estrés para "
                + "favorecer el aprendizaje.",
        },
        {
            char: "T",
            title: "Tecnología",
            concept: "Aprovecha las herramientas tecnológicas disponibles para potenciar tu aprendizaje. Utiliza aplicaciones, plataformas "
                + "en línea y recursos multimedia para diversificar tus fuentes de información y facilitar la práctica y revisión de los contenidos.",
        },
        {
            char: "E",
            title: "Evalúate",
            concept: "Evalúa tu progreso y comprensión a lo largo del proceso de estudio. Realiza autoevaluaciones, pruebas de práctica y"
                + " retroalimentación para identificar tus fortalezas y áreas de mejora, y ajusta tu enfoque de estudio en consecuencia.",
        },
        {
            char: "100",
            title: "100%",
            concept: "Haz un esfuerzo al 100% en cada sesión de estudio. Mantén la constancia, la disciplina y la motivación para "
                + "alcanzar tus metas académicas y maximizar tu rendimiento cognitivo.",
        },
    ]

    const arrayDos = [
        {
            icon: (<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-key" viewBox="0 0 16 16">
                <path d="M0 8a4 4 0 0 1 7.465-2H14a.5.5 0 0 1 .354.146l1.5 1.5a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0L13 9.207l-.646.647a.5.5 0 0 1-.708 0L11 9.207l-.646.647a.5.5 0 0 1-.708 0L9 9.207l-.646.647A.5.5 0 0 1 8 10h-.535A4 4 0 0 1 0 8m4-3a3 3 0 1 0 2.712 4.285A.5.5 0 0 1 7.163 9h.63l.853-.854a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.793-.793-1-1h-6.63a.5.5 0 0 1-.451-.285A3 3 0 0 0 4 5" />
                <path d="M4 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
            </svg>),
            title: "Manejo de Creencias",
            concept: "El PNL se basa en la idea de que nuestras creencias afectan nuestro comportamiento. En el contexto del estudio, "
                + "identificar y modificar creencias limitantes (como 'no soy bueno en letras') puede ayudar a los estudiantes a "
                + "adoptar una mentalidad más positiva y abierta, lo que es fundamental para el método 'Ponte 100'.",
        },
        {
            icon: (<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-link-45deg" viewBox="0 0 16 16">
                <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1 1 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4 4 0 0 1-.128-1.287z" />
                <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243z" />
            </svg>),
            title: "Anclaje",
            concept: "Esta técnica del PNL permite crear asociaciones entre un estado emocional positivo y un gesto o acción específica. "
                + "Por ejemplo, un estudiante podría anclar un sentimiento de confianza al repasar un material y luego usar ese gesto antes de "
                + "un examen, lo que puede mejorar su rendimiento.",
        },
        {
            icon: (<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16">
                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
            </svg>),
            title: "Visualización",
            concept: "El PNL utiliza la visualización como una herramienta poderosa para lograr objetivos. Al visualizar el éxito en sus "
                + "estudios o en un examen, los estudiantes pueden aumentar su motivación y enfoque, alineándose con la filosofía del 'Ponte 100'"
                + " de fijar metas altas y trabajar para alcanzarlas.",
        },
        {
            icon: (<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
            </svg>),
            title: "Flexibilidad en el Aprendizaje",
            concept: "El PNL promueve la idea de que no hay un único enfoque para el aprendizaje. Al aplicar esta flexibilidad, los "
                + "estudiantes pueden explorar diferentes estilos de aprendizaje (visual, auditivo, kinestésico) y adaptar el método 'Ponte 100' "
                + "a sus necesidades específicas.",
        },
        {
            icon: (<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-emoji-wink" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                <path d="M4.285 9.567a.5.5 0 0 1 .683.183A3.5 3.5 0 0 0 8 11.5a3.5 3.5 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683M7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5m1.757-.437a.5.5 0 0 1 .68.194.93.93 0 0 0 .813.493c.339 0 .645-.19.813-.493a.5.5 0 1 1 .874.486A1.93 1.93 0 0 1 10.25 7.75c-.73 0-1.356-.412-1.687-1.007a.5.5 0 0 1 .194-.68" />
            </svg>),
            title: "Gestión del Estrés",
            concept: "Técnicas de PNL pueden ayudar a manejar el estrés y la ansiedad relacionados con el estudio y los exámenes. "
                + "Aprender a reprogramar la respuesta emocional ante situaciones estresantes puede permitir a los estudiantes rendir mejor.",
        },
        {
            icon: (<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-chat-right-heart" viewBox="0 0 16 16">
                <path d="M2 1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h9.586a2 2 0 0 1 1.414.586l2 2V2a1 1 0 0 0-1-1zm12-1a2 2 0 0 1 2 2v12.793a.5.5 0 0 1-.854.353l-2.853-2.853a1 1 0 0 0-.707-.293H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2z" />
                <path d="M8 3.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132" />
            </svg>),
            title: "Comunicación Eficaz",
            concept: "El PNL enfatiza la importancia de la comunicación, tanto con uno mismo como con los demás. Esto puede ser útil en "
                + "grupos de estudio o al pedir ayuda, facilitando un entorno de aprendizaje más colaborativo y efectivo.",
        },
        {
            icon: (<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-clipboard-data" viewBox="0 0 16 16">
                <path d="M4 11a1 1 0 1 1 2 0v1a1 1 0 1 1-2 0zm6-4a1 1 0 1 1 2 0v5a1 1 0 1 1-2 0zM7 9a1 1 0 0 1 2 0v3a1 1 0 1 1-2 0z" />
                <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z" />
                <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z" />
            </svg>),
            title: "Metas y Resultados",
            concept: "El enfoque del PNL en la fijación de objetivos claros y específicos se alinea perfectamente con el método "
                + "'Ponte 100', que busca que los estudiantes se enfoquen en el resultado deseado y trabajen de manera estratégica para "
                + "alcanzarlo.",
        },
    ]

    return (
        <div className="flex flex-col min-h-screen bg-white">

            <div className="flex-1 pt-0">

                <section className="mt-6 mx-0 md:mx-10">
                    <div className="mx-auto px-3 max-w-full my-10 md:my-20">
                        <div className="flex flex-wrap items-center">
                            {/* Contenido */}
                            <div className=" w-full md:w-[50%] md:pr-10">
                                <div className="order-2 md:order-1 relative">
                                    <div
                                        className={`space-y-4 text-center md:text-left transition-all duration-1000 ease-in-out translate-y-0"
                        }`}
                                    >
                                        <h1 className="text-xl md:text-5xl font-bold tracking-tight text-green-800">
                                            LA NEUROCIENCIA EDUCATIVA
                                        </h1>

                                        <p className="text-sm md:text-xl text-gray-600 text-justify">
                                            La neurociencia educativa es un campo relativamente nuevo que busca utilizar los principios de la neurociencia
                                            para mejorar el proceso de enseñanza y aprendizaje. Al combinar los conocimientos científicos sobre el
                                            funcionamiento del cerebro con las prácticas educativas, se pretende diseñar métodos de enseñanza más efectivos
                                            y adaptados a las necesidades individuales de los alumnos.
                                        </p>
                                    </div>

                                    {/* Texto adicional con animación más suave */}
                                    <div
                                        className={`transition-all duration-500 overflow-hidden text-center md:text-left ${showMore ? " ease-out max-h-[1000px] " : "max-h-0 "
                                            }`}
                                    >
                                        <p className="text-sm md:text-xl text-gray-600 mt-2 text-justify">
                                            Este enfoque interdisciplinario involucra a neurocientíficos, psicólogos, educadores y otros profesionales
                                            que trabajan juntos para identificar cómo el cerebro procesa la información, memoriza, toma decisiones y
                                            se desarrolla a lo largo del tiempo. Al comprender mejor estas funciones cerebrales, los educadores
                                            pueden implementar estrategias pedagógicas que estimulen de manera óptima el aprendizaje, maximizando
                                            el potencial de cada estudiante.
                                            <br />
                                            <br />
                                            La neurociencia educativa tiene el potencial de revolucionar la forma en que enseñamos y aprendemos,
                                            permitiendo que la educación sea más inclusiva, eficaz y significativa para todos.
                                        </p>
                                    </div>

                                    {/* Botón Leer Más / Leer Menos con desplazamiento más lento */}
                                    <div className={`transition-all duration-1000 ease-out text-center md:text-left ${showMore ? "mt-8" : "mt-4"}`}>
                                        <button
                                            onClick={() => setShowMore(!showMore)}
                                            className="bg-green-700 hover:bg-green-600 text-white px-4 py-2 rounded-xl transition-all"
                                        >
                                            {showMore ? "Leer menos" : "Leer más"}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Imagen fija al lado derecho */}
                            <div className="w-full md:w-[50%] pt-10 md:pt-0">
                                <Image
                                    src="/images/neurociencia.png?height=720&width=1280"
                                    alt="Landing page builder illustration"
                                    width={1280}
                                    height={720}
                                    className="rounded-l-[70px] md:rounded-l-[200px]"
                                    priority // 🔥 Esto optimiza la carga de la image
                                />
                            </div>
                        </div>
                    </div>
                </section>

                <section className="mt-6 mx-0 md:mx-10">
                    <div className="mx-auto px-3 max-w-full my-10 md:my-20">
                        <div className="flex flex-wrap items-center">
                            <div className="">
                                <h2 className="text-xl md:text-3xl font-bold tracking-tighter sm:text-4xl text-center mb-8 text-green-700">
                                    COMO INFLUYE LA NEUROCIENCIA<br /> <span className="text-sm md:text-2xl">EN EL MÉTODO DE ESTUDIO PONTE 100</span>
                                </h2>
                                <p className="text-sm md:text-xl text-gray-600 text-center mb-10">
                                    El método PONTE 100 es una estrategia de estudio que integra elementos de la neurociencia educativa para optimizar el
                                    aprendizaje y la retención de información. El acrónimo PONTE 100 se refiere a los siguientes conceptos clave:
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-6 gap-8">
                                    {arrayUno.map((object, i) => (
                                        <div key={i} className="flex flex-col items-center text-center">
                                            <div className="w-16 h-16 bg-green-800 text-yellow-300 rounded-full flex items-center justify-center mb-4 text-2xl font-bold">
                                                {object.char}
                                            </div>
                                            <h3 className="text-xl font-bold mb-2">{object.title}</h3>
                                            <p className="text-gray-500 dark:text-gray-400 text-justify">{object.concept}</p>
                                        </div>
                                    ))}
                                </div>
                                <p className="text-sm md:text-xl text-gray-600 text-center mt-10">
                                    Al aplicar el método PONTE 100, estás integrando aspectos fundamentales de la neurociencia educativa en tu enfoque
                                    de estudio, lo cual te permitirá optimizar tu aprendizaje, mejorar tu retención de información y potenciar tu
                                    rendimiento académico.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="mt-6 mx-0 md:mx-10">
                    <div className="mx-auto px-3 max-w-full my-10 md:my-20">
                        <div className="flex flex-wrap items-center">
                            {/* Imagen fija al lado derecho */}
                            <div className="md:w-[40%] pt-10 md:pt-0">
                                <Image
                                    src="/images/mano.png?height=720&width=1280"
                                    alt="Landing page builder illustration"
                                    width={1280}
                                    height={720}
                                    className=""
                                />
                            </div>
                            {/* Contenido */}
                            <div className=" w-full md:w-[60%] md:pr-10">
                                <div className="order-2 md:order-1 relative">
                                    <div className="space-y-4 text-center">
                                        <h1 className="text-xl md:text-5xl font-bold tracking-tight text-green-800">
                                            LA PROGRAMA NEUROLINGÜÍSTICO (PNL)
                                        </h1>

                                        <p className="text-sm md:text-xl text-gray-600 text-justify">
                                            La neurociencia educativa es un campo relativamente nuevo que busca utilizar los principios de la neurociencia
                                            para mejorar el proceso de enseñanza y aprendizaje. Al combinar los conocimientos científicos sobre el
                                            funcionamiento del cerebro con las prácticas educativas, se pretende diseñar métodos de enseñanza más efectivos
                                            y adaptados a las necesidades individuales de los alumnos.
                                            <br /><br />
                                            La PNL, es una forma de cambiar los pensamientos y hábitos de una persona para que sean exitosos por medio de
                                            técnicas de percepción, comportamiento y comunicación. Es un enfoque pseudocientífico basado en conexiones
                                            neuronales, específicamente, en cómo procesan el lenguaje.
                                            <br /><br />
                                            La PNL, se basa en la premisa de que la forma en que percibimos el mundo y nos comunicamos con nosotros
                                            mismos y con los demás influye en nuestra conducta y en nuestras emociones. En resumen, el Programa
                                            Neurolingüístico ofrece una serie de herramientas prácticas y estrategias para potenciar el crecimiento
                                            personal, mejorar la comunicación, superar obstáculos y alcanzar el éxito en diferentes áreas de la vida

                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="mt-6 mx-0 md:mx-10">
                    <div className="mx-auto px-3 max-w-full my-10 md:my-20">
                        <div className="flex flex-wrap items-center">
                            <div className="">
                                <h2 className="text-xl md:text-3xl font-bold tracking-tighter sm:text-4xl text-center mb-8 text-green-700">
                                    COMO INFLUYE LA PROGRAMACIÓN NEURO LINGUISTICO – PNL<br />
                                    <span className="text-sm md:text-2xl">EN EL MÉTODO DE ESTUDIO PONTE 100</span>
                                </h2>
                                <p className="text-sm md:text-xl text-gray-600 text-center mb-10">
                                    El PNL (Programación Neurolingüística) puede influir de manera significativa en el método de estudio &quot;Ponte 100&quot;,
                                    que se centra en la motivación, la gestión del tiempo y la eficacia en el aprendizaje. A continuación, se
                                    presentan algunas maneras en que el PNL puede complementar y mejorar este método de estudio:
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    {arrayDos.map((object, i) => (
                                        <div key={i} className="bg-white p-6 rounded-lg shadow-md">
                                            <p className="mb-4 text-green-700 font-bold md:text-xl">
                                                {object.title}
                                            </p>

                                            <div className="flex items-center">
                                                <div className="w-[10%] ">
                                                    <div className="w-10 h-10 bg-green-700 rounded-full mr-4 flex items-center justify-center">
                                                        <div className="text-yellow-300">
                                                            {object.icon}
                                                        </div>

                                                    </div>
                                                </div>

                                                <div className="w-[90%] ml-8 md:ml-2">
                                                    <p className="text-sm text-gray-500">{object.concept}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <p className="text-sm md:text-xl text-gray-600 text-center mt-10">
                                    Integrar técnicas de PNL en el método de estudio &quot;Ponte 100&quot; puede potenciar la efectividad del aprendizaje,
                                    aumentar la motivación y mejorar el rendimiento general de los estudiantes.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Main;