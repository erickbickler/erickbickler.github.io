import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { NorwegianCard } from '../Models/norwegian.model';
import { CardState } from '../Models/flashcard.model';
import { Sm2Service } from './sm2.service';

@Injectable({
  providedIn: 'root'
})
export class NorwegianService {

  private readonly STATES_KEY = 'norwegian_card_states';
  private readonly LEVELS_COOKIE = 'norwegian_levels';
  private readonly AUTOPLAY_KEY = 'norwegian_autoplay';

  constructor(private http: HttpClient, private sm2: Sm2Service) {}

  loadCards(levels: boolean[]): Observable<NorwegianCard[]> {
    if (!levels.some(Boolean)) {
      return of([]);
    }

    return this.http.get<NorwegianCard[]>('assets/data/norwegian_words.json').pipe(
      map(cards => cards.filter(card => levels[card.level - 1]))
    );
  }

  getDueCards(cards: NorwegianCard[]): NorwegianCard[] {
    const states = this.getCardStates();
    const now = Date.now();
    return cards.filter(card => {
      const state = states[card.id];
      return !state || state.nextReview <= now;
    });
  }

  rateCard(card: NorwegianCard, quality: number): void {
    const states = this.getCardStates();
    const state = states[card.id] ?? this.sm2.createInitialState();
    states[card.id] = this.sm2.calculate(state, quality);
    localStorage.setItem(this.STATES_KEY, JSON.stringify(states));
  }

  getCardStates(): Record<string, CardState> {
    const stored = localStorage.getItem(this.STATES_KEY);
    return stored ? JSON.parse(stored) : {};
  }

  getEnabledLevels(): boolean[] {
    const cookie = this.getCookie(this.LEVELS_COOKIE);
    if (cookie) {
      const parts = cookie.split(',').map(s => s === '1');
      return parts.length === 3 ? parts : [true, false, false];
    }
    return [true, false, false];
  }

  saveEnabledLevels(levels: boolean[]): void {
    const value = levels.map(b => b ? '1' : '0').join(',');
    this.setCookie(this.LEVELS_COOKIE, value, 30);
  }

  getAutoPlay(): boolean {
    return localStorage.getItem(this.AUTOPLAY_KEY) === '1';
  }

  saveAutoPlay(value: boolean): void {
    localStorage.setItem(this.AUTOPLAY_KEY, value ? '1' : '0');
  }

  private getCookie(name: string): string | null {
    const nameEQ = name + '=';
    for (let cookie of document.cookie.split(';')) {
      cookie = cookie.trim();
      if (cookie.indexOf(nameEQ) === 0) {
        return decodeURIComponent(cookie.substring(nameEQ.length));
      }
    }
    return null;
  }

  private setCookie(name: string, value: string, days: number): void {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + date.toUTCString() + '; path=/';
  }
}
