'use client'

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import AuthModal from "../authModal";
import { useCallback } from "react";


const HeaderLanding = () => {
    const [scrolled, setScrolled] = useState(false)
    const [showAuthModal, setShowAuthModal] = useState(false)

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
    
    return (
        <React.Fragment>
            <div className="fixed top-0 left-0 right-0 mx-auto px-4 lg:px-6 h-20 flex items-center justify-between bg-white z-50">
                <div>
                    <Link className="flex items-center justify-center" href="/">
                        <div className="text-[32px] font-bold text-gray-800 " >
                            <Image src="/assets/logo.png" height={20} width={50} alt="Logo" priority/>
                        </div>

                        <div className="overflow-hidden ml-2">
                            <span className={`font-bold text-2xl md:text-4xl text-green-800 font-sans inline-block transition-transform duration-300 ease-in-out ${scrolled ? "-translate-x-full" : "translate-x-0"}`}>
                                Ponte100
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