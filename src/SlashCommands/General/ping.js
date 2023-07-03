import { ApplicationCommandType } from "discord.js";
import SlashCommand from "../../Structures/base/SlashCommand.js";

export default class PingClassSlashCommand extends SlashCommand {
  constructor(client) {
    super(client, {
      name: "ping",
      description:
        "｢general｣ veja meu tempo de resposta e minha latência com a api do Discord.",
      type: ApplicationCommandType.ChatInput,
      usage: "/ping",
      owner: false
    });
  }
  async run(ctx, int) {
    var msg = await int?.editReply(`ping?`).then((msg) => {
      msg.edit({
        content: `🏓 **Pong**! Minha latência está em \`${Math.round(
          this.client.ws.ping
        )}ms\`, respondi está mensagem em \`${
          Date.now() - int.createdTimestamp
        }ms\`!`,
      });
    });
  }
}
