const bookNoteUrlPath = {
  default: "/book-note",
  peri: "/book-note/peri",
  detail: "/book-note/detail-book-note",
} as const;

export type BookNoteUrlPath = typeof bookNoteUrlPath[keyof typeof bookNoteUrlPath];

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
