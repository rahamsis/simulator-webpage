'use client'

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import UserMenu from "../userMenu";

const HeaderAuth = () => {

    const pathName = usePathname()
    const [menuOpen, setMenuOpen] = useState(false)
    const [deviceType, setDeviceType] = useState("");

    useEffect(() => {
        const detectDevice = () => {
            const width = window.innerWidth;
            const userAgent = navigator.userAgent.toLowerCase();

            if (/mobile|android|iphone|ipod/i.test(userAgent)) {
                setDeviceType('celular');
            } else if (/ipad|tablet/i.test(userAgent) || (width >= 768 && width < 1024)) {
                setDeviceType('tablet');
            } else if (width >= 1024 && width < 1440) {
                setDeviceType('laptop');
            } else {
                setDeviceType('PC');
            }
        };

        detectDevice();

        window.addEventListener('resize', detectDevice);
        return () => window.removeEventListener('resize', detectDevice);
    }, []);

    // Toggle menu visibility
    const toggleMenu = () => { setMenuOpen(!menuOpen); };

    return (
        <React.Fragment>
            <div className="sticky top-0 left-0 right-0 mx-auto px-4 lg:px-6 h-[70px] md:h-[90px] lg:h-[95px] flex items-center justify-between z-50 border-2 border-red-600">
                <nav className={`flex flex-wrap items-center justify-between  px-5 py-4 bg-white fixed top-0 left-0 w-full right-0`}>
                    {/* <!-- logo --> */}
                    <div className={`order-[0] flex items-center pl-5 md:pl-0 ${menuOpen ? 'items-center mx-auto' : 'block'}`}>
                        <Link className="flex items-center justify-center" href="/actividades">

                            <div className="text-[32px] font-bold text-gray-800 " >
                                {deviceType === "celular" ?
                                    <Image src="/assets/logo.png" height={20} width={40} alt="Logo" style={{ height: 'auto' }} priority />
                                    :
                                    <Image src="/assets/logo.png" height={60} width={60} alt="Logo" style={{ height: 'auto' }} priority />
                                }
                            </div>

                            <div className="overflow-hidden ml-2 ">
                                {/* <span className={`font-bold text-2xl md:text-4xl text-green-800 font-sans inline-block transition-transform duration-300 ease-in-out ${scrolled && !menuOpen ? "-translate-x-full" : "translate-x-0"}`} > */}
                                <span className={`font-bold text-lg md:text-4xl text-green-800 font-sans inline-block transition-transform duration-300 ease-in-out`} >
                                    <div className="flex">PONTE100
                                        <span className=" top-0  text-base">
                                            {deviceType === "celular" ?
                                                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" className="bi bi-r-circle" viewBox="0 0 16 16">
                                                    <path d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.5 4.002h3.11c1.71 0 2.741.973 2.741 2.46 0 1.138-.667 1.94-1.495 2.24L11.5 12H9.98L8.52 8.924H6.836V12H5.5zm1.335 1.09v2.777h1.549c.995 0 1.573-.463 1.573-1.36 0-.913-.596-1.417-1.537-1.417z" />
                                                </svg>
                                                :
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-r-circle" viewBox="0 0 16 16">
                                                    <path d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.5 4.002h3.11c1.71 0 2.741.973 2.741 2.46 0 1.138-.667 1.94-1.495 2.24L11.5 12H9.98L8.52 8.924H6.836V12H5.5zm1.335 1.09v2.777h1.549c.995 0 1.573-.463 1.573-1.36 0-.913-.596-1.417-1.537-1.417z" />
                                                </svg>
                                            }
                                        </span>
                                    </div>
                                    <div className="leading-[1px] md:leading-[10px]">
                                        <span className="text-[9.5px] md:text-sm md:tracking-[0.2rem] ">MÉTODO DE ESTUDIO</span>
                                    </div>
                                </span>
                            </div>
                        </Link>
                    </div>

                    {/* notificaciones, usuario y hamburguesa - moviles */}
                    <div id="show-button" className={`order-1 flex cursor-pointer items-center lg:order-1 ${deviceType === "PC" ? "hidden" : "block"}  ${menuOpen ? 'hidden' : 'block'}`} >
                        {/* icono notificaciones */}
                        <button className="text-gray-600 hover:text-green-800 ">
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-bell" viewBox="0 0 16 16">
                                <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6" />
                            </svg>
                        </button>
                        {/* menu usuario */}
                        <div className="text-center ml-5">
                            <UserMenu />
                        </div>
                        {/* icono hamburguesa  */}
                        <button onClick={toggleMenu}>
                            <svg className="h-6 fill-current ml-5" viewBox="0 0 20 20">
                                <title>Menu Open</title>
                                <path d="M0 3h20v2H0V3z m0 6h20v2H0V9z m0 6h20v2H0V0z"></path>
                            </svg>
                        </button>
                    </div>

                    {/* icono cerrar x  */}
                    <div id="hide-button" className={`order-1 cursor-pointer items-center lg:order-1 ${deviceType === "PC" ? "lg:hidden" : ""} ${menuOpen ? 'block' : 'hidden'}`} onClick={toggleMenu}>
                        <svg className="h-6 fill-current" viewBox="0 0 20 20">
                            <title>Menu Close</title>
                            <polygon points="11 9 22 9 22 11 11 11 11 22 9 22 9 11 -2 11 -2 9 9 9 9 -2 11 -2" transform="rotate(45 10 10)"></polygon>
                        </svg>
                    </div>


                    {/* Menú de navegación */}
                    <ul id="nav-menu" className={`order-2 w-full flex-[0_0_100%] ${deviceType === "PC" ? "lg:order-1 lg:w-auto lg:flex-auto lg:justify-center lg:space-x-5 lg:flex " : ""} ${menuOpen ? 'block' : 'hidden'}`}>
                        <li className="text-center">
                            <div className="lg:inline w-72 mx-auto">
                                <Link href="/main" className={`active block p-3 py-2 text-base text-gray-900 ${pathName === '/main' ? 'border-b-2 border-green-500' : 'opacity-80'}`}
                                    onClick={toggleMenu}>
                                    Principal
                                </Link>
                            </div>
                        </li>
                        <li className="text-center">
                            <div className="lg:inline w-72 mx-auto">
                                <Link href="/actividades" className={`active block p-3 py-2 text-base text-gray-900 ${pathName === '/actividades' ? 'border-b-2 border-green-500' : 'opacity-80'}`}
                                    onClick={toggleMenu}>
                                    Actividades Académicas
                                </Link>
                            </div>
                        </li>
                        <li className="text-center">
                            <div className="lg:inline w-72 mx-auto">
                                <Link href="/nosotros" className={`block p-3 py-2 text-base text-gray-900 ${pathName === '/nosotros' ? 'border-b-2 border-green-500' : 'opacity-80'}`}
                                    onClick={toggleMenu}>
                                    Sobre Nosotros
                                </Link>
                            </div>
                        </li>
                        <li className="text-center">
                            <div className="lg:inline w-72 mx-auto">
                                <Link href="/contactanos" className={`block p-3 py-2 text-base text-gray-900 ${pathName === '/contactanos' ? 'border-b-2 border-green-500' : 'opacity-80'}`}
                                    onClick={toggleMenu}>
                                    Contacto
                                </Link>
                            </div>
                        </li>
                        <li className="text-center">
                            <div className="lg:inline w-72 mx-auto">
                                <Link href="/libros" className={`block p-3 py-2 text-base text-gray-900 ${pathName === '/libros' ? 'border-b-2 border-green-500' : 'opacity-80'}`}
                                    onClick={toggleMenu}>
                                    Material Didactico
                                </Link>
                            </div>
                        </li>

                    </ul>
                    {/* </nav> */}

                    {/* notificaciones y usuario -desktop */}
                    <div id="show-button" className={`order-2  items-center ${deviceType === "PC" ? "flex" : "hidden"}`}>
                        {/* icono notificaciones */}
                        <button className="text-gray-600 hover:text-blue-600">
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-bell" viewBox="0 0 16 16">
                                <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6" />
                            </svg>
                        </button>
                        {/* icono usuario */}
                        <div className="order-1 ml-auto items-center md:order-2 md:ml-5 lg:flex">
                            <UserMenu />
                        </div>
                    </div>
                </nav>
            </div>
        </React.Fragment>

    )
}

export default HeaderAuth;