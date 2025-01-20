"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { data } from "@/data";

const SynonymQuiz: React.FC = () => {
  const [wordsToGuess, setWordsToGuess] = useState<string[]>([]);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [score, setScore] = useState<number | null>(null);
  const [showAnswers, setShowAnswers] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    const fetchWords = () => {
      const allWords = data.flatMap((lesson) =>
        lesson.words.map((word) => word.word)
      );
      const randomWords = allWords.sort(() => Math.random() - 0.5).slice(0, 10);
      setWordsToGuess(randomWords);
      setUserAnswers(Array(10).fill(""));
    };

    fetchWords();
  }, []);

  const handleInputChange = (index: number, value: string) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[index] = value;
    setUserAnswers(updatedAnswers);
  };

  const handleSubmit = () => {
    let calculatedScore = 0;

    wordsToGuess.forEach((word, index) => {
      const correctSynonyms =
        data.flatMap((lesson) => lesson.words).find((w) => w.word === word)
          ?.syn || [];
      if (correctSynonyms.includes(userAnswers[index].toLowerCase())) {
        calculatedScore++;
      }
    });

    setScore(calculatedScore);
    setShowAnswers(true);
  };

  const handleRestart = () => {
    setScore(null);
    setShowAnswers(false);
    setUserAnswers(Array(10).fill(""));
  };

  const handleGoBack = () => {
    router.push("/StartQuiz");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-3xl">
        <h1 className="text-3xl font-bold text-purple-600 text-center mb-6">
          Synonym Quiz
        </h1>
        <div className="space-y-4">
          {wordsToGuess.map((word, index) => (
            <div
              key={index}
              className="bg-gray-100 p-4 rounded-lg shadow-md flex flex-col"
            >
              <p className="text-lg font-semibold text-purple-600 mb-2">
                Guess a synonym for: <span className="font-bold">{word}</span>
              </p>
              <input
                type="text"
                className="p-2 text-lg rounded-lg border-b bg-transparent border-purple-300 focus:ring-2 outline-none"
                value={userAnswers[index]}
                onChange={(e) => handleInputChange(index, e.target.value)}
                disabled={showAnswers}
              />
              {showAnswers && (
                <p className="text-green-600 mt-2">
                  Correct synonym(s):{" "}
                  {data
                    .flatMap((lesson) => lesson.words)
                    .find((w) => w.word === word)
                    ?.syn.join(", ") || "None"}
                </p>
              )}
            </div>
          ))}
        </div>
        <div className="mt-6 flex flex-col items-center">
          <button
            className={`px-6 py-3 rounded-lg text-lg font-semibold ${
              showAnswers
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-purple-600 text-white hover:bg-purple-700"
            }`}
            onClick={handleSubmit}
            disabled={showAnswers}
          >
            {showAnswers ? "Submitted" : "Submit"}
          </button>
          {score !== null && (
            <div className="mt-4 text-xl text-green-600 font-semibold">
              Your score: {score} / {wordsToGuess.length}
            </div>
          )}
          {showAnswers && (
            <div className="flex gap-4 mt-6">
              <button
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                onClick={handleRestart}
              >
                Restart Quiz
              </button>
              <button
                className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                onClick={handleGoBack}
              >
                Go Back
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SynonymQuiz;
