import { Project } from "./project";
import { Tool } from "./tool";

const TOOLS: Tool[] = [
    {
        "name": "Angular",
        "imagePath": "./assets/images/tools/angular.svg"
    },
    {
        "name": "Firebase",
        "imagePath": "./assets/images/tools/Firebase_Logo_Logomark.svg"
    },
    {
      "name": "Django",
      "imagePath": "./assets/images/tools/django-logo-negative.svg"
    }
]

export const PROJECTS: Project[] = [
    {
        title: "Advanced Software Development Class Project",
        subtitle: "The Saucy Hedgehog",
        description: "Class project for Advanced Software Development. A website built for a restaurant named The Spicy Hedgehog. Built with a menu, location list, and daily specials that are automatically generated and refresh daily",
        primaryImage: "./assets/images/projects/saucy_hedgehog/saucy_hedgehog_homepage.PNG",
        secondaryImages: [
          "./assets/images/projects/saucy_hedgehog/saucy_hedgehog_locations.PNG",
          "./assets/images/projects/saucy_hedgehog/saucy_hedgehog_menu.PNG",
          "./assets/images/projects/saucy_hedgehog/saucy_hedgehog_menu_items.PNG",
        ],
        tools: [
          TOOLS.find(tool => tool.name == "Angular")!,
          TOOLS.find(tool => tool.name == "Firebase")!,
          TOOLS.find(tool => tool.name == "Django")!
        ],
        routingName: "saucy_hedgehog"
      }
]