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
    },
    {
      name: "Python",
      imagePath: "./assets/images/tools/Python-Emblem.jpg"
    },
    {
      name: "Godot",
      imagePath: "./assets/images/tools/godot_icon.svg"
    }
]

export const PROJECTS: Project[] = [
    {
      title: "Washington Oyster Beach Map",
      subtitle: "Live shellfish harvest status map",
      description: "Interactive map of 500+ Washington public shellfish beaches showing live harvest status from the WA Dept. of Health. Color-coded pins indicate open, conditional, closed, or unclassified beaches. Each popup shows closure reasons, species, a WDFW link, and the next 3 low tides fetched in real time from the NOAA API.",
      primaryImage: "./assets/images/projects/oyster-map/preview.png",
      secondaryImages: [],
      tools: [
        TOOLS.find(tool => tool.name == "Angular")!
      ],
      routingName: "oyster-map",
      route: "/oyster-map"
    },
    {
      title: "Norwegian Flashcards",
      subtitle: "Spaced-repetition vocabulary trainer",
      description: "A flashcard app for learning Norwegian vocabulary with multiple curated decks covering everyday words, travel, signs, and more. Supports both Norwegian-to-English and English-to-Norwegian modes with keyboard navigation and progress tracking.",
      primaryImage: "./assets/images/projects/norwegian-flashcards/preview.png",
      secondaryImages: [],
      tools: [
        TOOLS.find(tool => tool.name == "Angular")!
      ],
      routingName: "norwegian",
      route: "/norwegian"
    },
    {
      title: "Chinese Flashcards",
      subtitle: "TOCFL vocabulary trainer",
      description: "A flashcard app for learning Mandarin Chinese vocabulary aligned to the TOCFL (Test of Chinese as a Foreign Language) framework. Covers Novice and Level 1 word lists with spaced-repetition progress tracking and text-to-speech pronunciation.",
      primaryImage: "./assets/images/projects/chinese-flashcards/preview.png",
      secondaryImages: [],
      tools: [
        TOOLS.find(tool => tool.name == "Angular")!
      ],
      routingName: "flashcards",
      route: "/flashcards"
    },
    {
      title: "Byte-le Royale 2022",
      subtitle: "AI Programming Competition",
      description: "Developed a game for Byte-le Royale 2022, a yearly competition held at NDSU by the local ACM chapter. Lead development with a team of 7 people on a year long project that culminated in a day of great competition for the students who competed.",
      primaryImage: "./assets/images/projects/byte-le_royale/byte-le_logo.png",
      secondaryImages: [
        "./assets/images/projects/byte-le_royale/game_run.png"
      ],
      tools: [
        TOOLS.find(tool => tool.name == "Python")!,
        TOOLS.find(tool => tool.name == "Godot")!
      ],
      routingName: "byte-le_royale"
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
    },
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
    }
]