"use client"

import { useState, useEffect } from "react"
import { RadioGroup } from "@headlessui/react";

// Sample questions - replace with your actual questions
const questions = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    question: `Pregunta ${i + 1}: Lorem ipsum dolor sit amet?`,
    options: ["Opción A", "Opción B", "Opción C", "Opción D"],
    correctAnswer: 0,
}))

// Función para formatear el tiempo en mm:ss
const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
}

export default function Quiz() {
    const totalTimeInSeconds = questions.length * 10 // 10 segundos por pregunta
    const [currentQuestion, setCurrentQuestion] = useState(1)
    const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({})
    const [timer, setTimer] = useState(totalTimeInSeconds)
    const [pageStart, setPageStart] = useState(1)
    const [isFinished, setIsFinished] = useState(false)
    const [score, setScore] = useState(0)
    const [timeExpired, setTimeExpired] = useState(false)

    const [answers, setAnswers] = useState<(number | null)[]>(new Array(questions.length).fill(null));

    // Timer principal
    useEffect(() => {
        if (isFinished || timeExpired) return

        const countdown = setInterval(() => {
            setTimer((prev) => {
                if (prev <= 1) {
                    setTimeExpired(true)
                    clearInterval(countdown)
                    return 0
                }
                return prev - 1
            })
        }, 1000)

        return () => clearInterval(countdown)
    }, [isFinished, timeExpired])

    const handleNext = () => {
        if (currentQuestion < questions.length && !timeExpired) {
            setCurrentQuestion((prev) => prev + 1)
            if (currentQuestion % 10 === 0) {
                setPageStart((prev) => prev + 10)
            }
        }
    }

    const handlePrev = () => {
        if (currentQuestion > 1 && !timeExpired) {
            setCurrentQuestion((prev) => prev - 1)
            if ((currentQuestion - 1) % 10 === 0) {
                setPageStart((prev) => prev - 10)
            }
        }
    }

    const handleFinish = () => {
        setIsFinished(true)
        const correctAnswers = questions.reduce((acc, question, index) => {
            return acc + (selectedAnswers[index + 1] === question.correctAnswer ? 1 : 0)
        }, 0)
        setScore(correctAnswers)
    }

    // Verifica si una pregunta está habilitada (solo si la anterior fue respondida)
    const isQuestionEnabled = (questionNumber: number) => {
        if (questionNumber === 1) return true
        return selectedAnswers[questionNumber - 1] !== undefined
    }


    // const handleAnswer = (value: number) => {
    //     // const newAnswers = [...answers];
    //     // newAnswers[currentQuestion] = value;
    //     // setAnswers(newAnswers);

    // };

    const handleAnswer = (value: number) => {
        setSelectedAnswers((prev) => ({
            ...prev,
            [currentQuestion]: value,
        }));
    };

    if (isFinished) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
                <div className="w-full max-w-2xl p-8 bg-white rounded-xl shadow-lg">
                    <h2 className="text-2xl font-bold text-center mb-6">Resultados del Quiz</h2>
                    <div className="text-center">
                        <p className="text-4xl font-bold text-primary mb-4">
                            {score} / {questions.length}
                        </p>
                        <p className="text-gray-600">Respuestas correctas</p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
            <div className="w-full max-w-3xl p-8 bg-white rounded-xl shadow-lg">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div className="flex items-center gap-4">
                        {/* timer */}
                        {/* <div className={`w-20 h-20 rounded-full border-2 ${timeExpired ? "border-red-500 text-red-500" : "border-primary"} flex items-center justify-center`}>
                                <span className="text-xl font-semibold">{formatTime(timer)}</span>
                            </div> */}
                        {/* other timer xd */}
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-clock" viewBox="0 0 16 16">
                                <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z" />
                                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0" />
                            </svg>
                        </div>
                        <div className="relative">
                            <div>
                                <span className="text-sm text-gray-500">Tiempo restante</span>
                            </div>
                            <div className="text-center">
                                <span className={`text-2xl font-semibold ${timeExpired ? "text-red-500" : ""}`}>
                                    {formatTime(timer)}
                                </span>
                            </div>
                        </div>
                    </div>
                    {/* boton Finalizar */}
                    <button onClick={handleFinish} className="bg-green-600 text-white px-4 py-2 rounded-lg">
                        Finalizar
                    </button>
                </div>

                {/* Question and Progress */}
                <div className="flex justify-between items-start mb-8">
                    <div className="flex-1 pr-8">
                        <h2 className="text-xl font-semibold mb-6">{questions[currentQuestion - 1].question}</h2>
                        {/* <RadioGroup value={selectedAnswers[currentQuestion]?.toString()} onValueChange={(value) => {
                            if (!timeExpired) {
                                setSelectedAnswers((prev) => ({
                                ...prev,
                                [currentQuestion]: Number.parseInt(value),
                                }))
                            }
                            }}
                            className="space-y-4"
                            disabled={timeExpired}
                            >
                            {questions[currentQuestion - 1].options.map((option, index) => (
                            <div key={index} className={`flex items-center space-x-2 p-4 rounded-lg border hover:bg-gray-50 transition-colors 
                                    ${timeExpired ? "opacity-50 cursor-not-allowed" : ""}`}>
                                <RadioGroupItem value={index.toString()} id={`option-${index}`} disabled={timeExpired} />
                                <Label htmlFor={`option-${index}`} className={`flex-1 ${timeExpired ? "cursor-not-allowed" : "cursor-pointer"}`}>
                                    {option}
                                </Label>
                            </div>
                            ))}
                            </RadioGroup> */}

                        {
                            <RadioGroup value={selectedAnswers[currentQuestion]} onChange={handleAnswer} className="space-y-4">
                                {questions[currentQuestion].options.map((option, index) => (
                                    <RadioGroup.Option key={index} value={index}>
                                        {({ checked }) => (
                                            <div className={`flex items-center rounded-lg border p-4 transition-colors hover:bg-green-400
                                        ${checked ? 'bg-green-600 text-white' : 'hover:bg-accent'}
                                        ${timeExpired ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}>
                                                <span className={`pr-3 h-5 w-5 rounded-full border-2 ${checked ? 'bg-green-600' : 'border-gray-400'}`} />
                                                <span className="ml-3">{option}</span>
                                            </div>
                                        )}
                                    </RadioGroup.Option>
                                ))}
                            </RadioGroup>
                        }
                    </div>

                    {/* Progress Circle */}
                    <div className="relative w-24 h-24">
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

                {/* Navigation */}
                <div className="flex items-center justify-center gap-2 flex-wrap">
                    <button onClick={handlePrev} disabled={currentQuestion === 1 || timeExpired} className="border-2 px-4 py-2 rounded-xl">
                        Anterior
                    </button>
                    {Array.from({ length: Math.min(10, questions.length - pageStart + 1) }, (_, i) => (
                        <button
                            key={pageStart + i}
                            //   variant={currentQuestion === pageStart + i ? "default" : "outline"}
                            disabled={!isQuestionEnabled(pageStart + i) || timeExpired}
                            onClick={() => {
                                if (isQuestionEnabled(pageStart + i) && !timeExpired) {
                                    setCurrentQuestion(pageStart + i)
                                }
                            }}
                            className={`w-10 h-10 p-0 border-2 rounded-lg 
                                ${currentQuestion === i+1 && "bg-green-600 text-white"}
                                ${timeExpired && "bg-opacity-60"
                                }`}
                        >
                            {pageStart + i}
                        </button>
                    ))}
                    <button
                        onClick={handleNext}
                        disabled={currentQuestion === questions.length || timeExpired || !selectedAnswers[currentQuestion]}
                        className="border-2 px-4 py-2 rounded-xl"
                    >
                        Siguiente
                    </button>
                </div>

                {timeExpired && (
                    <div className="mt-6 text-center text-red-500 font-semibold">
                        ¡Tiempo agotado! Por favor, finaliza el quiz.
                    </div>
                )}
            </div>
        </div>
    )
}