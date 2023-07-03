import client from "../../../index.js";

client.on("messageCreate", async (message) => {
  let prefix = "c";

  if (message?.author?.bot || message?.channel?.type == "DM") return;
  if (
    [`<@${client.user.id}>`, `<@!${client.user.id}>`].includes(message.content)
  )
    return message.reply(`Olá ${message.author}! obrigado por me mencionar.`);
  if (!message?.content.toLowerCase().startsWith(prefix.toLowerCase())) return;

  let args = message?.content.slice(prefix.length).trim().split(/ +/g),
    cmd = args.shift().toLowerCase();
  if (cmd.length === 0) return;

  let command = client.commands.get(cmd);
  if (!command) command = client.commands.get(client.aliases.get(cmd));

  if (command) {
    try {
      command.run(message, args).catch((err) => {
        console.log(err);
        message.reply({
          content: `:x: ${message.author}, infelizmente ocorreu um erro ao executar o comando, por favor tire print desta mensagem e abra um ticket em meu servidor de suporte.\n\`\`\`\n${err.stack}\n\`\`\``,
        });
      });
    } catch (e) {
      console.log(e);
    }
  }
});
