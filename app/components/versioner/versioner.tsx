"use client"

import { useState, useEffect } from "react"
import Checkbox from "@/app/ui/checkbox"

interface Version {
    idVersion: number;
    description: string;
}

interface VersionerProps {
    onVersionSelect: (version: number) => void;
    onCheckboxSelect: (selected: number) => void;
    onStartPractice: () => void;
}

const options: Version[] = [
    {idVersion: 1,  description: "Version sin Balotario"},
    {idVersion: 2, description: "Version con Balotario"},
    {idVersion: 3, description: "Version SIECOPOL - PNP"}
]

function Versioner({ onVersionSelect, onCheckboxSelect, onStartPractice }: VersionerProps) {
    const [selectedVersion, setSelectedVersion] = useState(0)

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const versionId = Number(event.target.value);
        setSelectedVersion(versionId);
        onVersionSelect(versionId);
    };

    return (
        <div className="w-full my-4">
            <div className="relative flex flex-col justify-start items-center mx-5">
                <h2 className="text-xl">Realiza una simulacro con la cantidad de preguntas y versión que elijas.</h2>

                {/* Selector de versión */}
                <div className="w-full pt-4 pb-4 text-center">
                    <select
                        className="w-3/4 p-2 border rounded-lg shadow-sm bg-white text-gray-800 focus:ring-2 focus:ring-green-500"
                        value={selectedVersion}
                        onChange={handleSelectChange}
                        aria-label="Seleccionar versión"
                    >
                        <option value={0} disabled>Selecciona una versión</option>
                        {options.map((option) => (
                            <option key={option.idVersion} value={option.idVersion}>
                                {option.description}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Checkbox */}
            <div className="pt-5 flex items-center justify-center">
                <Checkbox
                    options={[
                        {id:50, name:"50 preguntas"}, 
                        {id:100, name:"100 preguntas"}]}
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

export default Versioner;

