'use client'

import { useState, useEffect } from "react";
import { RadioGroup } from "@headlessui/react";
import Options from "../components/options/options";
// import { getQuestionSiecopolWhitOffset } from "../lib/actions";
import QuestionnaireVersionTwo from "../questionnaireVersionTwo/page";
import Results from "../results/page";
import { Button } from "../ui/button";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
// import { getTableExams } from "../lib/actions";
import {fetchTableExams, fetchQuestionSiecopolWhitOffset} from "../lib/actions";
import QuestionnaireVersionThree from "../questionnaireVersionThree/page";

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
    const [isExamStarted, setExamStarted] = useState(false)
    const [tablaExam, setTablaExam] = useState<Tabla[]>([])
    const [qantitySelect, setQuantitySelect] = useState<number>(0);
    // const [showAlert, setShowAlert] = useState(false);

    const [questions, setQuestions] = useState<Question[]>([])
    const [answers, setAnswers] = useState<{ [key: number]: string }>({});
    const [currentQuestion, setCurrentQuestion] = useState(1);

    const [isFinished, setIsFinished] = useState(false);
    const [score, setScore] = useState(0);

    const [timer, setTimer] = useState(0);

    // const getAllQuestions = async (quantity: number) => {
    //     try {
    //         const data = await getQuestionRamdonWithLimit(quantity);
    //         setQuestions(data);
    //     } catch (error) {
    //         console.error("Error obteniendo las preguntas:", error);
    //     }
    // }

    useEffect(() => {
        async function fetchData() {
            try {
                // const data = await getTableExams();
                const data = await fetchTableExams();
                setTimer(data.length * 75);
                setTablaExam(data);
            } catch (error) {
                console.error("Error obteniendo los examenes:", error);
            }
        }
        fetchData();
    }, []);

    const handleStartPractice = async (index:number) => {
        console.log("se dio click")
        if (index === undefined) {
            console.warn("⚠ No se ha seleccionado una cantidad válida");
            return;
        }

        try {
            // const data = await getQuestionSiecopolWhitOffset(index);
            const data = await fetchQuestionSiecopolWhitOffset(index);
            setQuestions(data);
            setExamStarted(true);
        } catch (error) {
            console.error("Error obteniendo las preguntas:", error);
        }
    };

    const handleFinish = () => {
        setIsFinished(true);
        const correctAnswers = questions.reduce((acc, question, index) => (
            acc + (answers[index + 1] === question.correctAnswer ? 1 : 0)
        ), 0);
        setScore(correctAnswers);
    };

    useEffect(() => {
        if (!isExamStarted || isFinished) return;

        const countdown = setInterval(() => {
            setTimer((prev) => {
                if (prev <= 1) {
                    // setTimeExpired(true);
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
        // setShowAlert(false);     
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
        <div className="bg-white flex w-full min-h-[80vh] py-4 md:py-8 ">
            <div className=" mx-auto w-full">
                {!isExamStarted ? (
                    <div className="mx-auto md:w-5/6 h-auto bg-gray-200 py-5 text-center px-10">
                        <div className="container mx-auto pb-10 ">
                            <div className="relative items-center mb-4 justify-center">
                                <h2 className="text-2xl font-bold text-green-700">Examenes no repetidos</h2>
                                <h2 className="text-base font-bold text-gray-600">Selecciona un examen para empezar</h2>
                                {/* <Button onClick={addRow} className="flex items-center gap-1">
                                    <PlusCircleIcon className="h-4 w-4" /> Añadir Fila
                                </Button> */}
                            </div>

                            <div className="border rounded-lg overflow-hidden">
                                <table className="w-full">
                                    <thead className="bg-green-600">
                                        <tr className="">
                                            <th className="px-6 py-2 text-center text-base font-medium text-white uppercase tracking-wider">
                                                Titulo
                                            </th>
                                            <th className="px-6 py-2 text-center text-base font-medium text-white uppercase tracking-wider">
                                                Descripción
                                            </th>
                                            <th className="px-6 py-2 text-center text-base font-medium text-white uppercase tracking-wider">
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
                                                <td className="px-6 py-1 whitespace-nowrap text-sm text-left font-medium text-gray-900">
                                                    {row.titulo}
                                                </td>
                                                <td className="px-6 py-1 whitespace-nowrap text-sm text-left text-gray-900">{row.descripcion}</td>
                                                <td className="px-6 py-1 whitespace-nowrap text-sm flex justify-center text-gray-900">
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
                {/* {!isPracticeStarted ? (
                    <div className="bg-gray-200 py-5 text-center">
                        <Options onQuantitySelect={setQuantitySelect} onStartPractice={handleStartPractice} />
                        {showAlert && <div className="text-red-500">Por favor selecciona una cantidad correcta de preguntas.</div>}
                    </div>

                ) : (
                    <QuestionnaireVersionTwo
                        questions={questions}
                        selectedAnswers={answers}
                        setSelectedAnswers={setAnswers}
                        currentQuestion={currentQuestion}
                        setCurrentQuestion={setCurrentQuestion}
                        handleFinish={handleFinish}
                    />
                )} */}

            </div>
        </div>
    );
}
