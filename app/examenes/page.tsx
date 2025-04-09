'use client'

import { useState, useEffect } from "react";
import Results from "../results/results";
import { fetchTableExams, fetchQuestionSiecopolWhitOffset, fetchSaveIncorrectQuestions } from "../lib/actions";
import QuestionnaireVersionThree from "../questionnaireVersionThree/versionThree";
import { useSession } from "next-auth/react";

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

export default function Examenes() {
    const { data: session, status } = useSession();
    const [isExamStarted, setExamStarted] = useState(false)
    const [tablaExam, setTablaExam] = useState<Tabla[]>([])
    const [qantitySelect, setQuantitySelect] = useState<number>(0);

    const [questions, setQuestions] = useState<Question[]>([])
    const [answers, setAnswers] = useState<{ [key: number]: string }>({});
    const [currentQuestion, setCurrentQuestion] = useState(1);

    const [isFinished, setIsFinished] = useState(false);
    const [score, setScore] = useState(0);

    const [timer, setTimer] = useState(0);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await fetchTableExams();
                setTimer(data.length * 75);
                setTablaExam(data);
            } catch (error) {
                console.error("Error obteniendo los examenes:", error);
            }
        }
        fetchData();
    }, []);

    const handleStartPractice = async (index: number) => {
        if (index === undefined) {
            console.warn("⚠ No se ha seleccionado una cantidad válida");
            return;
        }

        try {
            const data = await fetchQuestionSiecopolWhitOffset(index);
            setQuestions(data);
            setExamStarted(true);
        } catch (error) {
            console.error("Error obteniendo las preguntas:", error);
        }
    };

    const handleFinish = async () => {
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
            await fetchSaveIncorrectQuestions(session.user.userId, incorrectIds);
        } else {
            console.error("User ID is not available Practica class");
        }
    };

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
                    <div className="mx-auto md:w-5/6 h-auto bg-gray-200 py-5 text-center md:px-10">
                        <div className="container mx-auto pb-10 ">
                            <div className="relative items-center mb-4 justify-center">
                                <h2 className="text-2xl font-bold text-green-700">Examenes no repetidos</h2>
                                <h2 className="text-base font-bold text-gray-600">Selecciona un examen para empezar</h2>
                            </div>

                            <div className="border rounded-lg overflow- overflow-auto">
                                <table className="w-full">
                                    <thead className="bg-green-600">
                                        <tr className="">
                                            <th className="px-6 py-2 text-center text-base font-medium text-white uppercase tracking-wider">
                                                Titulo
                                            </th>
                                            <th className="px-6 py-2 text-center text-base font-medium text-white uppercase tracking-wider">
                                                Descripción
                                            </th>
                                            <th className="px-6 py-2 text-center text-base font-medium text-white uppercase tracking-wider hidden md:flex">
                                                Opción
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tablaExam.map((row, index) => (
                                            <tr
                                                key={row.id}
                                                className={index % 2 === 0 ? "bg-lime-500/10" : "bg-white"}
                                            >
                                                <td
                                                    className="px-3 md:px-6 py-3 md:py-1 whitespace-nowrap text-sm text-left font-medium"
                                                    onClick={() => { handleStartPractice(index) }}>
                                                    <span className="bg-green-700 md:bg-transparent text-white md:text-gray-900 rounded-lg md:rounded-none px-3 md:px-0 py-2 md:py-0">
                                                        {row.titulo}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-1 whitespace-nowrap text-sm text-left text-gray-900">{row.descripcion}</td>
                                                <td className="px-6 py-1 whitespace-nowrap text-sm justify-center text-gray-900 hidden md:flex">
                                                    <button
                                                        className="flex gap-2 bg-green-700 text-white px-3 py-2 rounded-lg"
                                                        onClick={() => {
                                                            handleStartPractice(index)
                                                        }}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                                                        </svg>
                                                        <span>Ingresar Aqui </span>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                ) : (
                    <QuestionnaireVersionThree
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
