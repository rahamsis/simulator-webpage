"use client"

import { useState, useEffect } from "react"
import Input from "@/app/ui/input"
import { motion, AnimatePresence } from "framer-motion"
// import { Search, Send, BarChart2, Globe, Video, PlaneTakeoff, AudioLines } from "lucide-react"
import useDebounce from "@/app/lib/use-debounce"
import Checkbox from "@/app/ui/checkbox"
// import { getTemas } from "@/app/lib/actions"
import { fetchTemas } from "@/app/lib/actions"

interface SearchResult {
    actions: Tema[]
}

interface Tema {
    idTema: string;
    tema: string;
}

interface SelectorOneProps {
    onThemeSelect: (theme: string) => void;
    onCheckboxSelect: (selected: number) => void;
    onStartPractice: () => void;
}

function SelectorOne({ onThemeSelect, onCheckboxSelect, onStartPractice }: SelectorOneProps) {
    const [temas, setTemas] = useState<Tema[]>([]);
    const [query, setQuery] = useState("")
    const [result, setResult] = useState<SearchResult | null>(null)
    const [isFocused, setIsFocused] = useState(false)
    const [selectedTema, setSelectedTema] = useState<Tema | null>(null)
    const debouncedQuery = useDebounce(query, 0)

    // llenar los temas
    useEffect(() => {
        async function fetchData() {
            try {
                // const data = await getTemas();
                const data = await fetchTemas();

                setTemas(data);
            } catch (error) {
                console.error("Error obteniendo las preguntas:", error);
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        if (!isFocused) {
            setResult(null)
            return
        }

        if (!debouncedQuery) {
            setResult({ actions: temas })
            return
        }

        const normalizedQuery = debouncedQuery.toLowerCase().trim()
        const filteredTemas = temas.filter((tema) => 
            tema.tema.toLowerCase().includes(normalizedQuery)
        )

        setResult({ actions: filteredTemas })
    }, [debouncedQuery, isFocused, temas])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setQuery(value)

        if (value === "") {
            setSelectedTema(null); // Reinicia el tema seleccionado
            setResult({ actions: temas }); // Vuelve a mostrar todos los temas
        }
    }

    const container = {
        hidden: { opacity: 0, height: 0 },
        show: {
            opacity: 1,
            height: "auto",
            transition: {
                height: {
                    duration: 0.2,
                },
                staggerChildren: 0,
            },
        },
        exit: {
            opacity: 0,
            height: 0,
            transition: {
                height: {
                    duration: 0.2,
                },
                opacity: {
                    duration: 0.1,
                },
            },
        },
    }

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.2,
            },
        },
        exit: {
            opacity: 0,
            y: -10,
            transition: {
                duration: 0.1,
            },
        },
    }

    const handleSelectTema = (tema: Tema) => {
        setSelectedTema(tema);
        setQuery(tema.tema); // Mostrar el nombre del tema en el input
        setIsFocused(false); // Ocultar la lista
        onThemeSelect(tema.idTema); // Pasar el tema seleccionado al componente padre
    };

    // Reset selectedTema when focusing the input
    const handleFocus = () => {
        setSelectedTema(null)
        setIsFocused(true)
    }

    if (temas.length === 0) {
        return <p className="text-center text-gray-500">Cargando Temas...</p>;
    }

    return (
        <div className="w-full my-4">
            <div className="relative flex flex-col justify-start items-center">
                <h2 className="text-xl">Realiza una práctica con todas las preguntas del tema que elijas.</h2>
                <div className="w-full sticky top-0 z-10 pt-4 pb-4 text-center">
                    <label className="text-base font-medium mb-1 block">
                        Selecciona un tema
                    </label>
                    <div className="relative ">
                        <Input
                            type="text"
                            placeholder="Ingresa un tema"
                            value={query}
                            onChange={handleInputChange}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                            className="w-3/4 h-12 pl-3 pr-10 text-sm rounded-lg focus-visible:ring-offset-0"
                        />
                        {/* Contenedor del icono */}
                        <div className="absolute right-14 md:right-32 top-1/2 -translate-y-1/2 h-4 w-4">
                            <AnimatePresence mode="popLayout">
                                {query.length > 0 ? (
                                    <motion.div
                                        key="send"
                                        initial={{ y: -20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        exit={{ y: 20, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="text-gray-400 dark:text-gray-500">
                                            <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z" />
                                        </svg>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="search"
                                        initial={{ y: -20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        exit={{ y: 20, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="text-gray-400 dark:text-gray-500">
                                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                                        </svg>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                </div>

                <div className="w-full">
                    <AnimatePresence>
                        {isFocused && result && !selectedTema && (
                            <motion.div
                                className="mx-auto w-3/4 border rounded-md shadow-sm overflow-hidden bg-white mt-[2px]"
                                variants={container}
                                initial="hidden"
                                animate="show"
                                exit="exit"
                            >
                                <motion.ul>
                                    {result.actions.map((tema) => (
                                        <motion.li
                                            key={tema.idTema}
                                            className="px-3 py-2 flex items-center justify-between text-start hover:bg-gray-200 cursor-pointer rounded-md"
                                            variants={item}
                                            layout
                                            onClick={() => handleSelectTema(tema)}
                                        >
                                            <div className="flex items-center gap-2 justify-between ">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-sm font-medium text-gray-900 ">{tema.tema}</span>
                                                </div>
                                            </div>
                                        </motion.li>
                                    ))}
                                </motion.ul>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Checkbox */}
            <div className="pt-5 flex items-center justify-center">
                <Checkbox
                    option1={{id:50, name:"50 preguntas"}}
                    option2={{id:100, name:"100 Preguntas"}}
                    // onChange={(selected) => console.log("Opción seleccionada:", selected)}
                    onChange={onCheckboxSelect}
                />
            </div>

            {/* Botón para iniciar práctica */}
            <div className="mx-auto pt-10 text-center">
                <button
                    onClick={onStartPractice}
                    className="bg-green-600 text-white rounded-lg px-4 py-3">Iniciar Práctica</button>
            </div>
        </div>
    )
}

export default SelectorOne

