import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Project } from './Models/project';
import { PROJECTS } from './Models/projects';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor() { }

  getProjects(): Project[] {
    return PROJECTS;
  }

  getProject(name: string): Observable<Project> {
    const project = PROJECTS.find(p => p.routingName == name)!;
    return of(project);
  }
}
