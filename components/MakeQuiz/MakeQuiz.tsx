"use client";

import { useRouter } from "next/navigation";
import { generateQuizQuestions } from "@/actions/createData";
import { Question } from "@/common/types";
import React, { useState, useEffect } from "react";

interface MakeQuizProps {
  quizType: string;
}

const MakeQuiz: React.FC<MakeQuizProps> = ({ quizType }) => {
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [score, setScore] = useState<number | null>(null);
  const [showAnswers, setShowAnswers] = useState<boolean>(false);

  const router = useRouter();
  useEffect(() => {
    const createQuiz = () => {
      const questions = generateQuizQuestions(quizType);
      setQuizQuestions(questions);
      setSelectedOptions(Array(questions.length).fill(""));
    };

    createQuiz();
  }, [quizType]);

  const handleOptionClick = (questionIndex: number, option: string) => {
    if (!showAnswers) {
      const updatedSelections = [...selectedOptions];
      updatedSelections[questionIndex] = option;
      setSelectedOptions(updatedSelections);
    }
  };

  const handleSubmit = () => {
    let calculatedScore = 0;
    quizQuestions.forEach((question, index) => {
      if (selectedOptions[index] === question.questionText.answer) {
        calculatedScore++;
      }
    });
    setScore(calculatedScore);
    setShowAnswers(true);
  };

  const handleRestart = () => {
    setSelectedOptions(Array(quizQuestions.length).fill(""));
    setScore(null);
    setShowAnswers(false);
  };

  const handleGoBack = () => {
    router.push("/StartQuiz");
  };

  return (
    <div className="w-full h-screen text-purple-600 font-bebas flex items-center justify-center flex-col">
      {quizQuestions.length === 0 ? (
        <p>No questions available. Please select lessons.</p>
      ) : (
        <div className="flex gap-5 flex-col flex-wrap w-full h-screen justify-start py-6 items-center">
          {quizQuestions.map((question, index) => (
            <div className="w-fit text-3xl h-fit" key={index}>
              <p>{question.questionText.question}</p>
              <div className="flex items-center gap-4">
                {question.questionText.options.map((option) => {
                  const isCorrect = option === question.questionText.answer;
                  const isSelected = option === selectedOptions[index];
                  let bgColor = "bg-white";

                  if (showAnswers) {
                    if (isCorrect) bgColor = "bg-green-600 text-white";
                    else if (isSelected) bgColor = "bg-red-600 text-white";
                  } else if (isSelected) {
                    bgColor = "bg-purple-600 text-white";
                  }

                  return (
                    <div
                      className={`w-32 px-2 h-10 mt-2 flex items-center cursor-pointer justify-center rounded-xl text-xl shadow-xl border-[1px] ${bgColor} border-purple-600`}
                      key={option}
                      onClick={() => handleOptionClick(index, option)}
                    >
                      {option}
                    </div>
                  );
                })}
              </div>
              {showAnswers &&
                selectedOptions[index] !== question.questionText.answer && (
                  <p className="text-red-500 text-lg mt-2">
                    Correct answer: {question.questionText.answer}
                  </p>
                )}
            </div>
          ))}
          <button
            className={`mt-4 px-6 py-2 text-xl rounded-xl shadow-lg ${
              showAnswers
                ? "bg-gray-200 cursor-not-allowed"
                : "bg-purple-600 text-white hover:bg-purple-800"
            }`}
            onClick={handleSubmit}
            disabled={showAnswers}
          >
            {showAnswers ? "Submitted" : "Submit"}
          </button>
          {score !== null && (
            <div className="mt-4 text-2xl text-green-600">
              Your score: {score} / {quizQuestions.length}
            </div>
          )}
          {showAnswers && (
            <div className="flex gap-4 mt-6">
              <button
                className="px-6 py-2 text-xl  shadow-lg bg-blue-600 text-white rounded-xl hover:bg-blue-800"
                onClick={handleRestart}
              >
                Restart Quiz
              </button>
              <button
                className="px-6 py-2 text-xl rounded-xl shadow-lg bg-gray-600 text-white hover:bg-gray-800"
                onClick={handleGoBack}
              >
                Go Back
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MakeQuiz;
