'use client'

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Tab, TabPanel, TabList, Tabs } from "react-tabs";

const actividades = [
  {
    titulo: "Zona de Estudio",
    tema: "Aprendizaje",
    imagen: "/images/curso1.jpeg?height=200&width=400",
    ref: "zona",
    progress: 50,
    show: true,
  },
  {
    titulo: "Practica un tema",
    tema: "Simulacro",
    imagen: "/images/curso2.jpg?height=200&width=400",
    ref: "practica",
    progress: 25,
    show: false,
  },
  {
    titulo: "Genera tu primera practica",
    tema: "Aprendizaje",
    imagen: "/images/curso3.jpg?height=200&width=400",
    ref: "generador",
    progress: 10,
    show: false,
  },
  {
    titulo: "Genera tu primer simulacro ilimitado",
    tema: "Aprendizaje",
    imagen: "/images/curso4.jpeg?height=200&width=400",
    ref: "simulacro",
    progress: 65,
    show: true,
  },
  {
    titulo: "Examenes no repetidos",
    tema: "Aprendizaje",
    imagen: "/images/curso5.png?height=200&width=400",
    ref: "examenes",
    progress: 100,
    show: true,
  },
  {
    titulo: "Examen preguntas falladas",
    tema: "Aprendizaje",
    imagen: "/images/curso6.jpg?height=200&width=400",
    ref: "fallidas",
    progress: 48,
    show: false,
  },
  {
    titulo: "Temario",
    tema: "Aprendizaje",
    imagen: "/images/curso7.jpg?height=200&width=400",
    ref: "temario",
    progress: 27,
    show: false,
  },
  {
    titulo: "Audios de estudio",
    tema: "Aprendizaje",
    imagen: "/images/curso8.png?height=200&width=400",
    ref: "actividades",
    progress: 5,
    show: true,
  },
  {
    titulo: "Material didactico",
    tema: "Aprendizaje",
    imagen: "/images/curso6.png?height=200&width=400",
    ref: "libros",
    progress: 5,
    show: true,
  },
]

function Main() {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <>
      <section className="">
        <div className="mx-auto px-3">
          <div className="flex flex-col">
            <main className="flex-grow bg-transparent">
              <div className="container mx-auto pd-2 md:px-4">
                <h1 className="text-2xl md:text-4xl font-bold text-center mb-12 text-green-700">Nuestras Actividades Académicas Principales</h1>

                <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)} className="w-full">
                  {/* Pestañas */}
                  <TabList className="grid w-full grid-cols-2 bg-gray-200 p-1 border-b-2 border-gray-200 rounded-lg">
                    <Tab
                      className={`p-3 text-sm md:text-xl text-center font-semibold cursor-pointer transition-all duration-200 border-b-4 border-transparent outline-none focus:outline-none rounded-lg ${tabIndex === 0 ? "bg-white text-green-700 font-bold" : "text-gray-600"
                        }`}
                    >
                      Actividades Académicas <span className="hidden md:inline">Disponibles</span>
                    </Tab>
                    <Tab
                      className={`p-3 text-sm md:text-xl text-center font-semibold cursor-pointer transition-all duration-200 border-b-4 border-transparent outline-none focus:outline-none rounded-lg ${tabIndex === 1 ? "bg-white text-green-700 font-bold" : "text-gray-600"
                        }`}
                    >
                      Progreso
                    </Tab>
                  </TabList>

                  {/* Panel de Actividades */}
                  <TabPanel className={`p-2 ${tabIndex === 0 ? "block" : "hidden"}`} >
                    <h2 className="text-xl md:text-2xl font-bold p-2 md:p-5 text-green-800 text-center">Actividades Académicas de Simulacro y Aprendizaje</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {actividades.map((actividad, i) => (
                        <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
                          <Image
                            src={actividad.imagen}
                            alt={actividad.titulo}
                            width={400}
                            height={200}
                            className="h-48 w-full object-cover"
                            priority
                          />
                          <div className="p-4">
                            <h3 className="text-lg font-bold text-green-700">{actividad.titulo}</h3>
                            <p className="text-gray-600">{actividad.tema}</p>
                            <Link
                              href={`/${actividad.ref}`}
                              className={`inline-block mt-4 px-4 py-2 bg-green-700 text-white rounded hover:bg-green-600 transition 
                                ${actividad.titulo === "Audios de estudio" ? "opacity-50" : ""}`}
                            >
                              Inicia Ahora
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabPanel>

                  {/* Panel de Progreso */}
                  <TabPanel className={`p-2 ${tabIndex === 1 ? "block" : "hidden"}`}>
                    <h2 className="text-xl md:text-2xl font-bold p-2 md:p-5 text-green-800">Progreso de las Actividades Académicas ya iniciados</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {actividades.map((actividad, i) => (
                        <div key={i} className={` ${!actividad.show ? "hidden" : ""}`}>
                          <div className="p-4">
                            <Image
                              src={actividad.imagen}
                              alt={actividad.titulo}
                              width={400}
                              height={200}
                              className=" mx-auto h-20 md:h-40 w-20 md:w-40 object-cover rounded-full"
                            ></Image>
                          </div>
                          <div className="text-center">
                            <h3 className="text-lg font-semibold">{actividad.titulo}</h3>
                            <span className="text-sm font-bold">{actividad.progress}%</span>
                          </div>
                          <div className="flex items-center space-x-4 bg-cover bg-center px-8">

                            <div className="flex-grow bg-gray-200 rounded-full h-4 overflow-hidden">
                              <div
                                className="bg-green-600 h-full rounded-full transition-all"
                                style={{ width: `${actividad.progress}%` }}
                              ></div>
                            </div>
                            {/* <span className="text-sm font-bold">{actividad.progress}%</span> */}

                          </div>
                        </div>
                      ))}
                    </div>
                  </TabPanel>
                </Tabs>
              </div>
            </main>
          </div>
        </div>
      </section>
    </>
  )
}

export default function Actividades() {
  return (
    <>
      <Main />
    </>
  )
}