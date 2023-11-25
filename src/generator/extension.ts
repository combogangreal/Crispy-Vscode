export class Extension {
    name: string;
    description: string;
    optional: boolean;
    constructor(name: string, description: string, optional: boolean) {
        this.name = name;
        this.description = description;
        this.optional = optional;
    }

    async execute(): Promise<void>{}
}