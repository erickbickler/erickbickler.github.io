import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ProjectService } from 'src/app/project.service';
import { HttpService } from '../../http.service';
import { Project } from '../../Models/project';

@Component({
    selector: 'app-projects-page',
    templateUrl: './projects-page.component.html',
    styleUrls: ['./projects-page.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class ProjectsPageComponent implements OnInit {
  
  constructor(private httpService: HttpService, private projectService: ProjectService) { }
  
  ngOnInit(): void {
    this.fetchData();
  }

  projectList: Project[] = [];
  mobileTab: 'projects' | 'bio' = 'projects';

  async fetchData() {
    this.projectList = this.projectService.getProjects();
  }

}
