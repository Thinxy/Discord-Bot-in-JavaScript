import { readdirSync as read } from "fs";
import { color } from "console-log-colors";

export default async (client) => {
  const Commands = [];
  read("./src/SlashCommands/").forEach(async (dir) => {
    const commands = read(`./src/SlashCommands/${dir}`);

    for (let file of commands) {
      const Query = (await import(`../SlashCommands/${dir}/${file}`)).default;
      const Command = new Query(client);
      if (Command.name) {
        Commands.push(Command);
        client.slashCommands.set(Command.name, Command);
      } else {
        continue;
      }
    }
  });

  client.on("ready", async () => {
    let guild = client.guilds.cache.get("1109243621502365751");

    //guild.commands.set(Commands); Isso apenas para setar o slash em um servidor específico;
    client.application.commands.set(Commands);
    console.log(
      color.red(`[SLASH COMMANDS] - Slash Commands carregado com sucesso!`)
    );
  });
};
