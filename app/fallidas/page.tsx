'use client'

import { useState, useEffect } from "react";
import QuestionnaireVersionTwo from "../questionnaireVersionTwo/versionTwo";
import Options from "../components/options/options";
import { fetchIncorrectQuestions, fetchQuantityQuestions } from "../lib/actions";
import Results from "../results/results";

type Question = {
    id: string;
    question: string;
    options: string[];
    correctAnswer: string;
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchQuantityQuestions('preguntasfallidas');
                setQuantityFallidas(data);
            } catch (error) {
                console.error("Error obteniendo las preguntas:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    const getAllQuestions = async (quantity: number) => {
        try {
            // const data = await getQuestionRamdonWithLimit(quantity);
            const data = await fetchIncorrectQuestions(quantity)
            setAllQuestions(data);
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

        const incorrectIds: string[] = [];

        const correctAnswers = allQuestions.reduce((acc, question, index) => {
            const isCorrect = answers[index + 1] === question.correctAnswer;

            if (!isCorrect) {
                incorrectIds.push(question.id);
            }

            return acc + (isCorrect ? 1 : 0);
        }, 0);

        setScore(correctAnswers);
        setIncorrectQuestions(incorrectIds);

        // await saveIncorrectQuestions(incorrectIds)
        // await fetchSaveIncorrectQuestions(incorrectIds)
    };

    const handleSelect = (quantity: number) => {
        setSelectedButton(quantity);
        setQuantitySelect(quantity);
    };

    const availableOptions = getAvailableOptions(options, quantityFallidas); // Obtiene las opciones habilitadas


    const restartAll = () => {
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
    }

    if (isFinished) {
        return <Results score={score} questions={allQuestions} selectedAnswers={answers} onRestart={restartAll} />
    }

    return (
        <div className="flex min-h-[80vh] p-4 md:p-8 mt-14 ">
            <div className="mx-auto md:w-5/6 ">
                {!isPracticeStarted ? (
                    <div className="bg-gray-200 py-5 text-center">
                        <h2 className="text-xl mt-4 text-slate-700">Realiza una práctica con todas las preguntas según la cantidad que escojas.</h2>
                        {loading ? (
                            <h3>Cargando preguntas fallidas...</h3> // ✅ Muestra un mensaje de carga
                        ) : (
                            <h3 className="text-base text-slate-600">Total de preguntas fallidas: {quantityFallidas !== null ? quantityFallidas : "0"}</h3> // ✅ Evita mostrar 0 si aún no hay datos
                        )}
                        {/* <Options onQuantitySelect={setQuantitySelect} onStartPractice={handleStartPractice} /> */}
                        <div className="w-full mb-4">
                            <div className="relative flex flex-col justify-start items-center">
                                {/* <h2 className="text-xl">Realiza una práctica con todas las preguntas según la cantidad que escojas.</h2> */}
                                <div className="w-full sticky top-0 z-10 pb-4 text-center">
                                    <div className="grid grid-cols-5 gap-4 mx-10 my-10">
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
                        </div>
                        {showAlert && <div className="text-red-500">Por favor selecciona una cantidad correcta de preguntas.</div>}
                    </div>

                ) : (
                    <QuestionnaireVersionTwo
                        questions={allQuestions}
                        selectedAnswers={answers}
                        setSelectedAnswers={setAnswers}
                        currentQuestion={currentQuestion}
                        setCurrentQuestion={setCurrentQuestion}
                        handleFinish={handleFinish}
                    />
                )}
            </div>
        </div>
    );
}