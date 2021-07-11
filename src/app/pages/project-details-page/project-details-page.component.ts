import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from 'src/app/Models/project';
import { ProjectService } from 'src/app/project.service';

@Component({
  selector: 'app-project-details-page',
  templateUrl: './project-details-page.component.html',
  styleUrls: ['./project-details-page.component.css']
})
export class ProjectDetailsPageComponent implements OnInit {

  constructor(private router: ActivatedRoute, private projectService: ProjectService) { }

  project: Project = new Project();

  ngOnInit(): void {
    this.getProject();
  }

  getProject(): void {
    const name = String(this.router.snapshot.paramMap.get('name'));
    this.projectService.getProject(name)
      .subscribe(project => this.project = project);
  }
}
