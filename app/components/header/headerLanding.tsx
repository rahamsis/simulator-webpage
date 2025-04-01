'use client'

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import AuthModal from "../authModal";
import { useCallback } from "react";


const HeaderLanding = () => {
    const [scrolled, setScrolled] = useState(false)
    const [showAuthModal, setShowAuthModal] = useState(false)
    const [deviceType, setDeviceType] = useState("");

    const handleScroll = useCallback(() => {
        setScrolled(window.scrollY > 500);
    }, []);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);

    // Manejo del login
    const handleLogin = () => {
        setShowAuthModal(false)
    }

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

    return (
        <React.Fragment>
            <div className="fixed top-0 left-0 right-0 mx-auto px-4 lg:px-6 h-20 flex items-center justify-between bg-white z-50">
                <div>
                    <Link className="flex items-center justify-center" href="/">
                        <div className="text-[32px] font-bold text-gray-800 " >
                            {deviceType === "celular" ?
                                <Image src="/assets/logo.png" height={20} width={40} alt="Logo" style={{ height: 'auto' }} priority />
                                :
                                <Image src="/assets/logo.png" height={60} width={60} alt="Logo" style={{ height: 'auto' }} priority />
                            }
                        </div>

                        <div className="overflow-hidden ml-2">
                            <span className={` font-bold text-2xl md:text-4xl text-green-800 font-sans inline-block transition-transform duration-300 ease-in-out ${scrolled ? "-translate-x-full" : "translate-x-0"}`}>
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
                                    <span className="text-[12.5px] md:text-[18.5px] lg:text-[18.5px]">MÉTODO DE ESTUDIO</span>
                                </div>
                            </span>
                        </div>
                    </Link>
                </div>
                <div>
                    {/* Botón para desktop */}
                    <button onClick={() => setShowAuthModal(true)}
                        className="hidden md:block bg-green-700 text-xs md:text-base text-center text-white px-4 py-2 rounded hover:bg-green-600 transition-colors duration-300">
                        Registrarse / Iniciar sesión
                    </button>
                    {/* Botón para móviles */}
                    <button onClick={() => setShowAuthModal(true)}
                        className="md:hidden bg-green-700 text-xs md:text-base text-center text-white px-4 py-2 rounded hover:bg-green-600 transition-colors duration-300">
                        Registrarse /<br /> Iniciar sesión
                    </button>
                </div>
                {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} onLogin={handleLogin} />}
            </div>
        </React.Fragment>
    )
}

export default HeaderLanding;