'use client'

import { useState, useEffect } from "react";
import { RadioGroup } from "@headlessui/react";

interface Question {
    id: string;
    question: string;
    tema: string;
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
    timer: number;
    timeExpired: boolean;
    handleFinish: () => void;
}

const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};

const QuestionnaireVersionTwo: React.FC<QuestionnaireProps> = ({
    questions,
    selectedAnswers,
    setSelectedAnswers,
    currentQuestion,
    timer,
    timeExpired,
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
        <div className="flex my-7 px-4 lg:px-0 w-full">
            <div className="mx-auto md:w-full">
                <div className={`x:flex`}>
                    <div className="w-full">
                        <div className="mx-auto w-full rounded-lg border p-6 shadow-sm bg-white">
                            {/* Timer - si hay intentos muestro el timer arriba; para no descuadrar */}
                            {/* {questions[currentQuestion - 1].intentos !== undefined && */}
                            <div className={`w-full text-center mb-4 ${questions[currentQuestion - 1].intentos !== undefined ? 'md:hidden' : 'hidden'}`}>
                                <div className={`text-2xl font-semibold ${timeExpired ? "text-red-500" : ""}`}>
                                    {formatTime(timer)}
                                </div>
                            </div>
                            {/* // } */}

                            <div className="flex justify-between items-center mb-4">
                                {/* Titulo Pregunta */}
                                <h2 className="text-sm md:text-xl font-semibold">Pregunta {currentQuestion} de {questions.length}</h2>

                                {/* Timer - si no hay intentos muestro el timer a la derecha (para no descuadrar) */}
                                <div className={`${questions[currentQuestion - 1].intentos !== undefined ? 'hidden' : ''} md:flex`}>
                                    <div className={`text-2xl font-semibold ${timeExpired ? "text-red-500" : ""}`}>
                                        {formatTime(timer)}
                                    </div>
                                </div>

                                {/* Intentos */}
                                {questions[currentQuestion - 1].intentos !== undefined &&
                                    <div className="text-sm md:text-xl font-semibold flex justify-center items-center">
                                        {/* Icono con tooltip */}
                                        <div className="relative cursor-pointer text-green-800 group mx-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-info-circle" viewBox="0 0 16 16">
                                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                                <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                                            </svg>
                                            <span className="absolute left-1/2 -top-8 -translate-x-1/2 opacity-0 group-hover:opacity-100 group-hover:translate-y-[-4px] 
                                            transition-all duration-200 bg-green-800 text-white text-xs rounded-md px-2 py-2 whitespace-nowrap">
                                                intentos para eliminar pregunta fallida
                                            </span>
                                        </div>
                                        <div className="">
                                            Intento: {questions[currentQuestion - 1].intentos > 1 ? 1 : 2} de 2
                                        </div>
                                    </div>
                                }
                            </div>
                            <div className="flex flex-col lg:flex-row justify-between">
                                <h2 className="lg:mb-4 text-sm md:text-base text-slate-800 font-semibold left-0">Tema: <span className="text-green-800 break-words">{questions[currentQuestion - 1].tema}</span></h2>
                                <h2 className="mb-4 text-sm md:text-base text-slate-800 font-semibold right-0"> Codigo: <span className="text-green-800 break-words">{questions[currentQuestion - 1].id}</span></h2>
                            </div>
                            <h3 className="text-[10px] leading-[12px] md:text-sm 2xl:text-base font-semibold mb-2 md:mb-6 text-justify">{questions[currentQuestion - 1].question}</h3>
                            <RadioGroup value={selectedAnswers[currentQuestion] ?? null} onChange={handleAnswer} className="space-y-4">
                                {questions[currentQuestion - 1].options.map((option, index) => {

                                    const [optionId, optionText] = option.split("@")
                                    return (
                                        <RadioGroup.Option key={optionId} value={optionId}>
                                            {({ checked }) => (
                                                <div className={`flex text-[8px] leading-[12px] md:text-xs items-center rounded-lg border p-2 transition-colors 
                                                ${checked ? 'bg-green-500 text-white' : 'hover:bg-accent'}`}>
                                                    <span className={`pr-3 h-5 w-5 rounded-full border-2 ${checked ? 'bg-green-500' : 'border-gray-400'}`} />
                                                    <span className="ml-3 text-xs text-justify  cursor-default">{optionText}</span>
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
                                        // disabled={selectedAnswers[currentQuestion] === undefined}
                                    >
                                        Finalizar
                                    </button>
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

                    <div className="hidden ml-2 x:block x:w-[58%] 2xl:w-[33%]">
                        <div className="bg-white rounded-lg border p-6 shadow-sm">
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
