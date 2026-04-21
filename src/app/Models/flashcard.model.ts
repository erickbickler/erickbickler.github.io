export interface TocflCard {
  id: string;
  character: string;
  pinyin: string;
  english: string;
  level: 1 | 2 | 3;
}

export type HskCard = TocflCard;

export interface CardState {
  repetitions: number;
  interval: number;
  ef: number;
  nextReview: number;
}
