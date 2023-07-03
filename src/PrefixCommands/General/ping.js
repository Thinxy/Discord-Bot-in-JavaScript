import Command from "../../Structures/base/Command.js";

export default class PingClassCommand extends Command {
  constructor(client) {
    super(client, {
      name: "ping",
      description:
        "veja meu tempo de resposta e minha latência com a api do Discord.",
      aliases: ["pong"],
      usage: "{prefix}ping",
      owner: false,
    });
  }
  async run(message) {
    var msg = await message.reply(`ping?`).then((msg) => {
      msg.edit({
        content: `🏓 **Pong**! Minha latência está em \`${Math.round(
          this.client.ws.ping
        )}ms\`, respondi está mensagem em \`${
          Date.now() - message.createdTimestamp
        }ms\`!`,
      });
    });
  }
}
