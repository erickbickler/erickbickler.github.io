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
      this.audio.speak(this.card.word, 'nb-NO');
    }
  }

  get wordSizeClass(): string {
    return this.sizeClassFor(this.card?.word, [12, 22, 32, 48]);
  }

  get englishSizeClass(): string {
    return this.sizeClassFor(this.card?.english, [18, 32, 48, 64]);
  }

  private sizeClassFor(text: string | undefined, thresholds: [number, number, number, number]): string {
    const len = text?.length ?? 0;
    if (len <= thresholds[0]) return 'size-xl';
    if (len <= thresholds[1]) return 'size-lg';
    if (len <= thresholds[2]) return 'size-md';
    if (len <= thresholds[3]) return 'size-sm';
    return 'size-xs';
  }
}
