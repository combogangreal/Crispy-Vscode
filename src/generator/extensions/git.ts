import { Extension } from "../extension";
import { window } from "vscode";
import { initGitRepository } from "../tools/checker";
import { GitError } from "../tools/errors";

export class Git extends Extension {
    constructor() {
        super("Git", "Inits a github repository", false);
    }

    async execute(): Promise<void> {
        try {
            await initGitRepository();
        } catch (err) {
            throw new GitError("GIT_UNINSTALLED", "Git is not installed, please reinstall and come back", err)
        }
        super.execute()
    }
}