export interface Question {
  questionText: {
    question: string;
    options: string[]; // Array of possible answers
    answer: string; // The correct answer
  };
}

export interface Test {
  matching?: string[];
  questions?: string[];
}

export interface Lesson {
  lessonName: string;
  tests: Test;
}
