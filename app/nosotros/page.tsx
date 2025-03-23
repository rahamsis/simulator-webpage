import Link from "next/link";
import React from "react";
import Image from "next/image";

function CommonHero() {
    return (
        <section className="page-hero py-16 bg-white/50 px-5">
            <div className="mx-auto px-3 max-w-[1202px]">
                <div className="text-center">
                    <ul className="breadcrumb inline-flex h-8 items-center justify-center space-x-2 rounded-3xl bg-theme-light px-4 py-2">
                        <li className="leading-none text-dark border">
                            <div className="inline-flex items-center text-center align-middle text-primary">
                                <svg className="mr-1.5 -mt-1" width="15" height="15" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13.1769 15.0588H10.3533V9.41178H5.64744V15.0588H2.82391V6.58825H1.88274V16H14.118V6.58825H13.1769V15.0588ZM6.58862 15.0588V10.353H9.41215V15.0588H6.58862ZM15.8084 6.09225L15.2512 6.85178L8.00038 1.52472L0.749559 6.8499L0.192383 6.09131L8.00038 0.357666L15.8084 6.09225Z" fill="black"></path>
                                </svg>
                                <Link href="/cursos" className="text-sm leading-none text-orange-600 font-medium">Inicio</Link>
                            </div>
                        </li>
                        <li className="leading-none text-dark border">
                            <Link className="text-sm leading-none" href="/contactanos">/ Contactanos</Link>
                        </li>
                    </ul>
                </div>
                <div className="page-hero-content mx-auto max-w-[768px] text-center">
                    <h1 className="mb-5 mt-8 font-serif text-5xl font-bold leading-tight text-gray-900">Ponte 100</h1>
                    <p className="text-justify">
                    El método de estudio PONTE 100™©, aprobado con RESOLUCIÓN N°3094-2023/DDA-INDECOPI del 20DIC2023, REGISTRO DE PROPIEDAD INDUSTRIAL CERTIFICADO 
                    N°00154860, RESOLUCIÓN N°009022-2024/DSD-INDECOPI del  26MAR2024; es una estrategia educativa y de desarrollo personal que se centra en ayudar a 
                    las personas a alcanzar sus metas y objetivos a través de la autoevaluación, la motivación y la acción, empleando técnicas de estudio para 
                    mejorar la memoria y la retención de información a través de la creación de asociación de palabras en preguntas y respuestas, estas palabras 
                    deben ser significativas y fáciles de visualizar. Este método es efectivo porque apela a la imaginación y a la creatividad, facilitando que tu 
                    cerebro recuerde la información de manera más efectiva. Este método se adapta según tus necesidades y preferencias que estés intentando 
                    recordar.
                    </p>
                    <div className="mt-11 justify-center sm:flex">
                        <Link className="h-[52px] px-8 py-2 text-sm leading-9 cursor-pointer rounded-[50px] text-center font-medium text-white bg-gradient-to-t from-[#d4ecef] to-[#00a5be] m-3 block sm:inline-block" href="/contactanos">Cotiza con nosotros</Link>
                        <a className="h-[52px] px-8 text-sm leading-9 relative rounded-[50px] border border-cyan-500 bg-transparent py-[7px] text-center capitalize text-gray-900 font-medium m-3 block min-w-[160px] sm:inline-block" href="/blog">Nuestro blog</a>
                    </div>
                </div>
            </div>
        </section>
    );
}

