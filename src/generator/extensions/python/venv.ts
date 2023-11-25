import { copyFileSync, existsSync } from "fs";
import { Extension } from "../../extension";
import {  } from "../../info";
import { checkPythonVersion, installVenv } from "../../tools/checker";
import { PythonError } from "../../tools/errors";

export class Venv extends Extension {

    project_path: string;
    venv_name: string;

    constructor( project_path: string, venv_name: string) {
        super("Venv", "Installs a virtual env on the project", false);
        this.project_path = project_path;
        this.venv_name = venv_name;
    }

    async execute(): Promise<void> {
        if (!(await checkPythonVersion()).pythonInstalled) {
             throw new PythonError("PYTHON_NOT_INSTALLED", "Please install python 3.8+ to continue", 0);
             return 
        } else {
            console.log("Python installed, continuing")
        }
        installVenv(this.venv_name, this.project_path);
        super.execute()
    }
}