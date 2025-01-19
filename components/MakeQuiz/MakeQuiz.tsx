"use client";

import { generateQuizQuestions } from "@/actions/createData";
import { Question } from "@/common/types";
import React, { useState, useEffect } from "react";

interface MakeQuizProps {
  quizType: string;
}

const MakeQuiz: React.FC<MakeQuizProps> = ({ quizType }) => {
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);

  useEffect(() => {
    const createQuiz = () => {
      const questions = generateQuizQuestions(quizType);
      setQuizQuestions(questions);
    };

    createQuiz();
  }, [quizType]);

  return (
    <div>
      <h1>Quiz Questions</h1>
      {quizQuestions.length === 0 ? (
        <p>No questions available. Please select lessons.</p>
      ) : (
        <ul>
          {quizQuestions.map((question, index) => (
            <li key={index}>{JSON.stringify(question)}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MakeQuiz;
