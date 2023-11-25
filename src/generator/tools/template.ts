export class StringTemplate {
    private template: string;
    private delimiter: string;
    private placeholders: Map<string, string>;
  
    constructor(templateString: string, delimiter: string = "%") {
      this.template = templateString;
      this.delimiter = delimiter;
      this.placeholders = new Map();
    }
  
    init(placeholders: { [key: string]: string }): void {
      for (const [key, value] of Object.entries(placeholders)) {
        this.placeholders.set(key, value);
      }
    }
  
    substitute(): string {
      if (this.placeholders.size === 0) {
        throw new Error("No placeholders provided for substitution");
      }
  
      return this.renderTemplate();
    }
  
    safe_substitute(placeholders: { [key: string]: string | undefined }): string {
      for (const [key, value] of Object.entries(placeholders)) {
        if (value !== undefined) {
          this.placeholders.set(key, value);
        }
      }
  
      return this.renderTemplate();
    }
  
    private renderTemplate(): string {
      let renderedTemplate = this.template;
  
      for (const [placeholder, value] of this.placeholders) {
        renderedTemplate = renderedTemplate.replace(new RegExp(`${this.delimiter}(\\w+)`, "g"), (match, key) => {
          if (key === placeholder) {
            return value;
          }
          else {
            return match[0];
          }
        });
      }
  
      return renderedTemplate;
    }
  }
  