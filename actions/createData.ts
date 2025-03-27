"use client";

import { Test } from "@/common/types";
import { data } from "@/data";

export const generateQuizQuestions = (quizType: string) => {
  const checkedLessons: string[] = JSON.parse(
    sessionStorage.getItem("checkedLessons") || "[]"
  );

  const selectedLessons = data.filter((lesson) =>
    checkedLessons.includes(lesson.lessonName)
  );

  const quizQuestions: Test[] = [];

  const shuffleArray = <T>(arr: T[]): T[] =>
    arr.sort(() => Math.random() - 0.5);

  selectedLessons.forEach((lesson) => {
    const { tests } = lesson;

    if (quizType === "matching" && tests?.matching) {
      quizQuestions.push(...tests.matching);
    } else if (quizType === "questions" && tests?.questions) {
      quizQuestions.push(...tests.questions);
    }
  });

  return shuffleArray(quizQuestions).slice(0, 10);
};
