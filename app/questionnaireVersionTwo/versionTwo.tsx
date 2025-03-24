'use client'

import { useState, useEffect } from "react";
import { RadioGroup } from "@headlessui/react";

interface Question {
    id: string;
    question: string;
    options: string[];
    correctAnswer: string;
    intentos: number;
};

interface QuestionnaireProps {
    questions: Question[];
    currentQuestion: number;
    setCurrentQuestion: (question: number) => void;
    selectedAnswers: { [key: string]: string };
    setSelectedAnswers: (answers: { [key: string]: string }) => void;
    handleFinish: () => void;
}

const QuestionnaireVersionTwo: React.FC<QuestionnaireProps> = ({
    questions,
    selectedAnswers,
    setSelectedAnswers,
    currentQuestion,
    setCurrentQuestion,
    handleFinish,
}) => {
    // const [pageStart, setPageStart] = useState(1);

    const handleAnswer = (value: string) => {
        setSelectedAnswers({
            ...selectedAnswers,
            [currentQuestion]: value,
        });
    };

    const handleNext = () => {
        // valida que se marque al menos una alternativa para pasara a la siguiente
        // if (currentQuestion < questions.length && selectedAnswers[currentQuestion] !== undefined) { 
        if (currentQuestion < questions.length) {
            setCurrentQuestion(currentQuestion + 1);
            // if (currentQuestion % 10 === 0) {
            //     setPageStart((prev) => prev + 10);
            // }
        }
    };

    const handlePrevious = () => {
        if (currentQuestion > 1) {
            setCurrentQuestion(currentQuestion - 1);
        }
    };

    return (
        <div className="flex min-h-[80vh] p-4 md:p-8 mt-14 ">
            <div className="mx-auto md:w-full ">
                <div className={`flex`}>
                    <div className="w-4/6 ">
                        <div className="mx-auto max-w-4xl rounded-lg border p-6 shadow-sm">
                            <div className="flex justify-between items-center">
                                <h2 className="mb-6 text-sm md:text-xl font-semibold">Pregunta {currentQuestion} de {questions.length}</h2>
                                {questions[currentQuestion - 1].intentos !== undefined &&
                                    <div className="mb-6 text-sm md:text-xl font-semibold flex items-center">
                                        {/* Icono con tooltip */}
                                        <div className="relative cursor-pointer text-green-800 group mx-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-info-circle" viewBox="0 0 16 16">
                                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                                <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                                            </svg>
                                            <span className="absolute left-1/2 -top-8 -translate-x-1/2 opacity-0 group-hover:opacity-100 group-hover:translate-y-[-4px] 
                                            transition-all duration-200 bg-green-800 text-white text-xs rounded-md px-2 py-2 whitespace-nowrap">
                                                intentos para eliminar pregunta fallida
                                            </span>
                                        </div>
                                        <div>
                                           Intento: {questions[currentQuestion - 1].intentos > 1 ? 1 : 2} de 2 
                                        </div>
                                    </div>
                                }
                            </div>
                            <h3 className="mb-6 text-sm md:text-lg">{questions[currentQuestion - 1].question}</h3>
                            <RadioGroup value={selectedAnswers[currentQuestion] ?? null} onChange={handleAnswer} className="space-y-4">
                                {questions[currentQuestion - 1].options.map((option, index) => {

                                    const [optionId, optionText] = option.split("@")
                                    return (
                                        <RadioGroup.Option key={optionId} value={optionId}>
                                            {({ checked }) => (
                                                <div className={`flex items-center rounded-lg border p-4 transition-colors ${checked ? 'bg-green-500 text-white' : 'hover:bg-accent'}`}>
                                                    <span className={`pr-3 h-5 w-5 rounded-full border-2 ${checked ? 'bg-green-500' : 'border-gray-400'}`} />
                                                    <span className="ml-3 text-sm md:text-base cursor-default">{optionText}</span>
                                                </div>
                                            )}
                                        </RadioGroup.Option>
                                    )
                                })}
                            </RadioGroup>

                            <div className="mt-6 flex justify-between">
                                <button
                                    onClick={handlePrevious}
                                    disabled={currentQuestion === 0}
                                    className={`bg-green-600 py-3 px-3 rounded-xl text-white 
                                        ${currentQuestion === 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                                >
                                    Anterior
                                </button>
                                {currentQuestion === questions.length ? (
                                    <button
                                        className={`bg-green-600 py-3 px-3 rounded-xl text-white ${selectedAnswers[currentQuestion] !== null && "hover:bg-green-500"}`}
                                        onClick={handleFinish}
                                        disabled={selectedAnswers[currentQuestion] === undefined}>Finalizar</button>
                                ) : (
                                    <button
                                        onClick={handleNext}
                                        disabled={currentQuestion === questions.length}
                                        className={`bg-green-600 py-3 px-3 rounded-xl text-white 
                                            ${selectedAnswers[currentQuestion] !== undefined && "cursor-pointer hover:bg-green-500"}`}
                                    >
                                        Siguiente
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="hidden md:block">
                        <div className="rounded-lg border p-6 shadow-sm">
                            <h3 className="mb-6 text-center text-lg font-medium">Balotario</h3>
                            <div className="grid grid-cols-8 gap-4">
                                {questions.map((_, index) => (
                                    <button
                                        key={index + 1}
                                        onClick={() => setCurrentQuestion(index + 1)}
                                        // pinta el background si se ha seleccionado alguna alternativa
                                        className={`relative flex h-12 w-12 items-center justify-center rounded-lg border text-base font-medium 
                                        transition-all ${currentQuestion === index + 1 && "border-primary"}                                     
                                        ${selectedAnswers[index + 1] !== undefined ? "bg-green-500 text-white hover:bg-green-600" : "hover:bg-accent"}`}>

                                        {index + 1}

                                        {/* agrega icono de check si se ha seleccionado alguna alternativa */}
                                        {selectedAnswers[index + 1] !== undefined && (
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
        </div>
    )
};

export default QuestionnaireVersionTwo;
