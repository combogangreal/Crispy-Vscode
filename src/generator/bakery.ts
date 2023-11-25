import { Ingredient } from "./ingredient";
import { Recipe } from "./recipe";
import { mkdir } from "fs";
import { Extension } from "./extension";
import { RecipeType } from "./types";
import { PythonPackage } from "./types/python/package";

export class Bakery {
    name: string;
    description: string;
    author: string;
    email: string;
    destenation: string;
    type: RecipeType;
    extentions: Array<Extension>;

    constructor(name: string, description: string, author: string, email: string, dest: string, type: RecipeType, extentions: Array<Extension>) {
        this.name = name;
        this.description = description;
        this.author = author;
        this.email = email;
        this.destenation = dest;
        this.extentions = extentions;
        this.type = type;
    }   

    async bake(): Promise<void> {
        if (this.type instanceof PythonPackage) {
            await this.type.create_dirs()
        }
    }
  
}