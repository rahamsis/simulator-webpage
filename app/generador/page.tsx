'use client'

import { useState, useEffect } from "react";
import { RadioGroup } from "@headlessui/react";
import Options from "../components/options/page";
import { getQuestionRamdonWithLimit } from "../lib/actions";

type Question = {
    id: string;
    question: string;
    options: string[];
    correctAnswer: string;
};

export default function Generador() {
    const [questions, setQuestions] = useState<Question[]>([]);

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<(string | null)[]>([]);

    const [showScore, setShowScore] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    // constantes de SelectorOne.tsx
    const [qantitySelect, setQuantitySelect] = useState<number>(0);
    const [isPracticeStarted, setIsPracticeStarted] = useState(false);

    const getAllQuestions = (quantity: number) => {
        async function fetchData() {
            try {
                const data = await getQuestionRamdonWithLimit(quantity);
                setQuestions(data);
            } catch (error) {
                console.error("Error obteniendo las preguntas:", error);
            }
        }
        fetchData();
    }

    // cada vez que questions cambie se actualiza la lista de answers
    useEffect(() => {
        setAnswers(new Array(questions.length).fill(null));
    }, [questions]);

    const handleStartPractice = () => {

        if (qantitySelect != 0) {
            getAllQuestions(qantitySelect)
            setIsPracticeStarted(true);
        } else {
            setShowAlert(true);
        }
    };

    const handleAnswer = (value: string) => {
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
        console.log("answers", answers)
        return answers.reduce((score, answer, index) => (
            answer != null && answer === questions[index].correctAnswer ? score! + 1 : score!
        ), 0);
    };

    const restartAll = () => {
        setShowScore(false);
        setCurrentQuestion(0);
        setAnswers(new Array(questions.length).fill(null));
        setQuantitySelect(0);
        setIsPracticeStarted(false);
        setShowAlert(false);
    }

    if (showScore) {
        return (
            <div className="flex flex-col py-20  items-center justify-center min-h-screen">
                <div className="w-full max-w-3xl p-8 bg-white rounded-lg border shadow-lg">
                    <h2 className="mb-4 text-2xl font-bold text-center">¡Cuestionario completado!</h2>
                    <p className="text-xl text-center">Tu puntuación: {calculateScore()} de {questions.length}</p>
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
                                    question.correctAnswer === answers[index] ?
                                        <p className="text-green-600">✔ Respuesta correcta</p> :
                                        <p className="text-red-500">✘ Respuesta incorrecta</p>

                                }

                                <p className="text-gray-500">
                                    Tu respuesta: <span className="text-xs">{
                                        question.options.map((option, i) => {
                                            const [optionId, optionText] = option.split("-")

                                            return (
                                                answers[index] === optionId ? optionText : ""
                                            )
                                        })
                                    }</span>
                                </p>

                                <p className="text-gray-700 font-semibold ">
                                    Respuesta correcta: <span className="text-xs">{

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
        );
    }


    return (
        <div className="flex min-h-[80vh] p-4 md:p-8 mt-14 ">
            <div className="mx-auto md:w-5/6 ">
                {/* <div className={`bg-gray-200 py-5 text-center ${isPracticeStarted ? "hidden" : "block"}`}>
                    <div className="">
                        <SelectorOne
                            onThemeSelect={setSelectedTheme}
                            onCheckboxSelect={setSelectedCheckbox}
                            onStartPractice={handleStartPractice} />
                    </div>
                    {showAlert &&
                        <div className="text-red-500">Por favor selecciona un tema para poder continuar y una opción del checkbox.</div>
                    }

                </div> */}
                <div className={`bg-gray-200 py-5 text-center ${isPracticeStarted ? "hidden" : "block"}`}>
                    <div className="">
                        {/* <SelectorOne
                            onThemeSelect={setSelectedTheme}
                            onCheckboxSelect={setSelectedCheckbox}
                            onStartPractice={handleStartPractice} /> */}
                        <Options
                            onQuantitySelect={setQuantitySelect}
                            onStartPractice={handleStartPractice} />
                    </div>
                    {showAlert &&
                        <div className="text-red-500">Por favor selecciona una cantidad de preguntas correcta.</div>
                    }

                </div>
                {questions.length === 0 ? (<p></p>)
                    :
                    (
                        <div className={`flex gap-8 mx-auto ${isPracticeStarted ? "block" : "hidden"}`}>
                            <div className="w-4/6">
                                <div className="mx-auto max-w-2xl rounded-lg border p-6 shadow-sm">
                                    <h2 className="mb-6 text-sm md:text-xl font-semibold">Pregunta {currentQuestion + 1} de {questions.length}</h2>
                                    <h3 className="mb-6 text-sm md:text-lg">{questions[currentQuestion].question}</h3>
                                    <RadioGroup value={answers[currentQuestion] ?? null} onChange={handleAnswer} className="space-y-4">
                                        {questions[currentQuestion].options.map((option, index) => {

                                            const [optionId, optionText] = option.split("-")
                                            return (
                                                <RadioGroup.Option key={optionId} value={optionId}>
                                                    {({ checked }) => (
                                                        <div className={`flex items-center rounded-lg border p-4 transition-colors ${checked ? 'bg-green-500 text-white' : 'hover:bg-accent'}`}>
                                                            {/* <input type="radio" checked={checked} readOnly className="mr-3" /> */}
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
                                            className={`bg-green-600 py-3 px-3 rounded-xl text-white ${currentQuestion !== 0 && "hover:bg-green-500"} `}
                                            onClick={handlePrevious}
                                            disabled={currentQuestion === 0}>Anterior</button>
                                        {currentQuestion === questions.length - 1 ? (
                                            <button
                                                className={`bg-green-600 py-3 px-3 rounded-xl text-white ${answers[currentQuestion] !== null && "hover:bg-green-500"}`}
                                                onClick={handleFinish}
                                                disabled={answers[currentQuestion] === null}>Finalizar</button>
                                        ) : (
                                            <button
                                                className={`bg-green-600 py-3 px-3 rounded-xl text-white ${answers[currentQuestion] !== null && "hover:bg-green-500"}`}
                                                onClick={handleNext}
                                                disabled={answers[currentQuestion] === null}>Siguiente</button>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="hidden w-ull md:block">
                                <div className="rounded-lg border p-6 shadow-sm">
                                    <h3 className="mb-6 text-center text-lg font-medium">Balotario</h3>
                                    <div className="grid grid-cols-8 gap-4">
                                        {questions.map((_, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setCurrentQuestion(index)}
                                                // pinta el background si se ha seleccionado alguna alternativa
                                                className={`relative flex h-12 w-12 items-center justify-center rounded-lg border text-base font-medium 
                                        transition-all ${currentQuestion === index && "border-primary"}                                     
                                        ${answers[index] !== null ? "bg-green-500 text-white hover:bg-green-600" : "hover:bg-accent"}`}>

                                                {index + 1}

                                                {/* agrega icono de check si se ha seleccionado alguna alternativa */}
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
                    )}
            </div>
        </div>
    );
}
