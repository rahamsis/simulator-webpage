import Link from "next/link";
import Image from "next/image";

function CommonHero() {
    return (
        <>
            <section className="page-hero pt-16 pb-14">
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
                    <div className="page-hero-content mx-auto max-w-[768px] text-center leading-tight font-serif">
                        <h1 className="mb-5 mt-8 text-5xl font-bold text-green-800">
                            Adquiere las ultimas noticias 
                        </h1>
                    </div>
                </div>
            </section>
        </>

    );
}

function Content() {
    return (
        <section className="pb-16 pt-0">
            <div className="mx-4 md:mx-auto px-3 max-w-[1202px]">
                <div className="flex flex-wrap">
                    <div className="mb-10 text-center md:w-1/2 md:order-2 md:mb-0 md:pt-9">
                        <div className="contact-img relative inline-flex pl-5 pb-5">
                            <Image src="assets/contact-img.png" alt="" />
                            <Image className="absolute bottom-0 left-0 -z-[1] h-14 w-14" src="assets/shape-2.svg" alt="" />
                        </div>
                    </div>
                    <div className=" w-full md:w-1/2 md:order-1">
                        <form className="lg:max-w-[484px]">
                            <div className="mb-5">
                                <label className="mb-2 block text-gray-900">Nombre Completo</label>
                                <input className="h-[60px] w-full rounded-lg border border-gray-200 text-gray-900  focus:outline-none focus:border-green-400 px-2" type="text" id="name" placeholder="Ingrese su nombre" />
                            </div>
                            <div className="form-group mb-5">
                                <label className="mb-2 block text-gray-900">Correo electrónico</label>
                                <input className="h-[60px] w-full rounded-lg border border-green-200 text-gray-900 focus:outline-none focus:border-green-400 px-2" type="text" id="email" placeholder="Ingrese su correo " />
                            </div>
                            <div className="form-group mb-5">
                                <label className="mb-2 block text-gray-900">Servicio</label>
                                <select name="reason" id="reason" className="h-[60px] w-full rounded-lg border border-green-200  pr-10">
                                    <option value="">Selecciona </option>
                                    <option value="investment plane">opcion 1</option>
                                    <option value="investment plane-2">opcion 2</option>
                                </select>
                            </div>
                            <div className="form-group mb-5">
                                <label className="mb-2 block text-gray-900">Escriba su mensaje</label>
                                <textarea className="w-full rounded-[0.5rem] border border-gray-200 text-gray-900 h-[150px] focus:outline-none focus:border-green-400 px-2" id="message" cols={30} rows={10}></textarea>
                            </div>
                            <input className="h-[52px] px-8 py-2 text-sm leading-9 cursor-pointer rounded-[50px] text-center font-medium text-white bg-gradient-to-t from-[#d4ecef] to-[#1e770f] btn-primary block w-full" type="submit" value="Enviar Mensaje" />
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default function contactanos() {
    return (
        <>
            <CommonHero />

            <Content />
        </>
    )
}