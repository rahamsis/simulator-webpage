'use client'

import { useState, useEffect } from "react";
import SelectorOne from "../components/selectors/selectorOne";
import { fetchQuestionAndAnswer } from "../lib/actions";
import Results from "../results/results";
import { useSession } from "next-auth/react";
import QuestionnaireVersionOne from "../questionnaireVersionOne/versionOne";

type Question = {
    id: string;
    question: string;
    tema: string;
    claves: string;
    correctAnswer: string;
};

export default function Inteligencia() {
    const [questions, setQuestions] = useState<Question[]>([]);

    const [currentQuestion, setCurrentQuestion] = useState(1);

    const [showAlertTema, setShowAlertTema] = useState(false);

    // constantes de SelectorOne.tsx
    const [selectedTheme, setSelectedTheme] = useState<string>('');
    const [isPracticeStarted, setIsPracticeStarted] = useState(false);

    // const normalizar = (texto: string) =>
    //     texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();


    const getAllQuestions = async (idTema: string) => {
        try {
            const data = await fetchQuestionAndAnswer(idTema);
            setQuestions(data);
        } catch (error) {
            console.error("Error obteniendo las preguntas:", error);
        }
    }

    const resaltarPalabrasClave = (texto: string, claves: string[]) => {
        if (!claves || claves.length === 0) return texto;

        // Función para limpiar texto (sin tildes, puntuación, etc.)
        const limpiar = (str: string) =>
            str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                .replace(/^[.,!?;:()\[\]{}"“”¡¿]+|[.,!?;:()\[\]{}"“”¡¿]+$/g, "")
                .toLowerCase();

        // Mapeamos claves limpias → claves originales
        const clavesMap = claves.map(original => ({
            original,
            limpio: limpiar(original)
        }));

        const partes: React.ReactNode[] = [];
        let i = 0;

        while (i < texto.length) {
            let match = null;

            for (const { original, limpio } of clavesMap) {
                const segmento = texto.slice(i, i + original.length);
                const segmentoLimpio = limpiar(segmento);

                if (segmentoLimpio === limpio) {
                    match = original;
                    break;
                }
            }

            if (match) {
                partes.push(
                    <span
                        key={i}
                        style={{ color: 'red', textDecoration: 'underline' }}
                    >
                        {texto.slice(i, i + match.length)}
                    </span>
                );
                i += match.length;
            } else {
                partes.push(<span key={i}>{texto[i]}</span>);
                i++;
            }
        }

        return partes;
    };


    const handleStartPractice = async () => {
        console.log(selectedTheme)
        if (selectedTheme.length === 0) {
            setShowAlertTema(true);
        } else {
            await getAllQuestions(selectedTheme)
            setIsPracticeStarted(true);
        }
    };

    return (
        <div className="flex min-h-[80vh] py-4 md:p-8">
            <div className="mx-auto w-full">
                {!isPracticeStarted ? (
                    <div className="flex flex-col text-center">
                        <div className="mt-14">
                            <SelectorOne onThemeSelect={setSelectedTheme} />
                        </div>
                        <div className="mx-auto pt-10 text-center">
                            <button
                                onClick={handleStartPractice}
                                className="bg-green-600 text-white rounded-lg px-4 py-3">Iniciar </button>
                        </div>
                        {showAlertTema && <div className="text-red-500 text-center mt-5">Por favor selecciona un tema para poder continuar.</div>}
                    </div>
                ) : (
                    <div className="flex w-full justify-center">
                        <div className="w-5/6 px-6 md:p-8 bg-white rounded-xl shadow-lg md:mt-4 mb-6">
                            <div className="justify-between items-start gap-8 mb-2">
                                <div className="text-center justify-between w-full my-5">
                                    <h2 className="mb-0 text-[10px] leading-[12px] md:text-2xl text-slate-800 font-semibold left-0">
                                        <span className="text-green-800">{questions[currentQuestion - 1].tema.toUpperCase()}</span>
                                    </h2>
                                </div>
                                {questions.map((q, index) => {

                                    const clavesArray = q.claves
                                        ? q.claves.split(',').map(p => p.trim())
                                        : [];

                                    return (
                                        <div key={q.id || index} className="border-b border-gray-400 py-4">
                                            <h2 className="text-[10px] leading-[12px] md:text-base font-semibold mb-2 text-justify">
                                                {index + 1}.- {resaltarPalabrasClave(q.question, clavesArray)}
                                            </h2>
                                            <h3 className="text-[9px] leading-[12px] md:text-[15px] font-semibold mb-2 text-justify">
                                                Respuesta: {resaltarPalabrasClave(q.correctAnswer, clavesArray)}
                                            </h3>
                                            <div>
                                                <h2 className="text-[10px] leading-[12px] md:text-base text-slate-800 font-semibold right-0"> Codigo:
                                                    <span className="text-green-800 break-words">{q.id}</span>
                                                </h2>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            className="fixed bottom-4 md:bottom-10 left-4 md:left-10 bg-green-700 text-white px-3 py-3 rounded-full shadow-md hover:bg-green-600 transition"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-arrow-up-circle-fill" viewBox="0 0 16 16">
                                <path d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0m-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707z" />
                            </svg>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
