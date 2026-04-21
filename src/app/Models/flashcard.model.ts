export interface HskCard {
  id: string;
  character: string;
  pinyin: string;
  english: string;
  level: 1 | 2 | 3;
}

export interface CardState {
  repetitions: number;
  interval: number;
  ef: number;
  nextReview: number;
}
