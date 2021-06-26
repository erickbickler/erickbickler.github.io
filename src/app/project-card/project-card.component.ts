import { Component, Input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Project } from '../Models/project';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.css']
})
export class ProjectCardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  
  @Input() project: Project = new Project();
  
  goToDetails() {
    
  }
}
