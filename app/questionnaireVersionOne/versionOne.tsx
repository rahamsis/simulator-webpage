"use client"

import { useState, useEffect } from "react";
import { RadioGroup } from "@headlessui/react";

interface Question {
  id: string;
  question: string;
  tema: string;
  options: string[];
  correctAnswer: string;
}

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

const QuestionnaireVersionOne = ({
  questions,
  currentQuestion,
  setCurrentQuestion,
  selectedAnswers,
  setSelectedAnswers,
  timer,
  timeExpired,
  handleFinish
}: QuestionnaireProps) => {
  const [pageStart, setPageStart] = useState(1);

  const handleAnswer = (value: string) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion]: value,
    });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length && !timeExpired && selectedAnswers[currentQuestion] !== undefined) {
      setCurrentQuestion(currentQuestion + 1);
      if (currentQuestion % 10 === 0) {
        setPageStart((prev) => prev + 10);
      }
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 1 && !timeExpired) {
      setCurrentQuestion(currentQuestion - 1);
      if ((currentQuestion - 1) % 10 === 0) {
        setPageStart((prev) => prev - 10);
      }
    }
  };

  return (
    <div className="w-5/6 px-6 md:p-8 bg-white rounded-xl shadow-lg md:mt-4 mb-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <div className="flex items-center gap-4">
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

        {/* Progress Bar */}
        <div className="w-3/6 justify-center md:justify-start hidden lg:block 2xl:hidden">
          <div className="w-72 md:w-full">
            {/* Barra de progreso */}
            <div className="relative w-full h-6 bg-gray-200 rounded-full overflow-hidden mb-4">
              <div
                className={`h-full ${timeExpired ? "bg-red-500" : "bg-green-600"}`}
                style={{
                  width: `${(currentQuestion / questions.length) * 100}%`,
                  transition: "width 0.3s ease"
                }}
              />
              {/* Texto encima de la barra */}
              <div className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-white">
                {currentQuestion}/{questions.length}
              </div>
            </div>
          </div>

          {/* Información adicional: Tema y Código */}
          <div className="flex flex-row justify-between w-full px-2">
            <h2 className="mb-4 text-sm md:text-base text-slate-800 font-semibold left-0">
              Tema:
              <span className="text-green-800 break-words">{questions[currentQuestion - 1].tema}</span>
            </h2>
            <h2 className="mb-4 text-sm md:text-base text-slate-800 font-semibold right-0">
              Código:
              <span className="text-green-800 break-words">{questions[currentQuestion - 1].id}</span>
            </h2>
          </div>
        </div>

        {/* Botón Finalizar */}
        <button onClick={handleFinish} className="bg-green-600 text-white px-4 py-2 rounded-lg">Finalizar</button>
      </div>

      {/* Question and Progress */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-2">
        <div className="flex-1">
          <h2 className="text-[10px] leading-[12px] md:text-sm 2xl:text-base font-semibold mb-2 md:mb-6 text-justify">{questions[currentQuestion - 1].question}</h2>

          {/* Tema y Código */}
          <div className="flex flex-col justify-between w-full lg:w-52 lg:hidden">
            <h2 className="mb-0 text-[10px] leading-[12px] md:text-xs text-slate-800 font-semibold left-0">Tema:
              <span className="text-green-800 break-words">{questions[currentQuestion - 1].tema}</span>
            </h2>
            <h2 className="mb-4 text-[10px] leading-[12px] md:text-xs text-slate-800 font-semibold right-0"> Codigo:
              <span className="text-green-800 break-words">{questions[currentQuestion - 1].id}</span>
            </h2>
          </div>
          <RadioGroup value={selectedAnswers[currentQuestion] ?? null} onChange={handleAnswer} className="space-y-4">
            {questions[currentQuestion - 1].options.map((option) => {

              const [optionId, optionText] = option.split("@"); // Extrae el ID y el texto
              return (
                <RadioGroup.Option key={optionId} value={optionId} disabled={timeExpired}>
                  {({ checked }) => (
                    <div className={`flex text-[8px] leading-[12px] md:text-xs items-center rounded-lg border p-2 transition-colors 
                      ${checked ? 'bg-green-600 text-white' : timeExpired ? '' : 'hover:bg-gray-200'}
                      ${timeExpired ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`
                    }>
                      <span className={`pr-3 h-5 w-5 rounded-full border-2 ${checked ? 'bg-green-600' : 'border-gray-400'}`} />
                      <span className="ml-3 text-justify">{optionText}</span>
                    </div>
                  )}
                </RadioGroup.Option>
              );

            })}
          </RadioGroup>
        </div>

        {/* Progress Circle */}
        <div className="w-full md:w-auto justify-center md:justify-start hidden 2xl:block">
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

          <div className="flex flex-col justify-between w-40 md:w-52">
            <h2 className="mb-4 text-sm md:text-xl text-slate-800 font-semibold left-0">Tema: <br />
              <span className="text-green-800 break-words">{questions[currentQuestion - 1].tema}</span>
            </h2>
            <h2 className="mb-4 text-sm md:text-xl text-slate-800 font-semibold right-0"> Codigo: <br />
              <span className="text-green-800 break-words">{questions[currentQuestion - 1].id}</span>
            </h2>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex flex-wrap items-center justify-center gap-2 pt-2 md:pt-3">

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
      <div className="flex flex-wrap items-center justify-center gap-2 py-6">
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
              ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
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
  );
};

export default QuestionnaireVersionOne;
