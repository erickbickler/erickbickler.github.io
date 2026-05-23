import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PortfolioWebsite';

  constructor(private router: Router) {}

  get showNav(): boolean {
    return !this.router.url.startsWith('/flashcards') &&
           !this.router.url.startsWith('/norwegian');
  }
}
