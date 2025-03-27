"use client";

import { useRouter } from "next/navigation";
import { generateQuizQuestions } from "@/actions/createData";
import { Test } from "@/common/types";
import React, { useState, useEffect } from "react";

interface MakeQuizProps {
  quizType: string;
}

const MakeQuiz: React.FC<MakeQuizProps> = ({ quizType }) => {
  const [quizQuestions, setQuizQuestions] = useState<Test[]>([]);
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
      if (selectedOptions[index] === question.answer) {
        calculatedScore++;
      }
    });
    setScore(calculatedScore);
    setShowAnswers(true);
  };

  const handleRestart = () => {
    setSelectedOptions(Array(quizQuestions.length).fill(""));
    setScore(null);
    console.log("here");
    const questions = generateQuizQuestions(quizType);
    setQuizQuestions(questions);
    setShowAnswers(false);
  };

  const handleGoBack = () => {
    router.push("/StartQuiz");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center py-10">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-4xl">
        <h1 className="text-4xl font-bold text-purple-600 text-center mb-6">
          {quizType} Quiz
        </h1>
        {quizQuestions.length === 0 ? (
          <p className="text-center text-xl text-gray-600">
            No questions available. Please select lessons.
          </p>
        ) : (
          <div className="space-y-6">
            {quizQuestions.map((question, index) => (
              <div
                key={index}
                className="bg-gray-100 p-6 rounded-lg shadow-md space-y-4"
              >
                <p className="text-2xl font-semibold text-purple-600">
                  {index + 1}. {question.question}
                </p>
                <div className="flex flex-wrap gap-4">
                  {question.options.map((option) => {
                    const isCorrect = option === question.answer;
                    const isSelected = option === selectedOptions[index];
                    let bgColor = "bg-white";

                    if (showAnswers) {
                      if (isCorrect) bgColor = "bg-green-500 text-white";
                      else if (isSelected) bgColor = "bg-red-500 text-white";
                    } else if (isSelected) {
                      bgColor = "bg-purple-600 text-white";
                    }

                    return (
                      <div
                        key={option}
                        className={`w-40 px-4 py-2 text-center rounded-xl text-purple-600 text-lg font-medium cursor-pointer shadow-md border transition-all duration-200 hover:shadow-lg ${bgColor} ${
                          showAnswers || isSelected
                            ? "cursor-default"
                            : "hover:bg-purple-100"
                        }`}
                        onClick={() => handleOptionClick(index, option)}
                      >
                        {option}
                      </div>
                    );
                  })}
                </div>
                {showAnswers && selectedOptions[index] !== question.answer && (
                  <p className="text-red-500 text-lg mt-2">
                    Correct answer: {question.answer}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
        <div className="mt-8 flex flex-col items-center">
          <button
            className={`px-8 py-3 text-xl rounded-xl font-bold shadow-lg transition-all duration-200 ${
              showAnswers
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-purple-600 text-white hover:bg-purple-800"
            }`}
            onClick={handleSubmit}
            disabled={showAnswers}
          >
            {showAnswers ? "Submitted" : "Submit"}
          </button>
          {score !== null && (
            <div className="mt-4 text-2xl text-green-600 font-semibold">
              Your score: {score} / {quizQuestions.length}
            </div>
          )}
          <div className="flex gap-6 mt-6">
            {showAnswers && (
              <button
                className="px-6 py-2 bg-blue-600 text-white text-lg font-semibold rounded-xl hover:bg-blue-800 transition-all duration-200"
                onClick={handleRestart}
              >
                Restart Quiz
              </button>
            )}
            <button
              className="px-6 py-2 bg-gray-600 text-white text-lg font-semibold rounded-xl hover:bg-gray-800 transition-all duration-200"
              onClick={handleGoBack}
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MakeQuiz;
