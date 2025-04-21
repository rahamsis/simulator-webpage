'use client'

import { useState, useEffect } from "react";
import SelectorOne from "../components/selectors/selectorOne";
import Checkbox from "@/app/ui/checkbox"
import { fetchQuestionByIdTema, fetchSaveIncorrectQuestions } from "../lib/actions";
import QuestionnaireVersionTwo from "../questionnaireVersionTwo/versionTwo";
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

export default function Quiz() {
  const { data: session, status } = useSession();
  const [questions, setQuestions] = useState<Question[]>([]);

  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});

  const [isFinished, setIsFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [timeExpired, setTimeExpired] = useState(false);
  const [showAlertTema, setShowAlertTema] = useState(false);
  const [showAlertCheckBox, setShowAlertCheckBox] = useState(false);

  // constantes de SelectorOne.tsx
  const [selectedTheme, setSelectedTheme] = useState<string>('');
  const [selectedCheckbox, setSelectedCheckbox] = useState<number>(0);
  const [isPracticeStarted, setIsPracticeStarted] = useState(false);
  const [startTimer, setStartTimer] = useState(0);
  const [timer, setTimer] = useState(0);

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

  const getAllQuestions = async (idTema: string, limit: number) => {
    try {
      const data = await fetchQuestionByIdTema(idTema, limit);
      setQuestions(data);
      setStartTimer(data.length * 72);
      setTimer(data.length * 72); //tiempo oficial
    } catch (error) {
      console.error("Error obteniendo las preguntas:", error);
    }
  }

  const handleStartPractice = async () => {
    if (selectedTheme.length === 0) {
      setShowAlertTema(true);
    } else if (selectedCheckbox == null || selectedCheckbox === 0) {
      setShowAlertTema(false);
      setShowAlertCheckBox(true);
    } else {
      await getAllQuestions(selectedTheme, selectedCheckbox)
      setIsPracticeStarted(true);
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
      console.error("User ID is not available Practica class");
    }
  };


  const restartAll = () => {
    setQuestions([]);
    setCurrentQuestion(1);
    setAnswers({});
    setStartTimer(0);
    setTimer(0);
    setIsFinished(false);
    setScore(0);
    setShowAlertTema(false);
    setShowAlertCheckBox(false);
    setSelectedTheme('');
    setSelectedCheckbox(0);
    setIsPracticeStarted(false);
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
        onRestart={restartAll} />
    );
  }


  return (
    <div className="flex mt-2 md:p-8">
      <div className="mx-auto w-full">
        {!isPracticeStarted ? (
          <div className="flex flex-col text-center my-14">
            <div className="">
              <SelectorOne onThemeSelect={setSelectedTheme} />
            </div>
            <div className="flex justify-center">
              <Checkbox
                options={[
                  { id: 50, name: "50 preguntas" },
                  { id: 100, name: "100 Preguntas" }
                ]}
                // onChange={(selected) => console.log("Opción seleccionada:", selected)}
                onChange={setSelectedCheckbox}
              />
            </div>
            <div className="mx-auto pt-10 text-center">
              <button
                onClick={handleStartPractice}
                className="bg-green-600 text-white rounded-lg px-4 py-3">Iniciar Práctica</button>
            </div>
            {showAlertTema && <div className="text-red-500 text-center mt-5">Por favor selecciona un tema para poder continuar y una cantidad de preguntas.</div>}
            {showAlertCheckBox && <div className="text-red-500 text-center mt-5">Por favor selecciona una cantidad de preguntas.</div>}
          </div>
        ) : (
          <div className="flex w-full justify-center">
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
          </div>
        )}
      </div>
    </div >
  );
}
