import { Tool } from './tool';

export class Project {
    title:string = "";
    description: string = "";
    primaryImage: string = "";
    secondaryImages: string[] = [];
    tools: Tool[] = [];
}