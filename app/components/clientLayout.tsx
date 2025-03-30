'use client';

import { useEffect, useRef } from "react";
import { Inter } from 'next/font/google';
import Footer from './footer';
import HeaderLanding from './header/headerLanding';
import HeaderAuth from './header/headerAuth';
import { usePathname } from "next/navigation"
import Whatsapp from './whatsapp';
import { useSession, signOut } from 'next-auth/react';
import Image from "next/image";

const inter = Inter({ subsets: ['latin'] }); // Importa la fuente Inter con soporte para caracteres latinos

function Bubbles() {
  return (
    <>
      <Image className="floating-bubble-1 absolute right-0 top-24 -z-[1]" src="/assets/bubbles/floating-bubble-1.png" width="103" height="98" alt="" priority/>
      <Image className="floating-bubble-2 absolute left-0 top-[387px] -z-[1]" src="/assets/bubbles/floating-bubble-2.png" alt="" width="33" height="66" priority/>
      <Image className="floating-bubble-3 absolute right-0 top-[605px] -z-[1]" src="/assets/bubbles/floating-bubble-3.png" alt="" width="50" height="99" priority/>
    </>
  );
}

// Componente de Spinner
function LoadingSpinner() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 z-50">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathName = usePathname();
  const isLandingPage = pathName === "/";
  const { data: session, status } = useSession();
  const hasSignedOut = useRef(false); // Evita múltiples ejecuciones de signOut()

  useEffect(() => {
    // console.log("🔍 useEffect ejecutado");
    // console.log("📍 Ruta actual:", pathName);
    // console.log("🔐 Estado de sesión:", status);
    // console.log("🛠️ Datos de sesión:", session);

    // Si la sesión está autenticada y la ruta es restringida
    // if ( restrictedRoutes.includes(pathName)) {

    // Si activeSession es falso o undefined, cerrar sesión
    // if (session?.activeSession === false || !session) {
    //   console.log("🚫 Sesión inactiva, cerrando sesión...");
    //   signOut();
    // }
    // }
  }, [pathName, status, session]);

  if (status === "loading") {
    return <LoadingSpinner />;
  }

  return (
    <div className={`flex flex-col min-h-screen ${inter.className}`}>
      {isLandingPage ? <HeaderLanding /> : session ? <HeaderAuth /> : <HeaderLanding />}
      {/* {session?.activeSession == true ? <HeaderAuth /> : <HeaderLanding />} */}
      <main className="flex-1">
        <Bubbles />
        {children}
      </main>
      <Footer />
    </div>
  );
}
