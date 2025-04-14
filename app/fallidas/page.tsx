'use client'

import { useState, useEffect, useCallback } from "react";
import QuestionnaireVersionTwo from "../questionnaireVersionTwo/versionTwo";
import Options from "../components/options/options";
import { fetchIncorrectQuestions, fetchQuantityQuestions, updateIncorrectQuestions } from "../lib/actions";
import Results from "../results/results";
import { useSession } from "next-auth/react";

type Question = {
    id: string;
    question: string;
    tema: string;
    options: string[];
    correctAnswer: string;
    intentos: number;
};

const options = [10, 20, 30, 50, 100];

// 🔥 Función para obtener las opciones habilitadas según `quantityFallidas`
function getAvailableOptions(options: number[], num: number): number[] {
    if (num === 0) return []; // Si es 0, no habilitar nada
    if (num >= Math.max(...options)) return [...options]; // Si es >= 100, habilita todos
    const nextHigher = options.find(option => option >= num); // Encuentra el siguiente número mayor
    return options.filter(option => option <= (nextHigher ?? 0)); // Filtra los números menores o iguales al siguiente mayor
}


export default function Fallidas() {
    const { data: session, status } = useSession();
    const [allQuestions, setAllQuestions] = useState<Question[]>([]);
    const [showAlert, setShowAlert] = useState(false);
    const [isFinished, setIsFinished] = useState(false);
    const [score, setScore] = useState(0);
    const [quantityFallidas, setQuantityFallidas] = useState(0);
    const [loading, setLoading] = useState(true);

    const [currentQuestion, setCurrentQuestion] = useState(1);
    const [answers, setAnswers] = useState<{ [key: number]: string }>({});

    // constantes de SelectorOne.tsx
    const [qantitySelect, setQuantitySelect] = useState<number>(0);
    const [isPracticeStarted, setIsPracticeStarted] = useState(false);
    const [selectedButton, setSelectedButton] = useState<number | null>(null);

    const [incorrectQuestions, setIncorrectQuestions] = useState<String[]>([]);

    const fetchQuantityFallidas = useCallback(async () => {
        setLoading(true); // ✅ Muestra el mensaje de carga
        try {
            if (session?.user?.userId) {
                const data = await fetchQuantityQuestions(session.user.userId, 'preguntasfallidas');
                setQuantityFallidas(data);
            } else {
                console.error("User ID is not available Fallidas class");
            }
        } catch (error) {
            console.error("Error obteniendo las preguntas:", error);
        } finally {
            setLoading(false);
        }
    }, [session?.user?.userId]);

    useEffect(() => {
        fetchQuantityFallidas();
    }, [fetchQuantityFallidas]);



    const getAllQuestions = async (quantity: number) => {
        try {
            // const data = await getQuestionRamdonWithLimit(quantity);
            if (session?.user?.userId) {
                const data = await fetchIncorrectQuestions(session.user.userId, quantity)
                setAllQuestions(data);
            } else {
                console.error("User ID is not available Fallidas class");
            }
        } catch (error) {
            console.error("Error obteniendo las preguntas:", error);
        }
    }

    const handleStartPractice = async () => {

        if (qantitySelect != 0) {
            await getAllQuestions(qantitySelect)
            setIsPracticeStarted(true);
        } else {
            setShowAlert(true);
        }
    };

    const handleFinish = async () => {
        setIsFinished(true);

        const correctIds: string[] = [];
        const incorrectIds: string[] = [];

        const correctAnswers = allQuestions.reduce((acc, question, index) => {
            const isCorrect = answers[index + 1] === question.correctAnswer;

            if (isCorrect) {
                correctIds.push(question.id);
            } else {
                incorrectIds.push(question.id);
            }

            return acc + (isCorrect ? 1 : 0);
        }, 0);

        setScore(correctAnswers);

        if (session?.user?.userId) {
            await updateIncorrectQuestions(session.user.userId, correctIds, incorrectIds);
        } else {
            console.error("User ID is not available Fallidas class");
        }

    };

    const handleSelect = (quantity: number) => {
        setSelectedButton(quantity);
        setQuantitySelect(quantity);
    };

    const availableOptions = getAvailableOptions(options, quantityFallidas); // Obtiene las opciones habilitadas


    const restartAll = async () => {
        setAllQuestions([]);
        setCurrentQuestion(1);
        setAnswers({});
        setIsFinished(false);
        setScore(0);
        setShowAlert(false);
        setQuantitySelect(0);
        setIsPracticeStarted(false);
        setIncorrectQuestions([]);
        setQuantityFallidas(0);
        await fetchQuantityFallidas()
    }

    if (isFinished) {
        return <Results score={score} questions={allQuestions} selectedAnswers={answers} onRestart={restartAll} />
    }

    return (
        <div className="flex lg:p-8 lg:px-2">

            {!isPracticeStarted ? (
                <div className="mx-auto md:w-5/6 ">
                    <div className="bg-gray-200 mx-4 px-2 py-5 text-center rounded-md lg:rounded-lg mb-4 lg:mb-0">
                        <h2 className="text-xl mt-4 text-slate-900">Realiza una práctica con todas las preguntas según la cantidad que escojas.</h2>
                        {loading ? (
                            <h3>Cargando preguntas fallidas...</h3> // ✅ Muestra un mensaje de carga
                        ) : (
                            <h3 className="text-base text-slate-800">Total de preguntas fallidas: {quantityFallidas !== null ? quantityFallidas : "0"}</h3> // ✅ Evita mostrar 0 si aún no hay datos
                        )}
                        {/* <Options onQuantitySelect={setQuantitySelect} onStartPractice={handleStartPractice} /> */}
                        <div className="w-full mb-4">
                            <div className="relative flex flex-col justify-start items-center">
                                {/* <h2 className="text-xl">Realiza una práctica con todas las preguntas según la cantidad que escojas.</h2> */}
                                <div className="w-full sticky top-0 z-10 pb-4 text-center">
                                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mx-10 my-10">
                                        {options.map((option, index) => (
                                            <button
                                                key={index}
                                                disabled={!availableOptions.includes(option)}
                                                className={`border py-3 px-2 rounded-2xl hover:border-slate-300 hover:shadow-lg 
                                                    ${selectedButton === option ? "bg-green-600 text-white" : "bg-white"}
                                                    ${!availableOptions.includes(option) ? "opacity-50 cursor-not-allowed" : ""}`}
                                                onClick={() => handleSelect(option)}
                                            >
                                                {`${option} preguntas`}
                                            </button>
                                        ))}
                                    </div>

                                </div>
                            </div>

                            {/* Botón para iniciar práctica */}
                            <div className="mx-auto text-center">
                                <button
                                    disabled={quantityFallidas === 0} // ✅ Deshabilita el botón si no hay preguntas fallidas
                                    onClick={handleStartPractice}
                                    className={`bg-green-600 text-white rounded-lg px-4 py-3 hover:bg-green-500
                                    ${quantityFallidas === 0 ? "opacity-50 cursor-not-allowed" : ""}`}>
                                    Iniciar Práctica
                                </button>
                            </div>
                            <div className="text-slate-900 my-2">
                                <span className="font-bold text-slate-800">Recuerda:</span> necesitas responder 2 veces una pregunta para eliminarla, si fallas se reinicia tus intento sobre la pregunta
                            </div>
                        </div>
                        {showAlert && <div className="text-red-500">Por favor selecciona una cantidad correcta de preguntas.</div>}
                    </div>
                </div>
            ) : (
                <div className="flex justify-center">
                    <QuestionnaireVersionTwo
                        questions={allQuestions}
                        selectedAnswers={answers}
                        setSelectedAnswers={setAnswers}
                        currentQuestion={currentQuestion}
                        setCurrentQuestion={setCurrentQuestion}
                        handleFinish={handleFinish}
                    />
                </div>
            )}
        </div>
    );
}