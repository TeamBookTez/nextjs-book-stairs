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
