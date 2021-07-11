import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Project } from './Models/project';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  projectList: Project[] = [
    {
      title: "Advanced Software Development Project",
      subtitle: "The Saucy Hedgehog",
      description: "Class project for Advanced Software Development. A website built for a restaurant named The Spicy Hedgehog",
      primaryImage: "./assets/images/projects/saucy_hedgehog/saucy_hedgehog_homepage.PNG",
      secondaryImages: [
        "./assets/images/projects/saucy_hedgehog/saucy_hedgehog_locations.PNG",
        "./assets/images/projects/saucy_hedgehog/saucy_hedgehog_menu.PNG",
        "./assets/images/projects/saucy_hedgehog/saucy_hedgehog_menu_item.PNG",
      ],
      tools: [],
      routingName: "saucy_hedgehog"
    }
  ]

  baseUrl = "https://portfoliowebsite-79fde-default-rtdb.firebaseio.com/"

  async get(requestUrl: string): Promise<Object[]> {
    return this.http.get<Object[]>(this.baseUrl + requestUrl).toPromise();
  }
}
