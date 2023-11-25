import { StringTemplate } from "./tools/template";
import { readFileSync } from "fs";

export class Ingredient {
    directory: boolean;
    path: string;
    data: { [key: string]: string };
    constructor(directory: boolean, path: string, data: { [key: string]: string }) {
        this.directory = directory;
        this.path = path;
        this.data = data;
    }

    subsitute(): void {
        if (!this.directory) {
            try {
                const file = readFileSync(`${this.path}`, 'utf-8');
                const template = new StringTemplate(file, "$");
                template.init(this.data);
                template.substitute();
            } catch (error) {
                console.log(`There was an error: ${error}`);
            }
        } else {
            console.log("Ingredient is directory, skipping subsitution");
        }
    }
}