import { copyFileSync, existsSync } from "fs";
import { Extension } from "../../extension";
import { Recipe } from "../../recipe";
import { initGitRepository, precommitInstall, checkBlackInstalled } from "../../tools/checker";
export class PreCommit extends Extension {

    recipe: Recipe;
    project_path: string;

    constructor(recipe: Recipe, project_path: string) {
        super("Precommit", "Sets up github precommits for your project", false);
        this.recipe = recipe;
        this.project_path = project_path;
    }

    async execute(): Promise<void> {
        if (!existsSync(`${this.project_path}/.git`)) {
            console.log("Git is not initilized, doing it now.");
            initGitRepository();
        } else {
            console.log("Git is already initilized, continuing");
        }
        if (!existsSync(`${this.project_path}/.pre-commit-config.yaml`)) {
            console.log("Pre commit config file doesn't exists, copying it over")
            copyFileSync("./templates/python/.pre-commit-config.yaml.template", `${this.project_path}/.pre-commit-config.yaml`)
        } else {
            console.log("Pre commit config file already exists, continuting")
        }
        await precommitInstall();
        super.execute();
    }
}