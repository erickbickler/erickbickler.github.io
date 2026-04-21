import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HskCard, CardState } from '../models/flashcard.model';
import { Sm2Service } from './sm2.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class FlashcardService {

  constructor(
    private http: HttpClient,
    private sm2: Sm2Service,
    private storage: StorageService
  ) { }

  loadCards(levels: boolean[]): Observable<HskCard[]> {
    const requests: Observable<HskCard[]>[] = [];

    if (levels[0]) {
      requests.push(this.http.get<HskCard[]>('assets/data/hsk1.json'));
    }
    if (levels[1]) {
      requests.push(this.http.get<HskCard[]>('assets/data/hsk2.json'));
    }
    if (levels[2]) {
      requests.push(this.http.get<HskCard[]>('assets/data/hsk3.json'));
    }

    if (requests.length === 0) {
      return of([]);
    }

    return forkJoin(requests).pipe(
      map(results => results.reduce((acc, arr) => acc.concat(arr), []))
    );
  }

  getDueCards(cards: HskCard[]): HskCard[] {
    const states = this.storage.getCardStates();
    const now = Date.now();

    return cards.filter(card => {
      const state = states[card.id];
      if (!state) {
        return true;
      }
      return state.nextReview <= now;
    });
  }

  rateCard(card: HskCard, quality: number): void {
    const states = this.storage.getCardStates();
    let state = states[card.id];

    if (!state) {
      state = this.sm2.createInitialState();
    }

    const newState = this.sm2.calculate(state, quality);
    this.storage.saveCardState(card.id, newState);
  }
}
