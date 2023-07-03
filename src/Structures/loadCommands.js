import { readdirSync as read } from "fs";

export default async (client) => {
  read("./src/PrefixCommands/").forEach(async (dir) => {
    const commands = read(`./src/PrefixCommands/${dir}`);

    for (let file of commands) {
      const Query = (await import(`../PrefixCommands/${dir}/${file}`)).default;
      const Command = new Query(client);
      if (Command.name) {
        client.commands.set(Command.name, Command);
      } else {
        continue;
      }
      if (Command.aliases && Array.isArray(Command.aliases))
        Command.aliases.forEach((x) => client.aliases.set(x, Command.name));
    }
  });
};
