import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { TocflCard } from '../../Models/flashcard.model';
import { AudioService } from '../../services/audio.service';

@Component({
    selector: 'app-flashcard',
    templateUrl: './flashcard.component.html',
    styleUrls: ['./flashcard.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class FlashcardComponent {
  @Input() card: TocflCard | null = null;
  @Input() flipped = false;
  @Input() skipAnimation = false;
  @Output() flipCard = new EventEmitter<void>();

  constructor(private audio: AudioService) {}

  onCardClick(): void {
    this.flipCard.emit();
  }

  onPlayAudio(event: MouseEvent): void {
    event.stopPropagation();
    if (this.card) {
      this.audio.speak(this.card.character);
    }
  }
}
