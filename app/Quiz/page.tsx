"use client";

import MakeQuiz from "@/components/MakeQuiz/MakeQuiz";

export default function QuizPage() {
  return (
    <div>
      <h1>Quiz Page</h1>
      <MakeQuiz quizType="questions" />
    </div>
  );
}
