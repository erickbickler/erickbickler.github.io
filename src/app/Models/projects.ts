import { Project } from "./project";
import { Tool } from "./tool";

const TOOLS: Tool[] = [
    {
        name: "Angular",
        imagePath: "./assets/images/tools/angular.svg"
    },
    {
        name: "Firebase",
        imagePath: "./assets/images/tools/Firebase_Logo_Logomark.svg"
    },
    {
      name: "Django",
      imagePath: "./assets/images/tools/django-logo-negative.svg"
    },
    {
      name: "MongoDB",
      imagePath: "./assets/images/tools/MongoDB_Logo.png"
    },
    {
      name: "Express.js",
      imagePath: "./assets/images/tools/Expressjs.png"
    },
    {
      name: "React",
      imagePath: "./assets/images/tools/React-icon.svg"
    },
    {
      name: "Node.js",
      imagePath: "./assets/images/tools/Node.js_logo.svg"
    },
    {
      name: "Heroku",
      imagePath: "./assets/images/tools/heroku-logo.svg"
    }
]

export const PROJECTS: Project[] = [
    {
      title: "Advanced Software Development Class Project",
      subtitle: "The Saucy Hedgehog",
      description: "Class project for Advanced Software Development. A website built for a fake restaurant named The Spicy Hedgehog. Built with a menu, location list, and daily specials that are automatically generated and refresh daily, complete with an admin page that enables easy editing and updating of pages as business changes require.",
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
    },
    {
      title: "Club Submission Tool",
      subtitle: "NDSU ACM Submission Portal",
      description: "Submission portal built for the NDSU chapter of the Association of Computing Machinery. Designed using Adobe XD. Built with full MERN stack, using a cloud MongoDB cluster and deployed with Heroku. Used by other students within the NDSU chapter of the ACM to communicate interests with the Executive Council of the club.",
      primaryImage: "./assets/images/projects/acm-submissions/home.PNG",
      secondaryImages: [
        "./assets/images/projects/acm-submissions/interest_form.PNG",
        "./assets/images/projects/acm-submissions/submitted.PNG"
      ],
      tools: [
        TOOLS.find(tool => tool.name == "MongoDB")!,
        TOOLS.find(tool => tool.name == "Express.js")!,
        TOOLS.find(tool => tool.name == "React")!,
        TOOLS.find(tool => tool.name == "Node.js")!,
        TOOLS.find(tool => tool.name == "Heroku")!
      ],
      routingName: "acm_submission_portal"
    }
]