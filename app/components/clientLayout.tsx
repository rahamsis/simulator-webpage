'use client';

import { Inter } from 'next/font/google';
import Footer from './footer';
import HeaderLanding from './header/headerLanding';
import HeaderAuth from './header/headerAuth';
import { usePathname } from "next/navigation"
import Whatsapp from './whatsapp';
import { useSession } from 'next-auth/react';

const inter = Inter({ subsets: ['latin'] }); // Importa la fuente Inter con soporte para caracteres latinos

function Bubbles() {
  return (
    <>
      <img className="floating-bubble-1 absolute right-0 top-24 -z-[1]" src="assets/bubbles/floating-bubble-1.png" width="103" height="98" alt="" />
      <img className="floating-bubble-2 absolute left-0 top-[387px] -z-[1]" src="assets/bubbles/floating-bubble-2.png" alt="" width="33" height="66" />
      <img className="floating-bubble-3 absolute right-0 top-[605px] -z-[1]" src="assets/bubbles/floating-bubble-3.png" alt="" width="50" height="99" />
    </>
  );
}

// Componente de Spinner
function LoadingSpinner() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathName = usePathname(); // Obtiene la ruta actual
  const isLandingPage = pathName === "/"; // Verifica si la página actual es la de inicio

  const { data: session, status } = useSession(); // Obtiene la sesión del usuario

  if (status === "loading") {
    return <LoadingSpinner />; // Muestra el spinner de carga
  }


  const isAuthenticated = !!session; // Verifica si hay una sesión activa

  return (
    <div className={inter.className}>
      {isLandingPage ? <HeaderLanding /> : isAuthenticated ? <HeaderAuth /> : <HeaderLanding />}
      <main className='pt-14'>
        <Bubbles />
        {children}
      </main>
      <Footer />
      {/* <Whatsapp /> */}
    </div>
  );
}