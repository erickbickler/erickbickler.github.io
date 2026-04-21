import { Injectable } from '@angular/core';
import { CardState } from '../models/flashcard.model';

@Injectable({
  providedIn: 'root'
})
export class Sm2Service {

  constructor() { }

  createInitialState(): CardState {
    return {
      repetitions: 0,
      interval: 1,
      ef: 2.5,
      nextReview: 0
    };
  }

  calculate(state: CardState, quality: number): CardState {
    const ef = Math.max(1.3, state.ef + 0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));

    if (quality >= 3) {
      let interval: number;
      if (state.repetitions === 0) {
        interval = 1;
      } else if (state.repetitions === 1) {
        interval = 6;
      } else {
        interval = Math.round(state.interval * ef);
      }

      return {
        repetitions: state.repetitions + 1,
        interval,
        ef,
        nextReview: Date.now() + interval * 86400000
      };
    } else {
      return {
        repetitions: 0,
        interval: 1,
        ef,
        nextReview: Date.now() + 86400000
      };
    }
  }
}
