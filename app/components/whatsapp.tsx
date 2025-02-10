'use client'
import { Dialog } from "@headlessui/react";
import { Bars3Icon, ChevronDownIcon, MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import styles from './header.module.css'
import "bootstrap-icons/font/bootstrap-icons.css";

var message = "Hola%2c%20podría%20brindarme%20más%20información%20sobre%20el%20servicio%20que%20brinda.%0AGracias%2e"
var numero = "51962785223"
var url = "https://api.whatsapp.com/send?phone=" + numero + "&text="


export default function Whatsapp() {

    // Estado local para almacenar el valor del input
    const [valorInput, setValorInput] = useState('');
    //Hago referencia al Div que engloba todo el chat de wtsp
    const miRef = useRef<HTMLDivElement>(null);
    // creo una variable que manejara los estados de la burbuja de chat
    const [ejecute, setEjecute] = useState(true);

    const toggleChating = () => {

        if (!ejecute) {
            // console.log(miRef.current?.classList )

            miRef.current?.classList.add('opacity-0', 'translate-x-full')
            miRef.current?.classList.remove('translate-x-0', 'opacity-100')
            setValorInput("")
            // ejecute = false;
        } else {
            // console.log(miRef.current?.classList )

            miRef.current?.classList.add('opacity-100', 'translate-x-0')
            miRef.current?.classList.remove('translate-x-full', 'opacity-0')
            // ejecute = true;
        }

        // Invierte el valor de 'ejecute' después de realizar las operaciones
        setEjecute((prevEjecute) => !prevEjecute);

    };

    const closeChating = () => {
        miRef.current?.classList.remove('translate-x-0', 'opacity-100')
        miRef.current?.classList.add('opacity-0', 'translate-x-full')
        setValorInput("")
        setEjecute((prevEjecute) => !prevEjecute);
    }

    const sendMessage = () => {
        window.open(url + valorInput, '_blank');
        setValorInput("")
    }

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            toggleChating();
        }, 1500);

        // Limpia el temporizador cuando el componente se desmonta o cuando el efecto se ejecuta nuevamente
        return () => clearTimeout(timeoutId);
    }, []);

    //   Función para manejar cambios en el input
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValorInput(event.target.value);
    };

    // setTimeout(toggleChating, 1500);

    return (
        <>
            <div>
                <div ref={miRef} className='fixed bottom-28 right-8 z-50 bg-chat rounded-2xl shadow-lg p-3 transform  transition-all duration-1000 ease-in-out translate-x-full opacity-0'>
                    <div className='text-whatsapp text-2xl cursor-pointer w-auto'>
                        <span onClick={closeChating}>
                            <i className="bi bi-x-circle-fill"></i>
                        </span>
                    </div>
                    <div className='flex flex-wrap items-center'>
                        <div className='py-3 h-auto text-4xl text-slate-500'>
                            <i className="bi bi-person-circle"></i>
                        </div>
                        <div className='pl-4 py-3 text-slate-700 opacity-90'>
                            <a>Hola, ¿En qué podemos ayudarle?</a>
                        </div>
                    </div>
                    <div className='flex flex-wrap items-center'>
                        <div className='py-3 w-[80%]'>
                            <input
                                type="text"
                                value={valorInput}
                                onChange={handleChange}
                                className="form-control h-8 rounded-xl font-sans block w-full my-1 px-[0.75rem] text-base font-normal leading-[1.5] opacity-60 bg-white bg-clip-padding border border-solid border-borderInputFooter appearance-none m-0 focus:border-transparent focus:outline-none transition-all duration-300"
                                placeholder='Enviar mensaje...' />
                        </div>
                        <div className='flex w-9 h-9 pl-2 bg-white items-center text-center rounded-[50%] text-slate-600 shadow-xl rotate-45 absolute right-4'>
                            <button onClick={sendMessage}>
                                <i className="bi bi-send-fill"></i>
                            </button>
                        </div>

                    </div>
                </div>


                <a className='cursor-pointer block fixed w-14 h-14 leading-[55px] bottom-8 right-8 bg-whatsapp text-white rounded-[50%] text-center text-3xl shadow-lg hover:no-underline lg:hover:text-whatsapp lg:hover:bg-white z-50'
                    onClick={toggleChating}>
                    <i className="bi bi-whatsapp"></i>
                </a>
            </div>

            {/* boton de whatsapp visible solo en mobiles */}
            {/* <a href={url + message} target='_blank' className='lg:hidden fixed w-14 h-14 leading-[55px] bottom-8 right-8 bg-whatsapp text-white rounded-[50%] text-center text-3xl shadow-lg hover:no-underlin z-50'>
                <i className="bi bi-whatsapp"></i>
            </a> */}
        </>
    )
}