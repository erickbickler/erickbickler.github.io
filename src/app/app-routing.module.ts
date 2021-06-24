import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutPageComponent } from './about-page/about-page.component';

import { ProjectsPageComponent } from './projects-page/projects-page.component';

const routes: Routes = [
  { path: 'projects', component: ProjectsPageComponent },
  { path: 'about', component: AboutPageComponent},
  { path: '', redirectTo: '/projects', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { anchorScrolling: 'enabled', })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
