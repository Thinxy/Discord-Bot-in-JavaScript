export default class Command {
  constructor(client, options) {
    this.client = client;
    this.name = options.name;
    this.description = options.description || "none";
    this.options = options.options;
    this.usage = options.usage || "nada especifícado.";
    this.owner = options.owner || false;
  }
}
