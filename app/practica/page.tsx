'use client'

import { useState } from "react";
import { RadioGroup } from "@headlessui/react";

type Question = {
    id: number;
    question: string;
    options: string[];
    correctAnswer: number;
};

const questions: Question[] = [
    {
        id: 1,
        question: "TODA PERSONA TIENE DERECHO: A ELEGIR SU LUGAR DE RESIDENCIA, A TRANSITAR POR EL TERRITORIO NACIONAL Y A SALIR DE EL Y ENTRAR EN ÉL, SALVO LIMITACIONES POR",
        options: ["CAUSAS DE SALUBRIDAD, MANDATO ADMINISTRATIVO O POR APLICACIÓN DE LA LEY DE EXTRANJERIA.",
            "RAZONES DE SEGURIDAD PREVIA RESOLUCIÓN FISCAL Y EN APLICACIÓN DE LA LEY DE EXTRANJERÍA",
            "RAZONES DE SANIDAD O POR MANDATO JUDICIAL A PEDIDO DE LA SEGURIDAD PRIVADA AEROPUERTARIA",
            "RAZONES DE SANIDAD O POR MANDATO JUDICIAL O POR APLICACIÓN DE LA LEY DE EXTRANJERIA.",
            "CAUSAS DE SALUD PÚBLICA O POR MANDATO JUDICIAL O POR APLICACIÓN DE LA LEY DE MIGRACIONES"],
        correctAnswer: 1
    },
    {
        id: 2,
        question: "SE RECONOCEN LOS DERECHOS DE SINDICACIÓN Y HUELGA DE LOS SERVIDORES PÚBLICOS. NO ESTÁN COMPRENDIDOS",
        options: ["LOS MIEMBROS DE LAS FUERZAS ARMADAS Y DE LA POLICÍA NACIONAL",
            "LOS QUE DESEMPEÑAN CARGOS DE CARRERA EN LA ADMINISTRACIÓN PÚBLICA",
            "LOS MIEMBROS DE LA SUNAT NI DEL INSTITUTO: ACIONAL PENITENCIARIO",
            "LOS MIEMBROS DE LAS FUERZAS ARMADAS Y DE LA POLICIA NACIONAL EN ACTIVIDAD Y RETIRO",
            "TODOS LOS FUNCIONARIOS DEL ESTADO"],
        correctAnswer: 2
    },
    {
        id: 3,
        question: "TODA PERSONA TIENE DERECHO AL HONOR Y A LA",
        options: ["DESHONRA",
            "INTIMIDAD PERSONAL Y FAMILIAR.",
            "INTIMIDAD",
            "VIDA EN RIQUEZA",
            "INTIMIDAD RELIGIOSA"],
        correctAnswer: 2
    },
    {
        id: 4,
        question: "TIENE LA MÁS ALTA JERARQUÍA EN EL SERVICIO A LA NACION.",
        options: ["EL FISCAL DE LA NACIÓN.",
            "PRESIDENTE DE LA REPÚBLICA",
            "EL PRESIDENTE DEL TRIBUNAL CONSTITUCIONAL",
            "EL PRESIDENTE DEL CONSEJO DE MINISTROS",
            "JUECES SUPERIORES"],
        correctAnswer: 1
    }
];

export default function Quiz() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<(number | null)[]>(new Array(questions.length).fill(null));
    const [showScore, setShowScore] = useState(false);

    const handleAnswer = (value: number) => {
        const newAnswers = [...answers];
        newAnswers[currentQuestion] = value;
        setAnswers(newAnswers);
    };

    const handleNext = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        }
    };

    const handlePrevious = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
        }
    };

    const handleFinish = () => {
        setShowScore(true);
    };

    const calculateScore = () => {
        return answers.reduce((score, answer, index) => (answer != null && answer === questions[index].correctAnswer ? score! + 1 : score!), 0);
    };

    if (showScore) {
        return (
            <div className="flex h-[80vh] items-center justify-center">
                <div className="rounded-lg border bg-card p-8 text-center shadow-sm">
                    <h2 className="mb-4 text-2xl font-bold">¡Cuestionario completado!</h2>
                    <p className="text-xl">Tu puntuación: {calculateScore()} de {questions.length}</p>
                    <button
                        className="mt-4"
                        onClick={() => {
                            setShowScore(false);
                            setCurrentQuestion(0);
                            setAnswers(new Array(questions.length).fill(null));
                        }}
                    >
                        Reiniciar cuestionario
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-[80vh]  p-4 md:p-8 mt-14 ">
            <div className="flex mx-auto gap-8">
                <div className="">
                    <div className="mx-auto max-w-2xl rounded-lg border bg-card p-6 shadow-sm">
                        <h2 className="mb-6 text-xl font-semibold">Pregunta {currentQuestion + 1} de {questions.length}</h2>
                        <h3 className="mb-6 text-lg">{questions[currentQuestion].question}</h3>
                        <RadioGroup value={answers[currentQuestion]} onChange={handleAnswer} className="space-y-4">
                            {questions[currentQuestion].options.map((option, index) => (
                                <RadioGroup.Option key={index} value={index}>
                                    {({ checked }) => (
                                        <div className={`flex items-center rounded-lg border p-4 transition-colors ${checked ? 'bg-green-500 text-white' : 'hover:bg-accent'}`}>
                                            {/* <input type="radio" checked={checked} readOnly className="mr-3" /> */}
                                            <span className={`pr-3 h-5 w-5 rounded-full border-2 ${checked ? 'bg-green-500' : 'border-gray-400'}`} />
                                            <span className="ml-3">{option}</span>
                                        </div>
                                    )}
                                </RadioGroup.Option>
                            ))}
                        </RadioGroup>
                        <div className="mt-6 flex justify-between">
                            <button onClick={handlePrevious} disabled={currentQuestion === 0}>Anterior</button>
                            {currentQuestion === questions.length - 1 ? (
                                <button onClick={handleFinish} disabled={answers[currentQuestion] === null}>Finalizar</button>
                            ) : (
                                <button onClick={handleNext} disabled={answers[currentQuestion] === null}>Siguiente</button>
                            )}
                        </div>
                    </div>
                </div>
                <div className="hidden w-64 md:block">
                    <div className="rounded-lg border bg-card p-6 shadow-sm">
                        <h3 className="mb-6 text-center text-lg font-medium">Balotario</h3>
                        <div className="grid grid-cols-4 gap-4">
                            {questions.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentQuestion(index)}
                                    className={`relative flex h-12 w-12 items-center justify-center rounded-lg border text-base font-medium 
                                    transition-all ${currentQuestion === index && "border-primary"} 
                                    ${answers[index] !== null ? "bg-green-500 text-white hover:bg-green-600" : "hover:bg-accent"}`}>
                                    {index + 1}
                                    {answers[index] !== null && (
                                        <div className="absolute flex items-center justify-center -right-1 -top-1 h-4 w-4 rounded-full bg-green-500 p-0.5 text-white ring-2 ring-white">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check" viewBox="0 0 16 16">
                                                <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z" />
                                            </svg>
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
