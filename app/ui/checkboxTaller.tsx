"use client"

import type React from "react"
import { useState } from "react"

interface PrettyRadioProps {
    options: { id: number, name: string }[]
    onChange?: (selectedOption: number) => void
}

const CheckboxTaller: React.FC<PrettyRadioProps> = ({ options, onChange }) => {
    const [selectedOption, setSelectedOption] = useState<number | null>(null)

    const handleSelect = (optionId: number) => {
        setSelectedOption(optionId)
        if (onChange) {
            onChange(optionId)
        }
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-2">
            {options.map(({id, name}) => (
                <label key={id} className="flex items-center space-x-3 cursor-pointer " onClick={() => handleSelect(id)}>
                    <div
                        className={`w-6 h-6 border-2 rounded-md flex items-center justify-center transition-all duration-200 ease-in-out 
                            ${selectedOption === id ? "bg-green-500 border-green-500" : "border-gray-300"}
                            `}
                    >
                        {selectedOption === id && <div className="text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check" viewBox="0 0 16 16">
                                <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z" />
                            </svg>
                        </div>}
                    </div>
                    <span className="text-gray-700">{name}</span>
                </label>
            ))}
        </div>
    )
}

export default CheckboxTaller