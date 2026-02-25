import mustache from "mustache";

mustache.escape = function(text) {return text;};

export class TemplateUtils {
  private context: string;

  constructor(context?: string) {
    this.context = context || "App";
  }
  render(template: string, view: any): string {
    return mustache.render(template, { ...view, context: this.context });
  }
}