import { Component, OnInit } from '@angular/core';
import { HskCard } from '../../models/flashcard.model';
import { FlashcardService } from '../../services/flashcard.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-flashcards-page',
  templateUrl: './flashcards-page.component.html',
  styleUrls: ['./flashcards-page.component.css']
})
export class FlashcardsPageComponent implements OnInit {
  currentCard: HskCard | null = null;
  isFlipped = false;
  dueCards: HskCard[] = [];
  allCards: HskCard[] = [];
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
    this.isFlipped = true;
  }

  onRate(quality: number): void {
    if (!this.currentCard) return;

    this.flashcardService.rateCard(this.currentCard, quality);
    this.cardIndex++;
    this.isFlipped = false;

    if (this.cardIndex >= this.dueCards.length) {
      this.isComplete = true;
      this.currentCard = null;
    } else {
      this.currentCard = this.dueCards[this.cardIndex];
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
}
