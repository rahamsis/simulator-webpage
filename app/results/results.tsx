import React from "react";

interface Question {
    id: string;
    question: string;
    options: string[];
    correctAnswer: string;
}

interface ResultsProps {
    score: number;
    questions: Question[];
    selectedAnswers: { [key: string]: string };
    startTimer: number;
    timer: number;
    onRestart: () => void;
}

const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};

const Results = ({
    score,
    questions,
    selectedAnswers,
    startTimer,
    timer,
    onRestart }: ResultsProps) => {
    return (
        <div className="flex flex-col px-2 py-6 items-center justify-center min-h-screen">
            <div className="w-full md:w-3/4 p-4 md:p-8 bg-white rounded-xl shadow-lg">
                <h2 className="text-base md:text-3xl font-bold text-center mb-3 md:mb-6">Resultados de La Práctica</h2>
                {/* <div className="text-center">
                    <p className="text-lg md:text-4xl font-bold text-primary mb-2 md:mb-4">
                        {score} / {questions.length}
                    </p>
                    <p className="text-gray-600">Respuestas correctas</p>
                </div> */}
                <div className="text-center">
                    {/* <p className="text-lg md:text-4xl font-bold text-primary mb-2 md:mb-4">
                        Duración
                    </p> */}
                    <p className="text-sm md:text-2xl font-semibold text-green-700">
                        Total de Preguntas: <span className="text-green-700">{questions.length}</span>
                    </p>
                    <p className="text-sm md:text-2xl font-semibold text-green-700">
                        Duracion: <span className="text-green-700">{formatTime(startTimer - timer)}</span>
                    </p>
                    <p className="text-sm md:text-xl font-semibold text-stone-800">
                        Total de Preguntas Respondidas: <span className="text-stone-800">{Object.keys(selectedAnswers).length}</span>
                    </p>
                    <p className="text-sm md:text-lg font-semibold text-stone-600">
                        Total de Preguntas Correctas: <span className="text-stone-600">{score}</span>
                    </p>
                    <p className="text-sm md:text-base font-semibold text-stone-400 mb-2">
                        Total de Preguntas Incorrectas: <span className="text-stone-400">{Object.keys(selectedAnswers).length - score}</span>
                    </p>
                </div>
                <div className="flex justify-center">
                    <button
                        className="mt-4 bg-green-500 py-3 px-3 rounded-xl text-white hover:bg-green-600 mb-4"
                        onClick={onRestart}
                    >
                        Reiniciar cuestionario
                    </button>
                </div>
                <div className="flex justify-center">
                    <p className="text-blue-500">* Toda respuesta sin responder ingresa al modulo de preguntas fallidas</p>
                </div>

                {/* Lista de preguntas con respuestas correctas o incorrectas */}
                <ul className="space-y-4">
                    {questions.map((question, index) => (
                        <li key={index} className="p-4 border rounded-lg">
                            <p className="font-semibold">{question.question}</p>
                            {selectedAnswers[index + 1] == null ? (
                                <p className="text-blue-600">Θ Respuesta sin responder *</p>
                            ) :
                                question.correctAnswer === selectedAnswers[index + 1] ? (
                                    <p className="text-green-600">✔ Respuesta correcta</p>
                                ) : (
                                    <p className="text-red-500">✘ Respuesta incorrecta</p>
                                )}
                            <p className="text-gray-500">
                                Tu respuesta: <span className="text-xs">
                                    {question.options.map((option) => {
                                        const [optionId, optionText] = option.split("@");
                                        return selectedAnswers[index + 1] === optionId ? optionText : "";
                                    })}
                                </span>
                            </p>
                            <p className="text-gray-700 font-semibold">
                                Respuesta correcta: <span className="text-xs">
                                    {question.options.map((option) => {
                                        const [optionId, optionText] = option.split("@");
                                        return question.correctAnswer === optionId ? optionText : "";
                                    })}
                                </span>
                            </p>
                        </li>
                    ))}
                </ul>
                <div className="flex justify-center">
                    <button
                        className="mt-4 bg-green-500 py-3 px-3 rounded-xl text-white hover:bg-green-600 mb-4"
                        onClick={onRestart}
                    >
                        Reiniciar cuestionario
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Results;
