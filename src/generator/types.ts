import { existsSync, mkdirSync } from "fs";
import { Ingredient } from "./ingredient";
import { Recipe } from "./recipe";


export class RecipeType {
    recipe: Recipe;
    name: string;
    description: string;
    ingredients: Array<Ingredient>;

    constructor(recipe: Recipe, name: string, description: string, ingredients: Array<Ingredient>) {
        this.recipe = recipe;
        this.name = name;
        this.description = description;
        this.ingredients = ingredients;
    }

    create_dirs(): void {
        if (this.recipe.same_directory) {
            if (existsSync(this.recipe.dest)) {
                console.log("Dest Folder, already exists, skipping");
            } else {
                mkdirSync(this.recipe.dest);
                console.log("Created dest directory");   
            }
            for (let index = 0; index < this.ingredients.length; index++) {
                if (this.ingredients[index].directory) {
                    mkdirSync(this.ingredients[index].path);
                }                
            }
        } else {
            if (existsSync(`${this.recipe.dest}/${this.name}`)) {
                console.log("Dest Folder, already exists, skipping");
            } else {
                mkdirSync(`${this.recipe.dest}/${this.name}`);
                console.log("Created dest directory");   
            }
            for (let index = 0; index < this.ingredients.length; index++) {
                if (this.ingredients[index].directory) {
                    mkdirSync(`${this.recipe.dest}/${this.name}/${this.ingredients[index].path}`);
                }                
            }
        }
    }

    create_files(): void  {
        if (this.recipe.same_directory) {
            if (!existsSync(this.recipe.dest)) {
                console.log("Destentation folder doesn't exist, creating it now");
                mkdirSync(this.recipe.dest);
            } else {
                console.log("Folder exists, continuting");
            }
            for (let index = 0; index < this.ingredients.length; index++) {
                if (!this.ingredients[index].directory) {
                    mkdirSync(`${this.recipe.dest}/${this.ingredients[index].path}`);
                }                
            }
        } else {
            if (!existsSync(`${this.recipe.dest}/${this.name}`)) {
                console.log("Destentation folder doesn't exist, creating it now");
                mkdirSync(`${this.recipe.dest}/${this.name}`);
            } else {
                console.log("Folder exists, continuting");
            }
            for (let index = 0; index < this.ingredients.length; index++) {
                if (!this.ingredients[index].directory) {
                    mkdirSync(`${this.recipe.dest}/${this.name}/${this.ingredients[index].path}`);
                }                
            }
        }
    }

    subsitute(): void {
        for (let index = 0; index < this.ingredients.length; index++) {
            this.ingredients[index].subsitute()
        }
    }


} 