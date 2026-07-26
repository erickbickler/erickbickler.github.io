import { Tool } from './tool';

export class Project {
    title: string = "";
    subtitle: string = "";
    description: string = "";
    primaryImage: string = "";
    secondaryImages: string[] = [];
    tools: Tool[] = [];
    routingName: string = "";
    // if set, the project card links here directly instead of /projects/:routingName
    route?: string;
}