import { RecipeType } from "./types";
import { Extension } from "./extension";

export class Recipe {
    name: string;
    description: string;
    same_directory: boolean;
    dest: string;
    type: RecipeType;
    extensions: Array<Extension>;
    project_dir: string;

    constructor(name: string, description: string, type: RecipeType, same_directory: boolean, dest: string, extensions: Array<Extension>, project_dir: string) {
        this.name = name;
        this.description = description;
        this.same_directory = same_directory;
        this.dest = dest;
        this.type = type;
        this.extensions = extensions;
        this.project_dir = project_dir;
    } 
}