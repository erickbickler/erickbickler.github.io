import { Component, OnInit } from '@angular/core';
import { NorwegianCard } from '../../Models/norwegian.model';
import { CardState } from '../../Models/flashcard.model';
import { NorwegianService } from '../../services/norwegian.service';
import { AudioService } from '../../services/audio.service';

@Component({
  selector: 'app-norwegian-words-page',
  templateUrl: './norwegian-words-page.component.html',
  styleUrls: ['./norwegian-words-page.component.css']
})
export class NorwegianWordsPageComponent implements OnInit {
  currentCard: NorwegianCard | null = null;
  isFlipped = false;
  skipCardAnimation = false;
  dueCards: NorwegianCard[] = [];
  allCards: NorwegianCard[] = [];
  enabledLevels: boolean[] = [true, false, false];
  cardIndex = 0;
  isComplete = false;
  loading = true;
  autoPlay = false;

  constructor(
    private norwegianService: NorwegianService,
    private audio: AudioService
  ) {}

  ngOnInit(): void {
    this.enabledLevels = this.norwegianService.getEnabledLevels();
    this.autoPlay = this.norwegianService.getAutoPlay();
    this.loadCards();
  }

  onAutoPlayChange(): void {
    this.norwegianService.saveAutoPlay(this.autoPlay);
  }

  private speakCurrentCard(): void {
    if (this.autoPlay && this.currentCard) {
      this.audio.speak(this.currentCard.word, 'no-NO');
    }
  }

  loadCards(): void {
    this.loading = true;
    this.cardIndex = 0;
    this.isComplete = false;
    this.isFlipped = false;

    this.norwegianService.loadCards(this.enabledLevels).subscribe(cards => {
      this.allCards = cards;
      this.dueCards = this.norwegianService.getDueCards(cards);
      this.currentCard = this.dueCards.length > 0 ? this.dueCards[0] : null;
      this.loading = false;
      this.speakCurrentCard();
    });
  }

  onFlip(): void {
    this.isFlipped = !this.isFlipped;
  }

  onRate(quality: number): void {
    if (!this.currentCard) return;

    this.norwegianService.rateCard(this.currentCard, quality);
    this.cardIndex++;
    this.isFlipped = false;
    this.skipCardAnimation = true;

    if (this.cardIndex >= this.dueCards.length) {
      this.isComplete = true;
      this.currentCard = null;
    } else {
      this.currentCard = this.dueCards[this.cardIndex];
      setTimeout(() => { this.skipCardAnimation = false; }, 50);
      this.speakCurrentCard();
    }
  }

  onLevelChange(): void {
    this.norwegianService.saveEnabledLevels(this.enabledLevels);
    this.loadCards();
  }

  get deckStats(): string {
    if (this.loading) return 'Loading...';
    if (this.dueCards.length === 0) return 'No cards due';
    const remaining = this.dueCards.length - this.cardIndex;
    return `${remaining} card${remaining !== 1 ? 's' : ''} remaining`;
  }

  get masteredCount(): number {
    return this.countByCategory('mastered');
  }

  get learningCount(): number {
    return this.countByCategory('learning');
  }

  get newCount(): number {
    return this.countByCategory('new');
  }

  private countByCategory(category: 'mastered' | 'learning' | 'new'): number {
    const states = this.norwegianService.getCardStates();
    return this.allCards.filter(card => this.getCategoryForCard(states[card.id]) === category).length;
  }

  private getCategoryForCard(state?: CardState): 'mastered' | 'learning' | 'new' {
    if (!state) return 'new';
    if (state.repetitions >= 3 && state.interval >= 7) return 'mastered';
    if (state.repetitions >= 1) return 'learning';
    return 'new';
  }
}
