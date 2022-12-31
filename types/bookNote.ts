import { UseFormRegister, UseFormSetFocus } from "react-hook-form";

const bookNotePathKey = {
  pre: "pre",
  peri: "peri",
} as const;

export type BookNotePathKey = typeof bookNotePathKey[keyof typeof bookNotePathKey];

export interface PeriNoteTreeNode {
  id: string;
  type: "Root" | "question" | "answer" | "deleted";
  content: string;
  children: PeriNoteTreeNode[];
}

// interface AnswerThree {
//   answerThree: PeriNoteTreeNode;
//   reviewSt: number;
// }

export interface PeriNoteData {
  answerThree: PeriNoteTreeNode;
  reviewSt: 2 | 3 | 4;
}

export interface PreNoteData {
  answerOne: string;
  answerTwo: string;
  questionList: string[];
  reviewSt: 2 | 3 | 4;
  finishSt?: boolean;
}

export interface BookDetailData {
  author: string[];
  publicationDt: string;
  thumbnail: string;
  title: string;
  translator: string[];
}

export interface StepUpContent {
  id: number;
  lifeQuote: string;
  public: string;
  header: string;
  desc: string;
  imgUrl: string;
  imgAlt: string;
}

// react-hook-form의 useForm type (string of path)
export interface UseForm {
  [key: string]: string;
}

export interface FormController {
  register: UseFormRegister<UseForm>;
  setFocus: UseFormSetFocus<UseForm>;
}

export interface ReviewData {
  bookTitle: string;
  answerOne: string;
  answerTwo: string;
  questionList: string[];
  answerThree: PeriNoteTreeNode;
}
