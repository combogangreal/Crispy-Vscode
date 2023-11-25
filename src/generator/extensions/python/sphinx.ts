import { copyFileSync, existsSync, mkdir, mkdirSync } from "fs";
import { Extension } from "../../extension";
import { buildSphinxDocs } from "../../tools/checker";

export class Sphinx extends Extension {

    project_path: string;
    venv_name: string;

    constructor( project_path: string, venv_name: string) {
        super("Sphinx", "Adds sphinx docs to your project", false);
        this.project_path = project_path;
        this.venv_name = venv_name;
    }

    async execute(): Promise<void> {
        if (!existsSync(`${this.project_path}/docs`)) {
            console.log("Creating docs folder, and copying all sphinx code.")
            mkdirSync(`${this.project_path}/docs`);
            mkdirSync(`${this.project_path}/docs/build'`)
            mkdirSync(`${this.project_path}/docs/static'`)
            mkdirSync(`${this.project_path}/docs/templates'`)
            copyFileSync("./templates/python/package/docs/conf.py.template", `${this.project_path}/docs/conf.py`)
            copyFileSync("./templates/python/package/docs/index.rst.template", `${this.project_path}/docs/index.rst`)
            copyFileSync("./templates/python/package/docs/make.bat.template", `${this.project_path}/docs/make.bat`)
            copyFileSync("./templates/python/package/docs/Makefile.template", `${this.project_path}/docs/Makefile`)
        } else {
            console.log("Sphinx files exist, building docs")
        }
        buildSphinxDocs(this.project_path);
        super.execute()
    }
}