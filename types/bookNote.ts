import { UseFormRegister, UseFormSetFocus } from "react-hook-form";

const bookNotePathKey = {
  pre: "pre",
  peri: "peri",
} as const;

export type BookNotePathKey = typeof bookNotePathKey[keyof typeof bookNotePathKey];

export interface PeriNoteTreeNode {
  type: string;
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

type StaticImageData = {
  src: string;
  height: number;
  width: number;
  placeholder?: string;
};

export interface StepUpContent {
  id: number;
  lifeQuote: string;
  public: string;
  header: string;
  desc: string;
  imgUrl: StaticImageData;
  imgAlt: string;
}

export interface SavingProgress {
  isPending: boolean;
  isError: boolean;
}

export interface FormController {
  register: UseFormRegister<FormData>;
  setFocus: UseFormSetFocus<FormData>;
}
