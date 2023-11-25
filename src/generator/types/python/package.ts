import { defaultMaxListeners } from "events";
import { Ingredient } from "../../ingredient";
import { Recipe } from "../../recipe";
import { RecipeType } from "../../types";
import { getGitUsername } from "../../info";

export const ingreidentss = new Array<Ingredient>();

export class PythonPackage extends RecipeType {

    project_dir: string;

    constructor(recipe: Recipe, name: string, author: string, email: string, description: string, license: string) {
        super(recipe, "Python-Package", "A package template for python", ingreidentss)
        this.project_dir = recipe.project_dir;
        ingreidentss.push(new Ingredient(false, `${this.project_dir}/setup.cfg`, {
            "name":  name,
            "email": email,
            "author": author,
            "description": description,
        }))
        ingreidentss.push(new Ingredient(false, `${this.project_dir}/README.md`, {
            "name":  name,
            "description": description,
        }))
        ingreidentss.push(new Ingredient(false, `${this.project_dir}/CONTRIBUTING.md`, {
            "name":  name,
            "gitusername": getGitUsername().then.toString(),
        }))
        ingreidentss.push(new Ingredient(false, `${this.project_dir}/AUTHORS.md`, {
            "name":  name,
            "gitusername": getGitUsername().then.toString(),
            "author": author,
            "email": email
        }))
        ingreidentss.push(new Ingredient(true, `${this.project_dir}/src`, {}))
        ingreidentss.push(new Ingredient(true, `${this.project_dir}/src/${name}`, {}))
        ingreidentss.push(new Ingredient(true, `${this.project_dir}/docs`, {}))
        ingreidentss.push(new Ingredient(true, `${this.project_dir}/tests`, {}))
        ingreidentss.push(new Ingredient(false, `${this.project_dir}/src/${name}/skeleton.py`, {
            "author": author,
            "license": license
        }))
        ingreidentss.push(new Ingredient(false, `${this.project_dir}/src/${name}/__init__.py`, {
            "name": name,
            "description": description
        }))
        ingreidentss.push(new Ingredient(false, `${this.project_dir}/tests/test.py`, {
            "name": name,
            "license": license,
            "author": author
        }))
        ingreidentss.push(new Ingredient(false, `${this.project_dir}/docs/conf.py`, {
            "name": name,
            "author": author
        }))
        ingreidentss.push(new Ingredient(false, `${this.project_dir}/docs/index.rst`, {
            "name": name
        }))
    }
}