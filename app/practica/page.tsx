'use client'

import { useState, useEffect } from "react";
import { RadioGroup } from "@headlessui/react";
import SelectorOne from "../components/selectors/selectorOne";
// import { getQuestion } from "../lib/actions";
import { fetchQuestionByIdTema } from "../lib/actions";
import QuestionnaireVersionTwo from "../questionnaireVersionTwo/page";
import Results from "../results/page";

type Question = {
    id: string;
    question: string;
    options: string[];
    correctAnswer: string;
};

export default function Quiz() {
    const [questions, setQuestions] = useState<Question[]>([]);

    const [currentQuestion, setCurrentQuestion] = useState(1);
    const [answers, setAnswers] = useState<{ [key: number]: string }>({});

    const [isFinished, setIsFinished] = useState(false);
    const [score, setScore] = useState(0);
    const [showAlert, setShowAlert] = useState(false);

    // constantes de SelectorOne.tsx
    const [selectedTheme, setSelectedTheme] = useState<string>('');
    const [selectedCheckbox, setSelectedCheckbox] = useState<number>(0);
    const [isPracticeStarted, setIsPracticeStarted] = useState(false);

    const getAllQuestions = async (idTema: string) => {
        try {
            // const data = await getQuestion(idTema);
            const data = await fetchQuestionByIdTema(idTema);
            setQuestions(data);
        } catch (error) {
            console.error("Error obteniendo las preguntas:", error);
        }
    }

    const handleStartPractice = async () => {
        if (selectedTheme.length != 0 && selectedCheckbox != null) {
            await getAllQuestions(selectedTheme)
            setIsPracticeStarted(true);
        } else {
            setShowAlert(true);
        }
    };

    const handleFinish = () => {
        setIsFinished(true);
        const correctAnswers = questions.reduce((acc, question, index) => (
            acc + (answers[index + 1] === question.correctAnswer ? 1 : 0)
        ), 0);
        setScore(correctAnswers);
    };


    const restartAll = () => {
        setQuestions([]);
        setCurrentQuestion(1);
        setAnswers({});
        setIsFinished(false);
        setScore(0);
        setShowAlert(false);
        setSelectedTheme('');
        setSelectedCheckbox(0);
        setIsPracticeStarted(false);
    }

    if (isFinished) {
        return <Results score={score} questions={questions} selectedAnswers={answers} onRestart={restartAll} />
    }


    return (
        <div className="flex min-h-[80vh] p-4 md:p-8 mt-14 ">
            <div className="mx-auto md:w-5/6 ">
                {!isPracticeStarted ? (
                    <div className="">
                        <SelectorOne
                            onThemeSelect={setSelectedTheme}
                            onCheckboxSelect={setSelectedCheckbox}
                            onStartPractice={handleStartPractice} />
                        {showAlert && <div className="text-red-500">Por favor selecciona un tema para poder continuar y una opción del checkbox.</div>}

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
        </div >
    );
}
