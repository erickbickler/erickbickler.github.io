import { Component, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

interface RatingOption {
  quality: number;
  label: string;
  color: string;
}

@Component({
    selector: 'app-rating-buttons',
    templateUrl: './rating-buttons.component.html',
    styleUrls: ['./rating-buttons.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class RatingButtonsComponent {
  @Output() rate = new EventEmitter<number>();

  ratingOptions: RatingOption[] = [
    { quality: 0, label: 'Blackout', color: '#8b0000' },
    { quality: 1, label: 'Wrong', color: '#cc3300' },
    { quality: 2, label: 'Hard', color: '#cc8800' },
    { quality: 3, label: 'Good', color: '#2d7a2d' },
    { quality: 4, label: 'Easy', color: '#1a8a1a' },
    { quality: 5, label: 'Perfect', color: '#00aa00' }
  ];

  onRate(quality: number): void {
    this.rate.emit(quality);
  }
}
