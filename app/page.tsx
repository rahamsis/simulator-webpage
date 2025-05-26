'use client'
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

const Main = () => {

    const arrayFundamento = [
        {
            imagen: "/images/fundamentos/fundamento1.png",
            title: "Neurociencia Educativa",
            concept: "Descubre cómo aprende tu cerebro y mejora tu aprendizaje con ciencia, psicología y educación."
        },
        {
            imagen: "/images/fundamentos/fundamento2.png",
            title: "Neuroplasticidad",
            concept: "Tu cerebro puede cambiar y mejorar constantemente. Con práctica, puedes fortalecer y desarrollar habilidades sin importar tu edad."
        },
        {
            imagen: "/images/fundamentos/fundamento3.png",
            title: "Programación Neurolingüística",
            concept: "Conecta lenguaje, mente y acción. En PONTE 100® la usamos para motivarte y personalizar tu aprendizaje."
        },
    ]

    const arrayActividades = [
        {
            imagen: "/assets/frames/frame2.png",
            titulo: "Zona de Estudio",
            progress: 85,
        },
        {
            imagen: "/assets/frames/frame3.png",
            titulo: "Practica un tema",
            progress: 5,
        },
        {
            imagen: "/assets/frames/frame4.png",
            titulo: "Genera tu primer simulacro ilimitado",
            progress: 75,
        },
        {
            imagen: "/assets/frames/frame5.png",
            titulo: "Examen preguntas falladas",
            progress: 50,
        },
        {
            imagen: "/assets/frames/frame6.png",
            titulo: "Exámenes genera tu primera práctica",
            progress: 5,
        },
        {
            imagen: "/assets/frames/frame7.png",
            titulo: "Exámenes no repetidos",
            progress: 80,
        }
    ]

    const arrayUsers = [
        {
            profile: "/images/avatar-1.png",
            name: "Rosario Calderon",
            message: 'El método de estudio Ponte 100® me ayudó a comprender los conceptos de forma clara y efectiva. Destaco también al docente, ' +
                'cuya paciencia, entrega y motivación fueron claves para seguir adelante y luchar por el ascenso. ¡Gracias por tanto apoyo y enseñanza!.',
        },
        {
            profile: "/images/avatar-2.png",
            name: "Manuel Alfaro",
            message: 'Gracias a Ponte 100® aprendí a estudiar con estrategia. Las clases eran muy claras y dinámicas.',

        },
        {
            profile: "/images/avatar-3.png",
            name: "Angel Carlos",
            message: 'Nunca había sentido tanta seguridad al rendir una prueba. ¡Totalmente recomendado!',
        },
        {
            profile: "/images/avatar-4.png",
            name: "Mario Peña",
            message: 'El método de estudio Ponte 100® me ayudó a comprender los conceptos de forma clara y efectiva. Destaco también al docente, ' +
                'cuya paciencia, entrega y motivación fueron claves para seguir adelante y luchar por el ascenso. ¡Gracias por tanto apoyo y enseñanza!.',
        },
        {
            profile: "/images/avatar-1.png",
            name: "Mario Peña",
            message: 'Nunca había sentido tanta seguridad al rendir una prueba. ¡Totalmente recomendado!',
        }
    ]

    const arrayCeremonias = [
        {
            imagen: "/images/ceremonia/imagen1.png"
        },
        {
            imagen: "/images/ceremonia/imagen2.png"
        },
        {
            imagen: "/images/ceremonia/imagen3.png"
        },
        {
            imagen: "/images/ceremonia/imagen4.png"
        },
        {
            imagen: "/images/ceremonia/imagen5.png"
        }
    ]

    // Inicio del carrusel de fundamentos cientificos
    const [current, setCurrent] = useState(0);
    const total = arrayFundamento.length;

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % total);
        }, 5000); // cada 5s

        return () => clearInterval(interval);
    }, [total]);
    // Fin del carrusel de fundamentos científicos

    // Inicio de la sección del carrusel de usuarios
    const [currentIndexUser, setCurrentIndexUser] = useState(0)

    const nextSlide = () => {
        setCurrentIndexUser((prevIndex) => (prevIndex + 1) % arrayUsers.length)
    }

    const prevSlide = () => {
        setCurrentIndexUser((prevIndex) =>
            prevIndex === 0 ? arrayUsers.length - 1 : prevIndex - 1
        )
    }

    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide()
        }, 7000)

        return () => clearInterval(interval)
    }, [nextSlide])
    // Fin de la seccion del carrusel de usuarios

    // Inicio del carrusel de ceremonias
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            if (containerRef.current) {
                containerRef.current.scrollLeft += containerRef.current.clientWidth / 5;
            }
        }, 5000); // cada 5 segundos

        return () => clearInterval(interval);
    }, []);

    const duplicatedImages = [...arrayCeremonias, ...arrayCeremonias];
    // Fin del carrusel de ceremonias

    return (
        <div className="flex flex-col min-h-screen bg-white">
            <div className="">
                <Image className="hidden lg:block absolute left-0 top-[40%] xl:top-[50%] 2xl:top-[50%]" src="/assets/frames/frame.png" width="103" height="98" alt="" priority />
                <Image className="hidden lg:block absolute right-0 top-[10%] xl:top-[15%] 2xl:top-[10%]" src="/assets/frames/frame.png" width="103" height="98" alt="" priority />
            </div>
            <div className="flex-1">
                <section className="mt-6 mx-5 lg:mx-28">
                    <div className="mx-auto px-3 max-w-full my-10 md:my-20">
                        <div className="flex flex-wrap items-center">

                            {/* Imagen fija al lado derecho */}
                            <div className="w-full md:pt-0 xl:hidden">
                                <Image
                                    src="/images/home_principal.png"
                                    alt="Landing page builder illustration"
                                    width={510}
                                    height={277}
                                    className=""
                                    priority // 🔥 Esto optimiza la carga de la image
                                />
                            </div>

                            {/* Contenido */}
                            <div className=" w-full xl:w-[50%] md:pr-10 pt-10 xl:pt-0">
                                <div className="order-2 md:order-1 relative">
                                    <div className={`space-y-4 text-center md:text-left transition-all duration-1000 ease-in-out translate-y-0"}`}>
                                        <h1 className="text-xl lg:text-[40px] md:leading-10 2xl:text-5xl font-bold tracking-tight text-button">
                                            ¡Prepárate para tus exámenes con el poder de la neurociencia!
                                        </h1>

                                        <p className="text-sm md:text-xl text-primary text-justify">
                                            Conoce el método PONTE 100®, diseñado con neurociencia educativa para que estudies de forma más eficiente.
                                        </p>
                                    </div>

                                    {/* Botón Leer Más / Leer Menos con desplazamiento más lento */}
                                    <div className={`justify-center xl:justify-start space-x-5 pt-10 flex flex-row `}>
                                        <button className="bg-green-700 hover:bg-green-600 text-white px-7 py-4 md:px-5 md:py-5 rounded-xl transition-all md:hidden">
                                            Comenzar
                                        </button>
                                        <button className="bg-green-700 hover:bg-green-600 text-white px-3 py-4 md:px-5 md:py-5 rounded-xl transition-all hidden md:block">
                                            Comenzar ahora
                                        </button>

                                        <button className="bg-white border border-green-600 text-green-600 px-3 py-3 md:px-5 md:py-4 rounded-xl">
                                            <span className="flex flex-row items-center">
                                                <label className="mr-3">Ver video</label>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-play-fill" viewBox="0 0 16 16">
                                                    <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393" />
                                                </svg>
                                            </span>

                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Imagen fija al lado derecho */}
                            <div className="w-full md:w-[50%] pt-10 md:pt-0 hidden xl:block">
                                <Image
                                    src="/images/home_principal.png?height=720&width=1280"
                                    alt="Landing page builder illustration"
                                    width={1280}
                                    height={720}
                                    className=""
                                    priority // 🔥 Esto optimiza la carga de la image
                                />
                            </div>
                        </div>
                    </div>
                </section>

                <section className="bg-postbanner hidden lg:block">
                    <div className="py-10 lg:py-24 md:mx-28 max-w-full my-10 md:my-20">
                        <div className="flex flex-wrap items-center mx-8 lg:mx-3">
                            <div className="mx-auto ">
                                <h2 className="text-xl md:text-3xl font-bold tracking-tighter sm:text-4xl text-center mb-8 text-button">
                                    Nuestros fundamentos científicos
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                                    {arrayFundamento.map((object, i) => (
                                        <div key={i} className="flex flex-col bg-white rounded-xl items-start p-10 text-left shadow-lg">
                                            <div className="rounded-lg">
                                                <Image
                                                    src={object.imagen}
                                                    alt="fundamentos"
                                                    width={80}
                                                    height={720}
                                                    className="mb-8"
                                                />
                                            </div>
                                            <h3 className="text-xl font-bold mb-4 text-primary">{object.title}</h3>
                                            <p className="text-black font-semibold text-justify">{object.concept}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="bg-postbanner lg:hidden">
                    <div className="py-10 max-w-full my-10">
                        <div className="flex flex-wrap items-center mx-8">
                            <div className="mx-auto">
                                <h2 className="text-xl md:text-3xl font-bold tracking-tighter sm:text-4xl text-center mb-8 text-button">
                                    Nuestros fundamentos científicos
                                </h2>

                                <div className="relative w-full">
                                    {arrayFundamento.map((object, i) => (
                                        <div
                                            key={i}
                                            className={`transition-opacity duration-700 absolute top-0 left-0 w-full ${i === current ? 'opacity-100 relative' : 'opacity-0'
                                                }`}
                                        >
                                            <div className="flex flex-col bg-white rounded-xl items-start p-6 mx-4 text-left shadow-lg">
                                                <div className="rounded-lg">
                                                    <Image
                                                        src={object.imagen}
                                                        alt="fundamentos"
                                                        width={80}
                                                        height={80}
                                                        className="mb-4"
                                                    />
                                                </div>
                                                <h3 className="text-xl font-bold mb-2 text-primary">{object.title}</h3>
                                                <p className="text-black font-semibold text-justify">{object.concept}</p>
                                            </div>
                                        </div>
                                    ))}

                                    {/* Puntos indicadores */}
                                    <div className="flex justify-center mt-6 space-x-2">
                                        {arrayFundamento.map((_, i) => (
                                            <button
                                                key={i}
                                                onClick={() => setCurrent(i)}
                                                className={`w-3 h-3 rounded-full ${i === current ? 'bg-primary' : 'bg-gray-400'
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="bg-white">
                    <div className="my-10 lg:my-24 md:mx-28 max-w-full md:my-20">
                        <div className="bg-secondary rounded-2xl mx-8 lg:mx-0 lg:pb-20">
                            <div className="flex flex-col lg:flex-row items-center justify-center p-5 lg:p-20">
                                <div className="lg:w-1/2 w-full text-center lg:text-left">
                                    <h2 className="text-terciary font-bold text-lg lg:text-4xl">
                                        Alcanza tus metas con nuestra tecnologia
                                    </h2>
                                </div>
                                <div className="lg:w-1/2 w-full text-center lg:text-left">
                                    <p className="text-white text-justify font-medium text-xs lg:text-lg mt-4 lg:mt-0">
                                        Alcanza tus metas con nuestra metodología diseñada para fortalecer tu mente, mejorar tu memoria y agilidad mental mediante ejercicios efectivos y desafiantes.
                                    </p>
                                </div>
                            </div>

                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 mx-8 lg:mx-12 lg:-mt-28">
                            <div className="bg-white p-8 rounded-2xl shadow-md">
                                <div className="bg-postbanner p-4 mb-4 rounded-3xl">
                                    <Image
                                        src="/images/actividades1.png"
                                        alt="actividades"
                                        width={500}
                                        height={500}
                                        className="" />
                                </div>
                                <div>
                                    <div className="pt-4">
                                        <label className="bg-lightgreen px-5 py-2 rounded-3xl text-white">Actividades</label>
                                    </div>
                                    <div className="pt-4">
                                        <p className="text-primary font-medium text-lg">
                                            Refuerza tu preparación con preguntas clave, temarios actualizados y simuladores tipo SIECOPOL.
                                            Familiarízate con el formato del examen y fortalece tu mente
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white p-8 rounded-2xl shadow-md">
                                <div className="bg-gray5 p-4 mb-4 rounded-3xl">
                                    <div className="grid grid-cols-2 gap-4">
                                        {arrayActividades.map((actividad, i) => (
                                            <div key={i} className="bg-white rounded-lg items-start">
                                                <div className="p-2">
                                                    <Image
                                                        src={actividad.imagen}
                                                        alt={actividad.titulo}
                                                        width={25}
                                                        height={25}
                                                        className=""
                                                    ></Image>
                                                </div>
                                                <div className="text-left px-2 ">
                                                    <h3 className="text-[8px] font-semibold">{actividad.titulo}</h3>

                                                </div>
                                                <div className="flex space-x-4 bg-cover bg-center px-2 ">
                                                    <div className="flex-grow bg-gray-200 my-1 rounded-full h-1 overflow-hidden">
                                                        <div
                                                            className="bg-lightgreen h-full rounded-full transition-all"
                                                            style={{ width: `${actividad.progress}%` }}
                                                        ></div>
                                                    </div>
                                                </div>
                                                <div className="flex flex-row justify-between items-center px-2 pb-2">
                                                    <div className="text-[8px] text-black font-bold">progreso</div>
                                                    <span className="text-[8px] font-bold">{actividad.progress}%</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                </div>
                                <div>
                                    <div className="pt-4">
                                        <label className="bg-secondary px-5 py-2 rounded-3xl text-white">Progreso</label>
                                    </div>
                                    <div className="pt-4">
                                        <p className="text-primary font-medium text-lg">
                                            Tú decides hasta dónde llegar. Revisa tu avance y continúa superándote.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white p-8 rounded-2xl shadow-md">
                                <div className="bg-postbanner p-4 mb-4 rounded-3xl">
                                    <Image
                                        src="/images/actividades2.png"
                                        alt="actividades"
                                        width={500}
                                        height={500}
                                        className="" />
                                </div>
                                <div>
                                    <div className="pt-4">
                                        <label className="bg-button px-5 py-2 rounded-3xl text-white">Control de habilidad</label>
                                    </div>
                                    <div className="pt-4">
                                        <p className="text-primary font-medium text-lg">
                                            Pon a prueba tu mente con ejercicios diseñados para mejorar tu memoria. Resuelve preguntas contra el tiempo y asociación de  palabras.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white p-8 rounded-2xl shadow-md">
                                <div className="flex flex-row bg-postbanner p-4 mb-4 rounded-3xl">
                                    <div className="w-2/5 mr-4">
                                        {
                                            Array.from({ length: 4 }).map((_, index) => (
                                                <div key={index} className="flex flex-row bg-white my-2 rounded-lg shadow-md">
                                                    <div className="flex justify-center py-5 text-button px-2">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-file-earmark-pdf-fill" viewBox="0 0 16 16">
                                                            <path d="M5.523 12.424q.21-.124.459-.238a8 8 0 0 1-.45.606c-.28.337-.498.516-.635.572l-.035.012a.3.3 0 0 1-.026-.044c-.056-.11-.054-.216.04-.36.106-.165.319-.354.647-.548m2.455-1.647q-.178.037-.356.078a21 21 0 0 0 .5-1.05 12 12 0 0 0 .51.858q-.326.048-.654.114m2.525.939a4 4 0 0 1-.435-.41q.344.007.612.054c.317.057.466.147.518.209a.1.1 0 0 1 .026.064.44.44 0 0 1-.06.2.3.3 0 0 1-.094.124.1.1 0 0 1-.069.015c-.09-.003-.258-.066-.498-.256M8.278 6.97c-.04.244-.108.524-.2.829a5 5 0 0 1-.089-.346c-.076-.353-.087-.63-.046-.822.038-.177.11-.248.196-.283a.5.5 0 0 1 .145-.04c.013.03.028.092.032.198q.008.183-.038.465z" />
                                                            <path fill-rule="evenodd" d="M4 0h5.293A1 1 0 0 1 10 .293L13.707 4a1 1 0 0 1 .293.707V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2m5.5 1.5v2a1 1 0 0 0 1 1h2zM4.165 13.668c.09.18.23.343.438.419.207.075.412.04.58-.03.318-.13.635-.436.926-.786.333-.401.683-.927 1.021-1.51a11.7 11.7 0 0 1 1.997-.406c.3.383.61.713.91.95.28.22.603.403.934.417a.86.86 0 0 0 .51-.138c.155-.101.27-.247.354-.416.09-.181.145-.37.138-.563a.84.84 0 0 0-.2-.518c-.226-.27-.596-.4-.96-.465a5.8 5.8 0 0 0-1.335-.05 11 11 0 0 1-.98-1.686c.25-.66.437-1.284.52-1.794.036-.218.055-.426.048-.614a1.24 1.24 0 0 0-.127-.538.7.7 0 0 0-.477-.365c-.202-.043-.41 0-.601.077-.377.15-.576.47-.651.823-.073.34-.04.736.046 1.136.088.406.238.848.43 1.295a20 20 0 0 1-1.062 2.227 7.7 7.7 0 0 0-1.482.645c-.37.22-.699.48-.897.787-.21.326-.275.714-.08 1.103" />
                                                        </svg>
                                                    </div>
                                                    <div className="py-2 px-2 w-full">
                                                        <div className="rounded-lg bg-gray-100 py-1 my-1"></div>
                                                        <div className="rounded-lg w-3/4 bg-gray-100 py-1 my-1"></div>
                                                        <div className="flex justify-between">
                                                            <div className=""></div>
                                                            <div className="text-button">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-download" viewBox="0 0 16 16">
                                                                    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                                                                    <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        }

                                    </div>
                                    <div className="w-3/5 bg-white shadow-lg border border-gray-200 rounded-xl pt-4 px-4 pb-0 text-center">
                                        <h1 className="text-button text-[10px] font-bold pt-4">CONSTITUCIÖN POLITICA DEL PERÚ</h1>
                                        <h3 className="text-secondary font-bold text-[8px] pt-2">Total de preguntas: 228</h3>
                                        <div className="pt-2">
                                            {
                                                Array.from({ length: 6 }).map((_, index) => (
                                                    <div key={index} className="bg-gray-100 py-4 rounded-md my-2">
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="pt-4">
                                        <label className="bg-primary px-5 py-2 rounded-3xl text-white">Material didáctico</label>
                                    </div>
                                    <div className="pt-4">
                                        <p className="text-primary font-medium text-lg">
                                            Accede a todo el material que necesitas: preguntas, balotario y temario completo y actualizado.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="bg-button relative">

                    {/* Flechas para desktop */}
                    {/* Botón Izquierdo */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-2 lg:left-10 top-1/2 transform -translate-y-1/2 z-10 hidden lg:block text-white text-3xl px-3 py-2 bg-white/20 w-14 h-14 rounded-full hover:bg-white/40 transition"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
                        </svg>
                    </button>

                    {/* Botón Derecho */}
                    <button
                        onClick={nextSlide}
                        className="absolute right-2 lg:right-10 top-1/2 transform -translate-y-1/2 z-10 hidden lg:block text-white text-3xl px-3 py-2 bg-white/20 w-14 h-14 rounded-full hover:bg-white/40 transition"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8" />
                        </svg>
                    </button>

                    <div className="py-10 lg:py-18 lg:mx-28 max-w-full my-8 ">
                        <div className="flex flex-wrap items-center px-8">
                            {/* Titulo */}
                            <div className="text-center lg:px-20 hidden lg:block">
                                <h1 className="text-white text-4xl">
                                    Descubre lo que otros están logrando al transformar su forma de
                                    aprender
                                </h1>
                            </div>
                            {/* Titulo Mobile */}
                            <div className="text-center mx-auto lg:hidden">
                                <h1 className="text-white text-2xl">
                                    Nuestros fundamentos científicos
                                </h1>
                            </div>

                            {/* Carrusel */}
                            <div className="flex flex-col lg:flex-col pt-16 mx-4 relative w-full items-center">
                                <div className="w-full flex flex-col-reverse lg:flex-row justify-center items-center">

                                    <div className="pt-5 lg:hidden">
                                        <p className="text-white font-bold">
                                            {arrayUsers[currentIndexUser].name}
                                        </p>
                                    </div>

                                    {/* Imagen activa */}
                                    <div className="lg:w-1/4 pt-10 lg:pt-0 rounded-full">
                                        <Image
                                            src={arrayUsers[currentIndexUser].profile}
                                            alt="Avatar"
                                            width={200}
                                            height={100}
                                            className="transition-opacity duration-1000 ease-in-out"
                                        />
                                    </div>

                                    {/* Contenido */}
                                    <div className="w-full lg:w-3/4 md:pl-8">
                                        <div className="relative">
                                            <div className="space-y-4 text-center">
                                                <p className="text-sm lg:text-xl text-white text-justify transition-all duration-1000 ease-in-out">
                                                    {arrayUsers[currentIndexUser].message}
                                                </p>
                                            </div>
                                            <div className="pt-5 hidden lg:block">
                                                <p className="text-white font-bold">
                                                    {arrayUsers[currentIndexUser].name}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full">
                                    <div className="w-1/4">
                                    </div>
                                    {/* Avatares fijos con opacidad */}
                                    <div className="hidden w-3/4 float-right lg:block">
                                        <div className="grid grid-cols-5 gap-6 pt-10 justify-center">
                                            {arrayUsers.map((object, i) => (
                                                <div key={i} className="flex flex-col items-center">
                                                    <Image
                                                        src={object.profile}
                                                        alt={object.name}
                                                        width={60}
                                                        height={60}
                                                        className={`rounded-full transition-opacity duration-500 ${i === currentIndexUser ? 'opacity-100' : 'opacity-30'
                                                            }`}
                                                    />
                                                    <p
                                                        className={`text-sm text-white mt-2 ${i === currentIndexUser ? 'font-bold' : 'opacity-50'
                                                            }`}
                                                    >
                                                        {object.name.split(',')[0]}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Flechas móviles (visibles abajo) */}
                    <div className="flex justify-center gap-6 lg:hidden pb-6">
                        <button
                            onClick={prevSlide}
                            className="text-white text-3xl px-3 py-2 bg-white/20 w-12 h-12 rounded-full hover:bg-white/40 transition"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
                            </svg>
                        </button>

                        <button
                            onClick={nextSlide}
                            className="text-white text-3xl px-3 py-2 bg-white/20 w-12 h-12 rounded-full hover:bg-white/40 transition"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8" />
                            </svg>
                        </button>
                    </div>
                </section>

                <section className="bg-white">
                    <div className="py-10 md:mx-28 max-w-full">
                        <div>
                            <div className="items-center text-center">
                                <h2 className="text-button text-lg lg:text-3xl font-bold">Ceremonias de ascenso de grado</h2>
                            </div>
                            <div className="items-center text-center">
                                <p className="py-4 text-base lg:text-xl">
                                    El método PONTE 100 ha contribuido significativamente en la preparación de los postulantes para el examen de ascenso de grado de la Policía Nacional del Perú.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="overflow-hidden w-full bg-white pb-6 lg:pb-16">
                    <div
                        className="flex w-max animate-scroll gap-4"
                        ref={containerRef}
                        style={{ animation: "scroll 25s linear infinite" }}
                    >
                        {duplicatedImages.map((item, index) => (
                            <div key={index} className="min-w-[20vw] flex-shrink-0">
                                <Image
                                    src={item.imagen}
                                    alt={`Imagen ${index + 1}`}
                                    width={800}
                                    height={500}
                                    className="w-full h-auto object-cover"
                                />
                            </div>
                        ))}
                    </div>

                    <style jsx>{`@keyframes scroll {0% {transform: translateX(0);}100% {transform: translateX(-50%);}}`}</style>
                </section>
            </div>
        </div>
    )
}

export default Main;