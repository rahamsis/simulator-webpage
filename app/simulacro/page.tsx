"use client";

import { useState, useEffect } from "react";
import { fetchQuestionSiecopol, fetchSaveIncorrectQuestions } from "../lib/actions";
import { fetchValidatePersonByCipAndDni } from "../lib/actions";
import Versioner from "../components/versioner/versioner";
import Version1 from "../questionnaireVersionOne/versionOne";
import Version2 from "../questionnaireVersionTwo/versionTwo";
import Version3 from "../questionnaireVersionThree/versionThree";
import Results from "../results/results";
import { useSession, signOut } from "next-auth/react";

interface Question {
  id: string;
  question: string;
  tema: string;
  options: string[];
  correctAnswer: string;
  intentos: number;
}

export default function Quiz() {
  const { data: session, status } = useSession();
  const [formData, setFormData] = useState({ cip: "", dni: "" });

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [selectedAnswers, setSelectedAnswers] = useState<{[key: number]: string;}>({});
  const [timer, setTimer] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [timeExpired, setTimeExpired] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [selectedVersion, setSelectedVersion] = useState(0);
  const [selectedLimit, setSelectedLimit] = useState(0);
  const [isPracticeStarted, setIsPracticeStarted] = useState(false);
  const [isVerifiedPerson, setVerifiedPerson] = useState(false);
  const [showAlertUser, setShowAlertUser] = useState(false);

  const getAllQuestionWithLimit = async (limit: number) => {
    try {
      const data = await fetchQuestionSiecopol(limit);
      setQuestions(data);
      setTimer(data.length * 72); //tiempo oficial
    } catch (error) {
      console.error("Error obteniendo las preguntas:", error);
    }
  };

  const handleStartPractice = async () => {
    if (selectedVersion !== 0 && selectedLimit !== 0) {
      await getAllQuestionWithLimit(selectedLimit);
      setIsPracticeStarted(true);
    } else {
      setShowAlert(true);
    }
  };

  const handleVerifyPerson = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = await fetchValidatePersonByCipAndDni(
      session?.user?.email,
      formData.cip,
      formData.dni
    );
    if (data) {
      setVerifiedPerson(true);
    } else {
      setVerifiedPerson(false);
      setShowAlertUser(true);
    }
  };

  useEffect(() => {
    if (!isPracticeStarted || isFinished || timeExpired) return;

    if (selectedVersion !== 3) {
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
    } else {
      if (isVerifiedPerson) {
        const countdown = setInterval(() => {
          setTimer((prev) => {
            if (prev <= 1) {
              setTimeExpired(true);
              clearInterval(countdown);
              handleFinish();
              return 0;
            }
            return prev - 1;
          });
        }, 1000);

        return () => clearInterval(countdown);
      } else {
        return;
      }
    }
  }, [
    isPracticeStarted,
    isFinished,
    timeExpired,
    selectedVersion,
    isVerifiedPerson,
  ]);

  // Manejo de cambios en los inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFinish = async () => {
    setIsFinished(true);

    const incorrectIds: string[] = [];

    const correctAnswers = questions.reduce((acc, question, index) => {
      const isCorrect = selectedAnswers[index + 1] === question.correctAnswer;

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

  const restartAll = () => {
    setQuestions([]);
    setCurrentQuestion(1);
    setSelectedAnswers({});
    setTimer(0);
    setIsFinished(false);
    setScore(0);
    setTimeExpired(false);
    setShowAlert(false);
    setSelectedVersion(0);
    setSelectedLimit(0);
    setIsPracticeStarted(false);
    setVerifiedPerson(false);
    setShowAlertUser(false);
    setVerifiedPerson(false);
    setFormData({ cip: "", dni: "" });
  };

  if (isFinished) {
    return (
      <Results
        score={score}
        questions={questions}
        selectedAnswers={selectedAnswers}
        onRestart={restartAll}
      />
    );
  }

  return (
    <div className={`flex w-full flex-col items-center ${!isPracticeStarted && "justify-center"} bg-transparent`}>
      {!isPracticeStarted ? (
        <div className=" md:w-5/6 bg-gray-200 mx-4 py-5 text-center my-14">
          <Versioner
            onVersionSelect={setSelectedVersion}
            onCheckboxSelect={setSelectedLimit}
            onStartPractice={handleStartPractice}
          />
          {showAlert && (
            <div className="text-red-500">
              Por favor selecciona una versión y una opción del checkbox.
            </div>
          )}
        </div>
      ) : (
        <>
          {selectedVersion === 1 ? (
            <Version1
              questions={questions}
              currentQuestion={currentQuestion}
              setCurrentQuestion={setCurrentQuestion}
              selectedAnswers={selectedAnswers}
              setSelectedAnswers={setSelectedAnswers}
              timer={timer}
              timeExpired={timeExpired}
              handleFinish={handleFinish}
            />
          ) : selectedVersion === 2 ? (
            <Version2
              questions={questions}
              selectedAnswers={selectedAnswers}
              setSelectedAnswers={setSelectedAnswers}
              currentQuestion={currentQuestion}
              setCurrentQuestion={setCurrentQuestion}
              handleFinish={handleFinish}
            />
          ) : selectedVersion === 3 && !isVerifiedPerson ? (
            <form onSubmit={handleVerifyPerson} className="relative w-full">
              <div className="bg-[#087bb4] text-center text-white py-5 top-0">
                <div className="text-lg md:text-2xl font-extrabold">
                  POLICÍA NACIONAL DEL PERÚ
                </div>
                <div className="text-xs md:text-base">
                  Sistema de Evaluación del Conocimiento Policial - SIECOPOL
                </div>
                <div className="text-xs md:text-base">Módulo de Examen Virtual</div>
                <div className="text-[9px] md:text-xs">
                  SIMULADOR DEL PROCESO DE SUBOFICIALES DE ARMAS 2025 -
                  PROMOCIÓN 2026
                </div>
              </div>
              <div className="flex justify-center my-3">
                <div className="w-9/12 md:w-6/12">
                  <div className="flex gap-2 my-2">
                    <div className="bg-[#087bb4] w-1/3 flex items-center justify-center border border-blue-500 text-white font-bold">
                      CIP:
                    </div>
                    <input
                      type="text"
                      id="cip"
                      name="cip"
                      value={formData.cip}
                      onChange={handleChange}
                      className="w-full px-2 py-1 border rounded pl-10 outline-none"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={6}
                      onInput={(e) => {
                        (e.target as HTMLInputElement).value = (
                          e.target as HTMLInputElement
                        ).value.replace(/\D/g, ""); // Remueve letras y caracteres no numéricos
                      }}
                    />
                  </div>

                  <div className="flex gap-2">
                    <div className="bg-[#087bb4] w-1/3 flex items-center justify-center border border-blue-500 text-white font-bold">
                      DNI:
                    </div>
                    <input
                      type="text"
                      id="dni"
                      name="dni"
                      value={formData.dni}
                      onChange={handleChange}
                      className="w-full px-2 py-1 border rounded pl-10 outline-none"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={8}
                      onInput={(e) => {
                        (e.target as HTMLInputElement).value = (
                          e.target as HTMLInputElement
                        ).value.replace(/\D/g, ""); // Remueve letras y caracteres no numéricos
                      }}
                    />
                  </div>

                  <div className="my-2 text-center">
                    <button type="submit" className="bg-gray-300 w-1/2  py-1 border border-gray-600">
                      INGRESAR
                    </button>
                  </div>
                </div>
              </div>
              {showAlertUser && (
                <div className="text-center text-red-500">
                  Los datos ingresados son incorrectos, volver a validar.
                </div>
              )}
            </form>
          ) : selectedVersion === 3 && isVerifiedPerson ? (
            <Version3
              questions={questions}
              selectedAnswers={selectedAnswers}
              setSelectedAnswers={setSelectedAnswers}
              currentQuestion={currentQuestion}
              setCurrentQuestion={setCurrentQuestion}
              handleFinish={handleFinish}
              timer={timer}
            />
          ) : (
            <div>Selecciona una versión</div>
          )}
        </>
      )}
    </div>
  );
}
