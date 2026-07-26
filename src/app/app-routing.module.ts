import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutPageComponent } from './pages/about-page/about-page.component';
import { ProjectDetailsPageComponent } from './pages/project-details-page/project-details-page.component';

import { ProjectsPageComponent } from './pages/projects-page/projects-page.component';
import { FlashcardsPageComponent } from './pages/flashcards-page/flashcards-page.component';
import { NorwegianWordsPageComponent } from './pages/norwegian-words-page/norwegian-words-page.component';
import { OysterMapPageComponent } from './pages/oyster-map-page/oyster-map-page.component';

const routes: Routes = [
  { path: 'projects', component: ProjectsPageComponent },
  { path: 'projects/:name', component: ProjectDetailsPageComponent},
  { path: 'about', component: AboutPageComponent},
  { path: 'flashcards', component: FlashcardsPageComponent },
  { path: 'norwegian', component: NorwegianWordsPageComponent },
  { path: 'oyster-map', component: OysterMapPageComponent },
  { path: '', redirectTo: '/projects', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { anchorScrolling: 'enabled', })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
