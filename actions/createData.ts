"use client";

import { Question } from "@/common/types";
import { data } from "@/data";

export const generateQuizQuestions = (quizType: string): Question[] => {
  const checkedLessons: string[] = JSON.parse(
    sessionStorage.getItem("checkedLessons") || "[]"
  );

  const selectedLessons = data.filter((lesson) =>
    checkedLessons.includes(lesson.lessonName)
  );

  const quizQuestions: Question[] = [];

  const shuffleArray = <T>(arr: T[]): T[] =>
    arr.sort(() => Math.random() - 0.5);

  selectedLessons.forEach((lesson) => {
    const { tests } = lesson;

    if (quizType === "matching" && tests.matching) {
      quizQuestions.push(
        ...tests.matching.map((match) => ({ questionText: match }))
      );
    } else if (quizType === "questions" && tests.questions) {
      quizQuestions.push(
        ...tests.questions.map((question) => ({ questionText: question }))
      );
    }
  });

  return shuffleArray(quizQuestions).slice(0, 10);
};
