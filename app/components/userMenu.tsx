"use client"

import { signOut, useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function UserMenu() {
  const {data: session, status} = useSession();

  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null); // Referencia al menú

  // Cerrar el menú al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false); // Cierra el menú si el clic fue fuera
      }
    };

    // Agregar el event listener cuando el menú está abierto
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Limpiar el event listener cuando el componente se desmonta o el menú se cierra
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]); // Solo se ejecuta cuando `isOpen` cambia

  useEffect(() => {
    const handleScroll = () => {
      setIsOpen(false)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="relative " ref={menuRef}>
      <div className="flex">
        <button onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2 text-green-800 hover:text-green-600 transition-colors duration-200 ease-in-out"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
            <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
          </svg>
        </button>
      </div>


      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-10">
          <div className="">
            <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="currentColor" className="bi bi-person-circle mx-auto" viewBox="0 0 16 16">
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
              <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
            </svg>
          </div>
          {/* nombre usuario */}
          <div className=" items-center text-center font-bold text-2xl text-green-700">
            {
                status === "authenticated" && session!.user!.name
            }
          </div>

          <a href="#" className="block px-4 py-2 text-sm md:text-xl text-green-800 hover:bg-green-100 rounded-md transition-all duration-200 ease-in-out">
            Modificar perfil
          </a>
          <button
            onClick={() => {
              signOut();
              setIsOpen(false);
              // router.push("/");

            }}
            className="block w-full px-4 py-2 text-sm md:text-xl text-green-800 hover:bg-green-100 rounded-md transition-all duration-200 ease-in-out"
          >
            Cerrar sesión
          </button>
        </div>
      )}
    </div>

  )
}