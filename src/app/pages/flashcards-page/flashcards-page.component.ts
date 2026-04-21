import { Component, OnInit } from '@angular/core';
import { TocflCard, CardState } from '../../models/flashcard.model';
import { FlashcardService } from '../../services/flashcard.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-flashcards-page',
  templateUrl: './flashcards-page.component.html',
  styleUrls: ['./flashcards-page.component.css']
})
export class FlashcardsPageComponent implements OnInit {
  currentCard: TocflCard | null = null;
  isFlipped = false;
  skipCardAnimation = false;
  dueCards: TocflCard[] = [];
  allCards: TocflCard[] = [];
  enabledLevels: boolean[] = [true, false, false];
  cardIndex = 0;
  isComplete = false;
  loading = true;

  constructor(
    private flashcardService: FlashcardService,
    private storage: StorageService
  ) { }

  ngOnInit(): void {
    this.enabledLevels = this.storage.getEnabledLevels();
    this.loadCards();
  }

  loadCards(): void {
    this.loading = true;
    this.cardIndex = 0;
    this.isComplete = false;
    this.isFlipped = false;

    this.flashcardService.loadCards(this.enabledLevels).subscribe(cards => {
      this.allCards = cards;
      this.dueCards = this.flashcardService.getDueCards(cards);

      if (this.dueCards.length > 0) {
        this.currentCard = this.dueCards[0];
      } else {
        this.currentCard = null;
      }

      this.loading = false;
    });
  }

  onFlip(): void {
    this.isFlipped = !this.isFlipped;
  }

  onRate(quality: number): void {
    if (!this.currentCard) return;

    this.flashcardService.rateCard(this.currentCard, quality);
    this.cardIndex++;
    this.isFlipped = false;
    this.skipCardAnimation = true;

    if (this.cardIndex >= this.dueCards.length) {
      this.isComplete = true;
      this.currentCard = null;
    } else {
      this.currentCard = this.dueCards[this.cardIndex];
      setTimeout(() => {
        this.skipCardAnimation = false;
      }, 50);
    }
  }

  onLevelChange(): void {
    this.storage.saveEnabledLevels(this.enabledLevels);
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
    const states = this.storage.getCardStates();
    return this.allCards.filter(card => this.getCategoryForCard(card, states[card.id]) === category).length;
  }

  private getCategoryForCard(card: TocflCard, state?: CardState): 'mastered' | 'learning' | 'new' {
    if (!state) {
      return 'new';
    }

    // Mastered: 3+ repetitions and interval >= 7 days (learned well)
    if (state.repetitions >= 3 && state.interval >= 7) {
      return 'mastered';
    }

    // Learning: 1-2 repetitions (actively studying)
    if (state.repetitions >= 1 && state.repetitions < 3) {
      return 'learning';
    }

    // New: 0 repetitions
    return 'new';
  }
}
