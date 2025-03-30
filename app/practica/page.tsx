'use client'

import { useState, useEffect } from "react";
import SelectorOne from "../components/selectors/selectorOne";
import { fetchQuestionByIdTema, fetchSaveIncorrectQuestions } from "../lib/actions";
import QuestionnaireVersionTwo from "../questionnaireVersionTwo/versionTwo";
import Results from "../results/results";
import { useSession } from "next-auth/react";

type Question = {
    id: string;
    question: string;
    options: string[];
    correctAnswer: string;
    intentos: number;
};

export default function Quiz() {
    const { data: session, status } = useSession();
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

    // const [incorrectQuestions, setIncorrectQuestions] = useState<String[]>([]);

    const getAllQuestions = async (idTema: string) => {
        try {
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

    const handleFinish = async () => {
        setIsFinished(true);

        const incorrectIds: string[] = [];

        const correctAnswers = questions.reduce((acc, question, index) => {
            const isCorrect = answers[index + 1] === question.correctAnswer;

            if(!isCorrect) {
                incorrectIds.push(question.id);
            }
            
            return acc + (isCorrect ? 1 : 0);
        }, 0);


        setScore(correctAnswers);
        // setIncorrectQuestions(incorrectIds);

        if (session?.user?.userId) {
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
        setShowAlert(false);
        setSelectedTheme('');
        setSelectedCheckbox(0);
        setIsPracticeStarted(false);
        // setIncorrectQuestions([]);
    }

    if (isFinished) {
        return <Results score={score} questions={questions} selectedAnswers={answers} onRestart={restartAll} />
    }


    return (
        <div className="flex min-h-[80vh] p-4 md:p-8 ">
            <div className="mx-auto md:w-5/6 ">
                {!isPracticeStarted ? (
                    <div className="mt-14">
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
