'use client'

import { useState, useEffect } from "react";
import { fetchTableExams, fetchQuestionToTaller, fetchSaveIncorrectQuestions } from "../lib/actions";
import QuestionnaireVersionTaller from "../questionnaireVersionTaller/versionTaller";
import { useSession } from "next-auth/react";
import Results from "../results/results";

type Question = {
    id: string;
    question: string;
    tema: string;
    options: string[];
    correctAnswer: string;
};

interface Tabla {
    id: string,
    titulo: string,
    descripcion: string,
}

export default function Talleres() {
    const { data: session, status } = useSession();

    const [questions, setQuestions] = useState<Question[]>([])
    const [answers, setAnswers] = useState<{ [key: number]: string }>({});
    const [currentQuestion, setCurrentQuestion] = useState(1)

    const [tablaExam, setTablaExam] = useState<Tabla[]>([])
    const [isExamStarted, setExamStarted] = useState(false)
    const [qantitySelect, setQuantitySelect] = useState<number>(0);

    const [isFinished, setIsFinished] = useState(false);
    const [score, setScore] = useState(0);

    const [timer, setTimer] = useState(0);
    const chunkArray = (arr: Tabla[], size: number): Tabla[][] => {
        const chunks: Tabla[][] = [];
        for (let i = 0; i < arr.length; i += size) {
            chunks.push(arr.slice(i, i + size));
        }
        return chunks;
    };

    const tablasDivididas = chunkArray(tablaExam, 7);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await fetchTableExams();
                setTimer(data.length * 3);
                setTablaExam(data);
            } catch (error) {
                console.error("Error obteniendo los examenes:", error);
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        if (!isExamStarted || isFinished) return;

        const countdown = setInterval(() => {
            setTimer((prev) => {
                if (prev <= 1) {
                    clearInterval(countdown);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(countdown);
    }, [isExamStarted, isFinished]);

    const handleStartPractice = async (index: number, limit: number, offset: number) => {
        if (index === undefined) {
            console.warn("⚠ No se ha seleccionado una cantidad válida");
            return;
        }

        try {
            const data = await fetchQuestionToTaller(index, limit, offset);
            setQuestions(data);
            setExamStarted(true);
        } catch (error) {
            console.error("Error obteniendo las preguntas:", error);
        }
    };

    const handleFinish = async () => {
        console.log("Finalizando examen...")
        setIsFinished(true);

        const incorrectIds: string[] = [];

        const correctAnswers = questions.reduce((acc, question, index) => {
            const isCorrect = answers[index + 1] === question.correctAnswer;

            if (!isCorrect) {
                incorrectIds.push(question.id);
            }

            return acc + (isCorrect ? 1 : 0)
        }, 0);

        setScore(correctAnswers);

        if (session?.user?.userId) {
            console.log("INCORRECT IDS", incorrectIds);
            await fetchSaveIncorrectQuestions(session.user.userId, incorrectIds);
        } else {
            console.error("User ID is not available Practica class");
        }
    };

    const restartAll = () => {
        setQuestions([]);
        setCurrentQuestion(1);
        setAnswers({});
        setIsFinished(false);
        setScore(0);
        setQuantitySelect(0);
        setExamStarted(false);
        setTimer(0);
    }

    if (isFinished) {
        return <Results score={score} questions={questions} selectedAnswers={answers} onRestart={restartAll} />
    }

    if (tablaExam.length === 0) {
        return <p className="text-center text-gray-500 pt-10">Cargando Examenes...</p>;
    }

    return (
        <div className="flex w-full py-4 md:py-8 ">
            <div className=" mx-auto w-full">
                {!isExamStarted ? (
                    <div className="mx-3 md:mx-auto md:w-5/6 h-auto bg-gray-200 py-5 text-center md:px-10">
                        <div className="container mx-auto pb-10 ">
                            <div className="relative items-center mb-4 justify-center">
                                <h2 className="text-2xl font-bold text-green-700">Talleres</h2>
                                <h2 className="text-base font-bold text-gray-600">Practica según los talleres diarios</h2>
                            </div>

                            <div className="border rounded-lg overflow- overflow-auto">

                                {tablasDivididas.map((chunk, tablaIndex) => (
                                    <>
                                    <div className="border-l border-t border-r border-green-400 bg-green-600 py-2 text-white font-bold">TALLER {tablaIndex + 1}</div>
                                    <table key={tablaIndex} className="w-full mb-10 border-collapse table-auto border border-green-400">
                                        <thead className="bg-green-600">
                                            <tr>                                                
                                                <th className="px-6 py-2 text-center text-base font-medium text-white uppercase tracking-wider border border-green-400">
                                                    TiTULO
                                                </th>
                                                <th className="px-6 py-2 text-center text-base font-medium text-white uppercase tracking-wider border border-green-400">
                                                    Descripción
                                                </th>
                                                <th className="px-6 py-2 text-center text-base font-medium text-white uppercase tracking-wider hidden md:block border border-green-400">
                                                    Opción
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {chunk.map((row, index) => (
                                                <>
                                                    {/* Fila principal */}
                                                    <tr key={`${row.id}-1`} className={index % 2 === 0 ? "bg-lime-500/10" : "bg-white"}>
                                                        <td className="px-3 md:px-6 py-3 md:py-1 whitespace-nowrap text-sm font-medium text-center border border-green-400" rowSpan={3}>
                                                            CLASE {index + 1}
                                                        </td>
                                                        <td className="px-3 md:px-6 py-3 md:py-1 whitespace-nowrap text-sm text-center text-gray-900 border border-green-400">
                                                            <span className="bg-green-700 md:bg-transparent text-white md:text-gray-900 rounded-lg md:rounded-none px-3 md:px-0 py-2 md:py-0">
                                                                SESIÓN 1
                                                            </span>
                                                        </td>
                                                        <td className="px-3 md:px-6 py-3 md:py-1 whitespace-nowrap text-sm justify-center text-gray-900 hidden md:flex border-t border-green-400">
                                                            <button
                                                                className="flex gap-2 bg-green-700 text-white px-3 py-2 rounded-lg"
                                                                onClick={() => handleStartPractice((index + tablaIndex * 7), 30, 0)}
                                                            >
                                                                <span>Ingresar Aquí</span>
                                                            </button>
                                                        </td>
                                                    </tr>

                                                    {/* Subfila 2 (SESIÓN 2) */}
                                                    <tr key={`${row.id}-2`} className={(index * 3 + 1) % 2 === 0 ? "bg-lime-500/10" : "bg-white"}>
                                                        <td className="px-3 md:px-6 py-3 md:py-1 whitespace-nowrap text-sm text-center text-gray-900 border border-green-400">
                                                            <span className="bg-green-700 md:bg-transparent text-white md:text-gray-900 rounded-lg md:rounded-none px-3 md:px-0 py-2 md:py-0">
                                                                SESIÓN 2
                                                            </span>
                                                        </td>
                                                        <td className="px-3 md:px-6 py-3 md:py-1 whitespace-nowrap text-sm justify-center text-gray-900 hidden md:flex border-t border-green-400">
                                                            <button
                                                                className="flex gap-2 bg-green-700 text-white px-3 py-2 rounded-lg"
                                                                onClick={() => handleStartPractice((index + tablaIndex * 7), 30, 30)}
                                                            >
                                                                <span>Ingresar Aquí</span>
                                                            </button>
                                                        </td>
                                                    </tr>

                                                    {/* Subfila 3 (SESIÓN 3) */}
                                                    
                                                    <tr key={`${row.id}-3`} className={(index * 3 + 2) % 2 === 0 ? "bg-lime-500/10" : "bg-white"}>
                                                        <td className="px-3 md:px-6 py-3 md:py-1 whitespace-nowrap text-sm text-center text-gray-900 border border-green-400">
                                                            <span className="bg-green-700 md:bg-transparent text-white md:text-gray-900 rounded-lg md:rounded-none px-3 md:px-0 py-2 md:py-0">
                                                            SESIÓN 3
                                                            </span>
                                                        </td>
                                                        <td className="px-3 md:px-6 py-3 md:py-1 whitespace-nowrap text-sm justify-center text-gray-900 hidden md:flex border-t border-green-400">
                                                            <button
                                                                disabled={chunk.length === 5  && (index * 3 + 2) == 14}
                                                                className={`flex gap-2 bg-green-700 text-white px-3 py-2 rounded-lg ${chunk.length === 5 && (index * 3 + 2) == 14 ? "opacity-50 cursor-not-allowed" : ""}`}
                                                                onClick={() => handleStartPractice((index + tablaIndex * 7), 40, 40)}
                                                            >
                                                                <span>Ingresar Aquí</span>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                    
                                                </>
                                            ))}
                                        </tbody>
                                    </table>
                                    </>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    <QuestionnaireVersionTaller
                        questions={questions}
                        selectedAnswers={answers}
                        setSelectedAnswers={setAnswers}
                        currentQuestion={currentQuestion}
                        setCurrentQuestion={setCurrentQuestion}
                        handleFinish={handleFinish}
                        timer={timer}
                    />
                )
                }
            </div>
        </div>
    );
}