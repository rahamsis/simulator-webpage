'use client'

import { useState, useEffect } from "react";
import Options from "../components/options/options";
import { fetchQuestionRamdonWithLimit, fetchSaveIncorrectQuestions } from "../lib/actions";
import QuestionnaireVersionTwo from "../questionnaireVersionTwo/versionTwo";
import Results from "../results/results";
import { useSession, signOut } from "next-auth/react";

type Question = {
  id: string;
  question: string;
  tema: string;
  options: string[];
  correctAnswer: string;
  intentos: number;
};

export default function Generador() {
  const { data: session, status } = useSession();
  const [questions, setQuestions] = useState<Question[]>([]);

  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});

  const [isFinished, setIsFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [timeExpired, setTimeExpired] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  // constantes de SelectorOne.tsx
  const [qantitySelect, setQuantitySelect] = useState<number>(0);
  const [isPracticeStarted, setIsPracticeStarted] = useState(false);
  const [startTimer, setStartTimer] = useState(0);
  const [timer, setTimer] = useState(0);

  // const [incorrectQuestions, setIncorrectQuestions] = useState<String[]>([]);

  useEffect(() => {
    if (!isPracticeStarted || isFinished || timeExpired) return;

    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          setTimeExpired(true);
          clearInterval(countdown);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, [
    isPracticeStarted,
    isFinished,
    timeExpired,
  ]);

  const getAllQuestions = async (quantity: number) => {
    try {
      const data = await fetchQuestionRamdonWithLimit(quantity)
      setQuestions(data);
      setStartTimer(data.length * 72);
      setTimer(data.length * 72); //tiempo oficial
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
    // setIncorrectQuestions(incorrectIds);

    if (session?.user?.userId) {
      await fetchSaveIncorrectQuestions(session.user.userId, incorrectIds);
    } else {
      console.error("User ID is not available Generador class");
    }
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
    setStartTimer(0);
    setTimer(0);
    // setIncorrectQuestions([]);
  }

  if (isFinished) {
    return (
      <Results
        score={score}
        questions={questions}
        selectedAnswers={answers}
        startTimer={startTimer}
        timer={timer}
        onRestart={restartAll} />);
  }


  return (
    <div className="flex p-4 md:p-8 justify-center">

      {!isPracticeStarted ? (
        <div className="mx-auto md:w-5/6">
          <div className="bg-gray-200 py-5 text-center lg:mt-14">
            <h2 className="text-xl mt-4">Realiza una práctica con todas las preguntas según la cantidad que escojas.</h2>
            <Options onQuantitySelect={setQuantitySelect} onStartPractice={handleStartPractice} />
            {showAlert && <div className="text-red-500">Por favor selecciona una cantidad correcta de preguntas.</div>}
          </div>
        </div>
      ) : (
        <QuestionnaireVersionTwo
          questions={questions}
          selectedAnswers={answers}
          setSelectedAnswers={setAnswers}
          currentQuestion={currentQuestion}
          setCurrentQuestion={setCurrentQuestion}
          handleFinish={handleFinish}
          timer={timer}
          timeExpired={timeExpired}
        />
      )}
    </div>
  );
}
