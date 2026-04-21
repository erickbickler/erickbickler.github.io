import { Injectable } from '@angular/core';
import { CardState } from '../Models/flashcard.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  getCardStates(): Record<string, CardState> {
    const stored = localStorage.getItem('tocfl_card_states');
    return stored ? JSON.parse(stored) : {};
  }

  saveCardState(id: string, state: CardState): void {
    const states = this.getCardStates();
    states[id] = state;
    localStorage.setItem('tocfl_card_states', JSON.stringify(states));
  }

  getEnabledLevels(): boolean[] {
    const cookie = this.getCookie('tocfl_levels');
    if (cookie) {
      const parts = cookie.split(',').map(s => s === '1');
      return parts.length === 3 ? parts : [true, false, false];
    }
    return [true, false, false];
  }

  saveEnabledLevels(levels: boolean[]): void {
    const cookieValue = levels.map(b => b ? '1' : '0').join(',');
    this.setCookie('tocfl_levels', cookieValue, 30);
  }

  getAutoPlay(): boolean {
    return localStorage.getItem('tocfl_autoplay') === '1';
  }

  saveAutoPlay(value: boolean): void {
    localStorage.setItem('tocfl_autoplay', value ? '1' : '0');
  }

  private getCookie(name: string): string | null {
    const nameEQ = name + '=';
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
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
    const expires = 'expires=' + date.toUTCString();
    document.cookie = name + '=' + encodeURIComponent(value) + '; ' + expires + '; path=/';
  }
}
