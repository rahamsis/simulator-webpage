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
    
    onRestart: () => void;
}

const Results = ({score, questions, selectedAnswers, onRestart }: ResultsProps) => {
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
                        onClick={onRestart}
                    >
                        Reiniciar cuestionario
                    </button>
                </div>

                {/* Lista de preguntas con respuestas correctas o incorrectas */}
                <ul className="space-y-4">
                    {questions.map((question, index) => (
                        <li key={index} className="p-4 border rounded-lg">
                            <p className="font-semibold">{question.question}</p>
                            {question.correctAnswer === selectedAnswers[index + 1] ? (
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
