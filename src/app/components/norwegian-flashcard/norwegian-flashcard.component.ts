import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NorwegianCard } from '../../Models/norwegian.model';
import { AudioService } from '../../services/audio.service';

@Component({
  selector: 'app-norwegian-flashcard',
  templateUrl: './norwegian-flashcard.component.html',
  styleUrls: ['./norwegian-flashcard.component.css']
})
export class NorwegianFlashcardComponent {
  @Input() card: NorwegianCard | null = null;
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
      this.audio.speak(this.card.word, 'no-NO');
    }
  }
}
