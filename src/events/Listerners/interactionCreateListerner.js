import client from "../../../index.js";
import { ApplicationCommandOptionType } from "discord.js";

client.on("interactionCreate", async (interaction) => {
  const prefix = "/",
    int = interaction,
    ctx = interaction.user;

  if (interaction.commandType === 1) {
    const { commandName } = interaction;
    let cmd = client.slashCommands.get(commandName);

    if (!cmd)
      return interaction.editReply(
        `:x: **${config.text.separator}** ${ctx}, Não achei nenhum comando relacionado a \`${commandName}\` em minha memória interna.`
      );

    await interaction.deferReply();

    const args = [];
    for (let option of interaction.options.data) {
      if (option.type === ApplicationCommandOptionType.Subcommand) {
        if (option.name) args.push(option.name);
        option.options?.forEach((x) => {
          if (x.value) args.push(x.value);
        });
      } else if (option.value) args.push(option.value);
    }

    try {
      await cmd.run(ctx, int, args, prefix).catch((err) => {
        console.log(err);
        int?.editReply({
          content: `:x: ${ctx}, infelizmente ocorreu um erro ao executar o comando, por favor tire print desta mensagem e abra um ticket em meu servidor de suporte.\n\`\`\`\n${err}\n\`\`\``,
          ephemeral: true,
        });
      });
    } catch (e) {
      console.log(e);
    }
  }
});
