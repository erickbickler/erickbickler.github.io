import { Tool } from './tool';

export class Project {
    title: string = "";
    subtitle: string = "";
    description: string = "";
    primaryImage: string = "";
    secondaryImages: string[] = [];
    tools: Tool[] = [];
    routingName: string = "";
}