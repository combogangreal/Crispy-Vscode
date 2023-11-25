import { copyFileSync, existsSync } from "fs";
import { Extension } from "../../extension";
import { executeTox } from "../../tools/checker";

export class Tox extends Extension {

    project_path: string;

    constructor( project_path: string) {
        super("Tox", "Sets up tox for the project", false);
        this.project_path = project_path;
    }

    async execute(): Promise<void> {
        if (!existsSync(`${this.project_path}/tox.ini`)) {
            console.log("Tox configuration file no present, copying over")
            copyFileSync("./templates/python/tox.ini.template", `${this.project_path}/tox.ini`)
        } else {
            console.log("Tox configuration file present, skipping")
        }
        await executeTox();
        super.execute()
    }
}