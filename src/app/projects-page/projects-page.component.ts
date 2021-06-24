import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { HttpService } from '../http.service';
import { Project } from '../Models/project';

@Component({
  selector: 'app-projects-page',
  templateUrl: './projects-page.component.html',
  styleUrls: ['./projects-page.component.css']
})
export class ProjectsPageComponent implements OnInit {

  projectList: Project[] = [];

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
    this.fetchData();
  }

  async fetchData() {
    this.projectList = await this.httpService.get("projects.json") as Project[];
  }

}
