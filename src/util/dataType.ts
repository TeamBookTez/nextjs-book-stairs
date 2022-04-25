// api
export interface KAKAOParams {
  query: string;
  sort: string;
  size: number;
}

// 북노트
export interface PostBody {
  email?: string;
  password?: string;
  nickname?: string;
  isbn?: string;
  thumbnail?: string;
  title?: string;
  author?: string[];
  answerOne?: string;
  answerTwo?: string;
  questionList?: string[];
  reviewSt?: string;
}

export interface PatchBody {
  answerOne?: string;
  answerTwo?: string;
  answerThree?: AnswerThree;
  reviewSt?: number;
}

export interface PeriNoteTreeNode {
  type: string;
  content: string;
  children: PeriNoteTreeNode[];
}

interface AnswerThree {
  answerThree: PeriNoteTreeNode;
  reviewSt: number;
}

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

// 서재
export interface NavigatingBookInfoState {
  reviewId: string;
  title: string;
  fromUrl: string;
  fromSt: number;
}

export interface BookcaseInfo {
  author: string[];
  reviewId: string;
  reviewSt?: number;
  thumbnail: string;
  title: string;
}
