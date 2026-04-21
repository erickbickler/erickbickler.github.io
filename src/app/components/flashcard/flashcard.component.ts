import { Component, Input, Output, EventEmitter } from '@angular/core';
import { HskCard } from '../../models/flashcard.model';

@Component({
  selector: 'app-flashcard',
  templateUrl: './flashcard.component.html',
  styleUrls: ['./flashcard.component.css']
})
export class FlashcardComponent {
  @Input() card: HskCard | null = null;
  @Input() flipped = false;
  @Output() flipCard = new EventEmitter<void>();

  onCardClick(): void {
    this.flipCard.emit();
  }
}
