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
  reviewSt: number;
}

export interface PreNoteData {
  answerOne: string;
  answerTwo: string;
  questionList: string[];
  reviewSt: number;
  finishSt?: boolean;
}
