"use client"

import { useState, useEffect } from "react"
import { RadioGroup } from "@headlessui/react";
import { getQuestionRamdonWithLimit } from "../lib/actions";
import Versioner from "../components/versioner/versioner";

interface Question {
    id: string;
    question: string;
    options: string[];
    correctAnswer: string;
}


// Función para formatear el tiempo en mm:ss
const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
}

export default function Quiz() {
    const [questions, setQuestionsx] = useState<Question[]>([]);

    const [currentQuestion, setCurrentQuestion] = useState(1);
    const [selectedAnswers, setSelectedAnswers] = useState<{ [key: string]: string }>({});
    const [timer, setTimer] = useState(0);
    const [pageStart, setPageStart] = useState(1);
    const [isFinished, setIsFinished] = useState(false);
    const [score, setScore] = useState(0);
    const [timeExpired, setTimeExpired] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    // constantes de SelectorOne.tsx
    const [selectedVersion, setSelectedversion] = useState(0);
    const [selectedLimit, setSelectedLimit] = useState(0);
    const [isPracticeStarted, setIsPracticeStarted] = useState(false);

    // llenar las preguntas, opciones y respuesta
    const getAllQuestionWithLimit = (selectedLimit: number) => {
        async function fetchData() {
            try {
                const data = await getQuestionRamdonWithLimit(selectedLimit);
                console.log("Preguntas obtenidas:", data);
                setQuestionsx(data);
                setTimer(data.length * 10);
            } catch (error) {
                console.error("Error obteniendo las preguntas:", error);
            }
        }
        fetchData();
    };

    const handleStartPractice = async () => {
        if (selectedVersion != 0 && selectedLimit != 0) {
            getQuestionRamdonWithLimit(selectedLimit)
            await getAllQuestionWithLimit(selectedLimit)
            setIsPracticeStarted(true);
        } else {
            setShowAlert(true);
        }
    };

    // Timer principal
    useEffect(() => {
        if (!isPracticeStarted || isFinished || timeExpired || selectedVersion !== 1) return;

        const countdown = setInterval(() => {
            setTimer((prev) => {
                if (prev <= 1) {
                    setTimeExpired(true);
                    clearInterval(countdown);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(countdown);
    }, [isPracticeStarted, isFinished, timeExpired, selectedVersion]);

    const handleNext = () => {
        if (currentQuestion < questions.length && !timeExpired && selectedAnswers[currentQuestion] !== undefined) {
            setCurrentQuestion((prev) => prev + 1);
            if (currentQuestion % 10 === 0) {
                setPageStart((prev) => prev + 10);
            }
        }
    }

    const handlePrev = () => {
        if (currentQuestion > 1 && !timeExpired) {
            setCurrentQuestion((prev) => prev - 1);
            if ((currentQuestion - 1) % 10 === 0) {
                setPageStart((prev) => prev - 10);
            }
        }
    }

    const handleFinish = () => {
        setIsFinished(true);
        const correctAnswers = questions.reduce((acc, question, index) => {
            return acc + (selectedAnswers[index + 1] === question.correctAnswer ? 1 : 0);
        }, 0);
        setScore(correctAnswers);
    }

    const handleAnswer = (value: string) => {
        setSelectedAnswers((prev) => ({
            ...prev,
            [currentQuestion]: value,
        }));
    };

    const restartAll = () => {        
        setCurrentQuestion(1)
        setSelectedAnswers({})
        setTimer(0)
        setPageStart(1)               
        setIsFinished(false)
        setScore(0)
        setTimeExpired(false)
        setShowAlert(false)

        setSelectedversion(0)
        setSelectedLimit(0)
        setIsPracticeStarted(false)
    }

    if (isFinished) {
        return (
            <div className="flex flex-col py-20 items-center justify-center min-h-screen">
                <div className="w-full max-w-2xl p-8 bg-white rounded-xl shadow-lg">
                    <h2 className="text-2xl font-bold text-center mb-6">Resultados del Cuestionario</h2>
                    <div className="text-center">
                        <p className="text-4xl font-bold text-primary mb-4">
                            {score} / {questions.length}
                        </p>
                        <p className="text-gray-600">Respuestas correctas</p>
                    </div>
                    <div className="flex justify-center">
                        <button
                            className="mt-4 bg-green-500 py-3 px-3 rounded-xl text-white hover:bg-green-600 mb-4"
                            onClick={() => {
                                restartAll()
                            }}
                        >
                            Reiniciar cuestionario
                        </button>
                    </div>

                    {/* Lista de preguntas con respuestas correctas o incorrectas */}
                    <ul className="space-y-4">
                        {questions.map((question, index) => (

                            <li key={index} className="p-4 border rounded-lg">
                                <p className="font-semibold">{question.question}</p>

                                {
                                    question.correctAnswer === selectedAnswers[index + 1] ?
                                        <p className="text-green-600">✔ Respuesta correcta</p> :
                                        <p className="text-red-500">✘ Respuesta incorrecta</p>

                                }

                                <p className="text-gray-500">
                                    Tu respuesta: <span className="text-xs">{
                                        // question.options[selectedAnswers[index + 1]] ?? "No respondida"

                                        // const [optionId, optionText] = question.options.split("-")
                                        question.options.map((option, i) => {
                                            const [optionId, optionText] = option.split("-")

                                            return (
                                                selectedAnswers[index + 1] === optionId ? optionText : ""
                                            )
                                        })
                                    }</span>
                                </p>

                                <p className="text-gray-700 font-semibold ">
                                    Respuesta correcta: <span className="text-xs">{

                                        // question.options[question.correctAnswer]
                                        question.options.map((option, index) => {
                                            const [optionId, optionText] = option.split("-")
                                            return (
                                                question.correctAnswer === optionId ? optionText : ""
                                            )
                                        })
                                    }</span>
                                </p>
                            </li>
                        ))}
                    </ul>

                    <div className="flex justify-center">
                        <button
                            className="mt-4 bg-green-500 py-3 px-3 rounded-xl text-white hover:bg-green-600 mb-4"
                            onClick={() => {
                                restartAll()
                            }}
                        >
                            Reiniciar cuestionario
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
            <div className={`mx-auto md:w-5/6 ${isPracticeStarted ? "hidden" : "block"}`}>
                <div className={`bg-gray-200 py-5 text-center`}>
                    <div className="">
                        <Versioner
                            onVersionSelect={setSelectedversion}
                            onCheckboxSelect={setSelectedLimit}
                            onStartPractice={handleStartPractice} />
                    </div>
                    {showAlert &&
                        <div className="text-red-500">Por favor selecciona un tema para poder continuar y una opción del checkbox.</div>
                    }

                </div>
            </div>

            {questions.length === 0 ? (<p></p>)
                :
                (
                    <div className={`w-full max-w-5xl p-6 md:p-8 bg-white rounded-xl shadow-lg ${isPracticeStarted ? "block" : "hidden"}`}>
                        {/* Header */}
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
                            { selectedVersion === 1 && //version 1 es con contador
                                <div className="flex items-center gap-4">
                                    {/* Timer */}
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-clock" viewBox="0 0 16 16">
                                            <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z" />
                                            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0" />
                                        </svg>
                                    </div>
                                    <div>
                                        <span className="text-sm text-gray-500">Tiempo restante</span>
                                        <div className={`text-2xl font-semibold ${timeExpired ? "text-red-500" : ""}`}>
                                            {formatTime(timer)}
                                        </div>
                                    </div>
                                </div>
                            }
                            {/* Botón Finalizar */}
                            <button onClick={handleFinish} className="bg-green-600 text-white px-4 py-2 rounded-lg">
                                Finalizar
                            </button>
                        </div>

                        {/* Question and Progress */}
                        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-8">
                            {/* Pregunta y alternativas */}
                            <div className="flex-1">
                                <h2 className="text-sm md:text-xl font-semibold mb-6">{questions[currentQuestion - 1].question}</h2>
                                <RadioGroup value={selectedAnswers[currentQuestion] ?? null} onChange={handleAnswer} className="space-y-4">
                                    {questions[currentQuestion - 1].options.map((option, index) => {


                                        const [optionId, optionText] = option.split("-") // Extrae el ID y el texto
                                        return (
                                            <RadioGroup.Option key={optionId} value={optionId} disabled={timeExpired}>
                                                {({ checked }) => (
                                                    <div className={`flex text-sm md:text-base items-center rounded-lg border p-4 transition-colors 
                                            ${checked ? 'bg-green-600 text-white' : timeExpired ? '' : 'hover:bg-gray-200'}
                                            ${timeExpired ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}>
                                                        <span className={`pr-3 h-5 w-5 rounded-full border-2 ${checked ? 'bg-green-600' : 'border-gray-400'}`} />
                                                        <span className="ml-3">{optionText}</span>
                                                    </div>
                                                )}
                                            </RadioGroup.Option>
                                        )

                                    })}
                                </RadioGroup>
                            </div>

                            {/* Progress Circle */}
                            <div className="w-full md:w-auto justify-center md:justify-start hidden md:block">
                                <div className="relative w-40 h-40 md:w-52 md:h-52">
                                    <svg className="w-full h-full" viewBox="0 0 100 100">
                                        <circle
                                            className="text-gray-200"
                                            strokeWidth="8"
                                            stroke="currentColor"
                                            fill="transparent"
                                            r="42"
                                            cx="50"
                                            cy="50"
                                        />
                                        <circle
                                            className={`${timeExpired ? "text-red-500" : "text-green-600"}`}
                                            strokeWidth="8"
                                            strokeLinecap="round"
                                            stroke="currentColor"
                                            fill="transparent"
                                            r="42"
                                            cx="50"
                                            cy="50"
                                            strokeDasharray={264}
                                            strokeDashoffset={264 - (264 * currentQuestion) / questions.length}
                                            transform="rotate(-90 50 50)"
                                        />
                                    </svg>
                                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                        <span className="font-semibold">
                                            {currentQuestion}/{questions.length}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Navigation */}
                        <div className="flex flex-wrap items-center justify-center gap-2 pt-6">

                            {Array.from({ length: 10 }, (_, i) => pageStart + i).map((num) => (
                                num <= questions.length && (
                                    <button
                                        key={num}
                                        onClick={() => setCurrentQuestion(num)}
                                        disabled={selectedAnswers[num] === undefined && selectedAnswers[num - 1] === undefined}
                                        className={`border-2 px-3 py-1 rounded-lg 
                      ${currentQuestion === num && selectedAnswers[num] === undefined ? "border-slate-950 text-black" : ""} 
                      ${selectedAnswers[num] !== undefined ? "bg-green-600 text-white" : ""}
                      ${timeExpired ? "opacity-50 cursor-not-allowed" : ""}
                    `}
                                    >
                                        {num}
                                    </button>
                                )
                            ))}

                        </div>

                        <div className="flex flex-wrap items-center justify-center gap-2 pt-6">
                            <button
                                onClick={handlePrev}
                                disabled={currentQuestion === 1 || timeExpired}
                                className={`border-2 px-4 py-2 rounded-xl ${currentQuestion === 1 || timeExpired ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                            >
                                Anterior
                            </button>

                            <button
                                onClick={handleNext}
                                disabled={currentQuestion === questions.length || timeExpired || selectedAnswers[currentQuestion] === undefined}
                                className={`border-2 px-4 py-2 rounded-xl 
                            ${currentQuestion === questions.length || timeExpired || selectedAnswers[currentQuestion] === undefined
                                        ? "opacity-50 cursor-not-allowed"
                                        : "cursor-pointer"}`}
                            >
                                Siguiente
                            </button>
                        </div>

                        {/* Mensaje de tiempo agotado */}
                        {timeExpired && (
                            <div className="mt-6 text-center text-red-500 font-semibold">
                                ¡Tiempo agotado! Por favor, finaliza el quiz.
                            </div>
                        )}
                    </div>
                )}
        </div>
    );
}