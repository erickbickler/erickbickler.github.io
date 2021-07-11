import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ProjectService } from 'src/app/project.service';
import { HttpService } from '../../http.service';
import { Project } from '../../Models/project';

@Component({
  selector: 'app-projects-page',
  templateUrl: './projects-page.component.html',
  styleUrls: ['./projects-page.component.css']
})
export class ProjectsPageComponent implements OnInit {
  
  constructor(private httpService: HttpService, private projectService: ProjectService) { }
  
  ngOnInit(): void {
    this.fetchData();
  }

  projectList: Project[] = [];
  
  async fetchData() {
    this.projectList = this.projectService.getProjects()
  }

}
