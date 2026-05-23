export interface NorwegianCard {
  id: string;
  word: string;
  article: 'en' | 'et' | null;
  english: string;
  level: 1 | 2 | 3;
}
