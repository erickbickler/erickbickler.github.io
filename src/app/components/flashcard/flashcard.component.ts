import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TocflCard } from '../../Models/flashcard.model';

@Component({
  selector: 'app-flashcard',
  templateUrl: './flashcard.component.html',
  styleUrls: ['./flashcard.component.css']
})
export class FlashcardComponent {
  @Input() card: TocflCard | null = null;
  @Input() flipped = false;
  @Input() skipAnimation = false;
  @Output() flipCard = new EventEmitter<void>();

  onCardClick(): void {
    this.flipCard.emit();
  }
}
