import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TopNavbarComponent } from './top-navbar/top-navbar.component';
import { ProjectsPageComponent } from './projects-page/projects-page.component';
import { ProjectCardComponent } from './project-card/project-card.component';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { AboutPageComponent } from './about-page/about-page.component';
import { ToolComponent } from './tool/tool.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TopNavbarComponent,
    ProjectsPageComponent,
    ProjectCardComponent,
    AboutPageComponent,
    ToolComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
