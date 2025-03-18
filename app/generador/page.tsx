'use client'

import { useState, useEffect } from "react";
import { RadioGroup } from "@headlessui/react";
import Options from "../components/options/page";
// import { getQuestionRamdonWithLimit } from "../lib/actions";
import { fetchQuestionRamdonWithLimit, fetchSaveIncorrectQuestions } from "../lib/actions";
// import { saveIncorrectQuestions } from "../lib/actions";
import QuestionnaireVersionTwo from "../questionnaireVersionTwo/page";
import Results from "../results/page";

type Question = {
    id: string;
    question: string;
    options: string[];
    correctAnswer: string;
};

export default function Generador() {
    const [questions, setQuestions] = useState<Question[]>([]);

    const [currentQuestion, setCurrentQuestion] = useState(1);
    const [answers, setAnswers] = useState<{ [key: number]: string }>({});

    const [isFinished, setIsFinished] = useState(false);
    const [score, setScore] = useState(0);
    const [showAlert, setShowAlert] = useState(false);

    // constantes de SelectorOne.tsx
    const [qantitySelect, setQuantitySelect] = useState<number>(0);
    const [isPracticeStarted, setIsPracticeStarted] = useState(false);

    const [incorrectQuestions, setIncorrectQuestions] = useState<String[]>([]);

    const getAllQuestions = async (quantity: number) => {
        try {
            // const data = await getQuestionRamdonWithLimit(quantity);
            const data =  await fetchQuestionRamdonWithLimit(quantity)
            setQuestions(data);
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

        const correctAnswers = questions.reduce((acc, question, index) => {
            const isCorrect = answers[index + 1] === question.correctAnswer;

            if (!isCorrect) {
                incorrectIds.push(question.id);
            }

            return acc + (isCorrect ? 1 : 0);
        }, 0);

        setScore(correctAnswers);
        setIncorrectQuestions(incorrectIds);

        // await saveIncorrectQuestions(incorrectIds)
        await fetchSaveIncorrectQuestions(incorrectIds)
    };

    const restartAll = () => {
        setQuestions([]);
        setCurrentQuestion(1);
        setAnswers({});
        setIsFinished(false);
        setScore(0);
        setShowAlert(false);
        setQuantitySelect(0);
        setIsPracticeStarted(false);
        setIncorrectQuestions([]);
    }

    if (isFinished) {
        return <Results score={score} questions={questions} selectedAnswers={answers} onRestart={restartAll} />
    }


    return (
        <div className="flex min-h-[80vh] p-4 md:p-8 mt-14 ">
            <div className="mx-auto md:w-5/6 ">
                {!isPracticeStarted ? (
                    <div className="bg-gray-200 py-5 text-center">
                        <h2 className="text-xl mt-4">Realiza una práctica con todas las preguntas según la cantidad que escojas.</h2>
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
                )}
            </div>
        </div>
    );
}
