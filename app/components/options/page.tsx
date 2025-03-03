"use client"

import { useState, useEffect } from "react"
import Input from "@/app/ui/input"
import { motion, AnimatePresence } from "framer-motion"
import useDebounce from "@/app/lib/use-debounce"
import Checkbox from "@/app/ui/checkbox"
import { getTemas } from "@/app/lib/actions"

interface OptionsProps {
    onQuantitySelect: (quantity: number) => void,
    onStartPractice: () => void
}

const options = [10, 20, 30, 50, 100];

function Options({ onQuantitySelect, onStartPractice }: OptionsProps) {

    const [selectedButton, setSelectedButton] = useState<number | null>(null);

    const handleSelect = (quantity: number) => {
        setSelectedButton(quantity);
        onQuantitySelect(quantity);
    };

    return (
        <div className="w-full my-4">
            <div className="relative flex flex-col justify-start items-center">
                <h2 className="text-xl">Realiza una práctica con todas las preguntas según la cantidad que escojas.</h2>
                <div className="w-full sticky top-0 z-10 pt-4 pb-4 text-center">
                    <div className="grid grid-cols-5 gap-4 mx-10 my-10">
                    {options.map((option, index) => (
                            <button
                                key={index}
                                className={`border py-3 px-2 rounded-2xl hover:border-slate-300 hover:shadow-lg 
                                ${selectedButton === option ? "bg-green-600 text-white" : "bg-white"}`}
                                onClick={() => handleSelect(option)}
                            >
                                {`${option} preguntas`}
                            </button>
                        ))}
                    </div>

                </div>
            </div>

            {/* Botón para iniciar práctica */}
            <div className="mx-auto text-center">
                <button
                    onClick={onStartPractice}
                    className="bg-green-600 text-white rounded-lg px-4 py-3 hover:bg-green-500">Iniciar Práctica</button>
            </div>
        </div>
    )
}

export default Options

