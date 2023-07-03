// CLIENT IMPORTS;

import { Client, Collection, GatewayIntentBits } from "discord.js";

// LOAD'S;

import LoadCommands from "./loadCommands.js";
import LoadSlashCommands from "./loadSlashCommands.js";

// CONSTRUCTOR CLIENT;

class ExtendedClient extends Client {
  constructor() {
    super({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.MessageContent,
      ],
      sweepers: {
        messages: {
          interval: 60,
          lifetime: 600,
        },
      },
    });

    // CLIENT COLLECTIONS;

    this.commands = new Collection();
    this.slashCommands = new Collection();
    this.aliases = new Collection();

    // CLIENT;

    this.await = (ms) =>
      new Promise((resolve) =>
        setTimeout(() => {
          resolve();
        }, ms)
      );
  }

  // START SOURCE;

  async start() {
    LoadCommands(this);
    LoadSlashCommands(this);
    await import("../events/main.js");
    return await super.login(process.env.DISCORD_TOKEN);
  }
}

export default ExtendedClient;
