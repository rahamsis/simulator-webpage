"use client";

import { useState, useEffect } from "react";
import { getQuestionSiecopol } from "../lib/actions";
import { validatePersonByCipAndDni } from "../lib/actions";
import Versioner from "../components/versioner/versioner";
import Version1 from "../questionnaireVersionOne/page";
import Version2 from "../questionnaireVersionTwo/page";
import Version3 from "../questionnaireVersionThree/page";
import Results from "../results/page";
import { useSession, signOut } from "next-auth/react";
import { set } from "zod";

interface Question {
  id: string;
  question: string;
  tema: string;
  options: string[];
  correctAnswer: string;
}

export default function Quiz() {
  const { data: session, status } = useSession();
  const [formData, setFormData] = useState({ cip: "", dni: "" });

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: number]: string;
  }>({});
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
      const data = await getQuestionSiecopol(limit);
      setQuestions(data);
      setTimer(data.length * 72); //tiempo oficial
      // setTimer(data.length * 10);
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

  const handlVerifyPerson = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const data = await validatePersonByCipAndDni(
      session?.user?.email,
      formData.cip,
      formData.dni
    );
    if (data) {
      setVerifiedPerson(true);
    } else {
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

  const handleFinish = () => {
    setIsFinished(true);
    const correctAnswers = questions.reduce(
      (acc, question, index) =>
        acc + (selectedAnswers[index + 1] === question.correctAnswer ? 1 : 0),
      0
    );
    setScore(correctAnswers);
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
    <div
      className={`flex bg-white w-full flex-col items-center ${!isPracticeStarted && "justify-center"
        } min-h-screen bg-trans p-4`}
    >
      {!isPracticeStarted ? (
        <div className="mx-auto md:w-5/6 bg-gray-200 py-5 text-center">
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
            <form onSubmit={handlVerifyPerson} className="relative w-full  p-4 md:p-8 mt-1">
              <div className="bg-[#087bb4] text-center text-white py-5 top-0">
                <div className="text-2xl font-extrabold">
                  POLICÍA NACIONAL DEL PERÚ
                </div>
                <div>
                  Sistema de Evaluación del Conocimiento Policial - SIECOPOL
                </div>
                <div>Módulo de Examen Virtual</div>
                <div className="text-xs">
                  SIMULADOR DEL PROCESO DE SUBOFICIALES DE ARMAS 2025 -
                  PROMOCIÓN 2026
                </div>
              </div>
              <div className="flex justify-center my-3">
                <div className="w-6/12">
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
