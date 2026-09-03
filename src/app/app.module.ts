import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ProjectsPageComponent } from './pages/projects-page/projects-page.component';
import { ProjectCardComponent } from './components/project-card/project-card.component';
import { ToolComponent } from './components/tool/tool.component';
import { ProjectDetailsPageComponent } from './pages/project-details-page/project-details-page.component';
import { FlashcardsPageComponent } from './pages/flashcards-page/flashcards-page.component';
import { FlashcardComponent } from './components/flashcard/flashcard.component';
import { RatingButtonsComponent } from './components/rating-buttons/rating-buttons.component';
import { NorwegianWordsPageComponent } from './pages/norwegian-words-page/norwegian-words-page.component';
import { NorwegianFlashcardComponent } from './components/norwegian-flashcard/norwegian-flashcard.component';
import { OysterMapPageComponent } from './pages/oyster-map-page/oyster-map-page.component';

@NgModule({
  declarations: [
    AppComponent,
    ProjectsPageComponent,
    ProjectCardComponent,
    ToolComponent,
    ProjectDetailsPageComponent,
    FlashcardsPageComponent,
    FlashcardComponent,
    RatingButtonsComponent,
    NorwegianWordsPageComponent,
    NorwegianFlashcardComponent,
    OysterMapPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    MatCheckboxModule,
    HttpClientModule,
    CommonModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