function Gallery() {
    return (
        <section className="py-16">
            <div className="mx-auto px-3 max-w-[1202px]">
                <div className="flex flex-wrap justify-center text-center">
                    <div className="w-[66.67%]">
                        <h2 className="text-3xl lg:text-[2.41rem] font-serif font-bold leading-tight text-gray-900">Empezamos un simple objetivo: Hacer de tu piso mas reluciente</h2>
                    </div>
                </div>
                <div className="flex flex-wrap mt-2.5">
                    <div className="md:w-1/2 px-4">
                        <div className="relative mt-8">
                            <Image className="w-full object-cover" width="480" height="328" src="assets/nosotros/img1.png" alt="" />
                        </div>
                        <div className="relative mt-8">
                            <Image className="w-full object-cover" width="480" height="274" src="assets/nosotros/img2.png" alt="" />
                            <Image className="absolute -bottom-5 -left-5 -z-[1] h-16 w-16" src="assets/shape-2.png" alt="" />
                        </div>
                    </div>
                    <div className="md:w-1/2 px-4">
                        <div className="relative mt-8">
                            <Image className="w-full object-cover" width="480" height="540" src="assets/nosotros/img3.png" alt="" />
                            <Image className="absolute -bottom-4 -right-5 -z-[1] h-16 w-16" src="assets/shape.png" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function Work() {
    return (
        <section className="py-16">
            <div className="mx-auto px-3 max-w-[1202px]">
                <div className="lg:flex lg:flex-wrap items-center justify-between">
                    <div className=" md:w-[41.67%]">
                        <h2 className="text-center md:text-left text-[30px] lg:text-[2.41rem] font-bold font-serif leading-tight">
                            Nuestros 6 puntos claves <br />
                            de nuestra empresa
                        </h2>
                    </div>
                    <div className="mt-6 text-center md:w-1/4 md:mt-0 md:text-right">
                        <a className="inline-block h-[52px] px-8 py-3 text-sm leading-9 cursor-pointer rounded-[50px] text-center font-medium text-white bg-gradient-to-t from-[#d4ecef] to-[#00a5be]" href="#">Visita Nuestro Blog</a>
                    </div>
                </div>
                <div className="flex flex-wrap mt-14">
                    <div className="px-4 mb-8 sm:w-1/20 lg:w-[33.33%]">
                        <div className="rounded-xl bg-white p-6 shadow-lg lg:p-8">
                            <div className="gradient-number relative inline-block">
                                <span className="bg-clip-text font-sans text-4xl font-bold leading-none text-transparent bg-gradient-to-t from-start to-end absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">01</span>
                                <Image src="assets/gradient-number-bg.png" height={90} width={90} alt="" />
                            </div>
                            <h4 className="my-6 text-2xl font-bold leading-tight text-gray-900">Experiencia</h4>
                            <p className="text-gray-500">
                                Contamos con una sólida experiencia en este campo. La pericia técnica y el conocimiento profundo del proceso de pulido son esenciales para lograr resultados de alta calidad en nuestro servicio.
                            </p>
                        </div>
                    </div>
                    <div className="px-4 mb-8 sm:w-1/20 lg:w-[33.33%]">
                        <div className="rounded-xl bg-white p-6 shadow-lg lg:p-8">
                            <div className="gradient-number relative inline-block">
                                <span className="bg-clip-text font-sans text-4xl font-bold leading-none text-transparent bg-gradient-to-t from-start to-end absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">02</span>
                                <Image src="assets/gradient-number-bg.png" height={90} width={90} alt="" />
                            </div>
                            <h4 className="my-6 text-2xl font-bold leading-tight text-gray-900">Equipamento</h4>
                            <p className="text-gray-500">
                                Adoptamos tecnología y herramientas modernas para garantizar un pulido eficiente y de alta precisión e invertimos en equipos avanzados demostrando un compromiso con la excelencia en sus servicios.
                            </p>
                        </div>
                    </div>
                    <div className="px-4 mb-8 sm:w-1/20 lg:w-[33.33%]">
                        <div className="rounded-xl bg-white p-6 shadow-lg lg:p-8">
                            <div className="gradient-number relative inline-block">
                                <span className="bg-clip-text font-sans text-4xl font-bold leading-none text-transparent bg-gradient-to-t from-start to-end absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">03</span>
                                <Image src="assets/gradient-number-bg.png" height={90} width={90} alt="" />
                            </div>
                            <h4 className="my-6 text-2xl font-bold leading-tight text-gray-900">Innovacion</h4>
                            <p className="text-gray-500">
                                Ofrecemos una gama completa de servicios relacionados, como sellado, abrillantado y restauración de pisos de granito,etc proporcionando soluciones integrales para el mantenimiento de superficies de piedra.
                            </p>
                        </div>
                    </div>
                    <div className="px-4 mb-8 sm:w-1/20 lg:w-[33.33%]">
                        <div className="rounded-xl bg-white p-6 shadow-lg lg:p-8">
                            <div className="gradient-number relative inline-block">
                                <span className="bg-clip-text font-sans text-4xl font-bold leading-none text-transparent bg-gradient-to-t from-start to-end absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">04</span>
                                <Image src="assets/gradient-number-bg.png" height={90} width={90} alt="" />
                            </div>
                            <h4 className="my-6 text-2xl font-bold leading-tight text-gray-900">Excelencia</h4>
                            <p className="text-gray-500">
                                Utilizamos productos de calidad en el proceso de pulido y acabado. Seleccionamos cuidadosamente los productos que a futuro demuestran un compromiso con resultados duraderos y una buena satisfacción del cliente en el servicio.
                            </p>
                        </div>
                    </div>
                    <div className="px-4 mb-8 sm:w-1/20 lg:w-[33.33%]">
                        <div className="rounded-xl bg-white p-6 shadow-lg lg:p-8">
                            <div className="gradient-number relative inline-block">
                                <span className="bg-clip-text font-sans text-4xl font-bold leading-none text-transparent bg-gradient-to-t from-start to-end absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">05</span>
                                <Image src="assets/gradient-number-bg.png" height={90} width={90} alt="" />
                            </div>
                            <h4 className="my-6 text-2xl font-bold leading-tight text-gray-900">Buen Servicio</h4>
                            <p className="text-gray-500">
                                Brindamos un excelente servicio al cliente , desde la consulta inicial hasta la finalización del proyecto. Oimos las necesidades específicas del cliente y brindamos soluciones personalizadas creando reputación y lealtad del cliente.
                            </p>
                        </div>
                    </div>
                    <div className="px-4 mb-8 sm:w-1/20 lg:w-[33.33%]">
                        <div className="rounded-xl bg-white p-6 shadow-lg lg:p-8">
                            <div className="gradient-number relative inline-block">
                                <span className="bg-clip-text font-sans text-4xl font-bold leading-none text-transparent bg-gradient-to-t from-start to-end absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">06</span>
                                <Image src="assets/gradient-number-bg.png" height={90} width={90} alt="" />
                            </div>
                            <h4 className="my-6 text-2xl font-bold leading-tight text-gray-900">Responsbilidad</h4>
                            <p className="text-gray-500">
                            Cuidamos el medio ambiente adoptando de prácticas sostenibles, como el uso de productos ecológicos y la minimización de residuos, puede ser un diferenciador clave en la elección de los clientes conscientes del medio ambiente.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function Members() {
    return (
        <section className="py-16">
            <div className="mx-auto px-3 max-w-[1202px]">
                <div className="flex flex-wrap">
                    <div className="mx-auto text-center lg:w-1/2">
                        <h2 className="text-[30px] lg:text-[2.41rem] font-serif font-bold leading-tight text-gray-900">Este es nuestro equipo de trabajo</h2>
                        <p className="mt-4 text-gray-500">
                            Personas decdicadas al servicio brindado con alta experiencia en el rubro
                        </p>
                    </div>
                </div>
                <div className="lg:flex lg:flex-wrap mt-12 justify-center">
                    <div className="lg:w-[83.34%]">
                        <div className="lg:flex lg:flex-wrap">
                            <div className="mb-6 flex flex-col px-6 text-center sm:w-1/2 lg:w-[33.33%] sm:items-center">
                                <div className="member-avatar inline-flex justify-center">
                                    <Image className="rounded-full h-28 w-28" src="assets/users/user-1.png" alt="" />
                                </div>
                                <div className="mt-6 w-full flex-1 rounded-xl bg-white py-8 px-4 shadow-lg">
                                    <h5 className="font-sans text-xl font-bold leading-tight text-gray-900">Eleanor Pena</h5>
                                    <p className="mt-1.5 text-gray-500">Co-founder &amp; COO</p>
                                </div>
                            </div>
                            <div className="mb-6 flex flex-col px-6 text-center sm:w-1/2 lg:w-[33.33%] sm:items-center">
                                <div className="member-avatar inline-flex justify-center">
                                    <Image className="rounded-full h-28 w-28" src="assets/users/user-2.png" alt="" />
                                </div>
                                <div className="mt-6 w-full flex-1 rounded-xl bg-white py-8 px-4 shadow-lg">
                                    <h5 className="font-sans text-xl font-bold leading-tight text-gray-900">Savannah Nguyen</h5>
                                    <p className="mt-1.5 text-gray-500">Head of Infrastructure</p>
                                </div>
                            </div>
                            <div className="mb-6 flex flex-col px-6 text-center sm:w-1/2 lg:w-[33.33%] sm:items-center">
                                <div className="member-avatar inline-flex justify-center">
                                    <Image className="rounded-full h-28 w-28" src="assets/users/user-3.png" alt="" />
                                </div>
                                <div className="mt-6 w-full flex-1 rounded-xl bg-white py-8 px-4 shadow-lg">
                                    <h5 className="font-sans text-xl font-bold leading-tight text-gray-900">Courtney Henry</h5>
                                    <p className="mt-1.5 text-gray-500">Head of Brand Marketing</p>
                                </div>
                            </div>
                            <div className="mb-6 flex flex-col px-6 text-center sm:w-1/2 lg:w-[33.33%] sm:items-center">
                                <div className="member-avatar inline-flex justify-center">
                                    <Image className="rounded-full h-28 w-28" src="assets/users/user-4.png" alt="" />
                                </div>
                                <div className="mt-6 w-full flex-1 rounded-xl bg-white py-8 px-4 shadow-lg">
                                    <h5 className="font-sans text-xl font-bold leading-tight text-gray-900">Floyd Miles</h5>
                                    <p className="mt-1.5 text-gray-500">Head of Infrastructure</p>
                                </div>
                            </div>
                            <div className="mb-6 flex flex-col px-6 text-center sm:w-1/2 lg:w-[33.33%] sm:items-center">
                                <div className="member-avatar inline-flex justify-center">
                                    <Image className="rounded-full h-28 w-28" src="assets/users/user-5.png" alt="" />
                                </div>
                                <div className="mt-6 w-full flex-1 rounded-xl bg-white py-8 px-4 shadow-lg">
                                    <h5 className="font-sans text-xl font-bold leading-tight text-gray-900">Robert Fox</h5>
                                    <p className="mt-1.5 text-gray-500">Head of Product Design</p>
                                </div>
                            </div>
                            <div className="mb-6 flex flex-col px-6 text-center sm:w-1/2 lg:w-[33.33%] sm:items-center">
                                <div className="member-avatar inline-flex justify-center">
                                    <Image className="rounded-full h-28 w-28" src="assets/users/user-6.png" alt="" />
                                </div>
                                <div className="mt-6 w-full flex-1 rounded-xl bg-white py-8 px-4 shadow-lg">
                                    <h5 className="font-sans text-xl font-bold leading-tight text-gray-900">Darrell Steward</h5>
                                    <p className="mt-1.5 text-gray-500">Head of People &amp; HR</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default function Nosotros() {
    return (
        <React.Fragment>
            <CommonHero />

            {/* <Gallery /> */}

            {/* <Work /> */}

            {/* <Members /> */}
        </React.Fragment>
    );
}