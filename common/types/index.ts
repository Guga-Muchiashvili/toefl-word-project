export interface Question {
  questionText: {
    question: string;
    options: string[];
    answer: string;
  };
}

export type Word = {
  word: string;
  adj?: string;
  adv?: string;
  n?: string | string[];
  v?: string;
  syn: string[];
  examples: string[];
};

export type Test = {
  question: string;
  options: string[];
  answer: string;
};

export type Lesson = {
  lessonName: string;
  words: Word[];
  tests?: {
    matching?: Test[];
    questions?: Test[];
  };
};
