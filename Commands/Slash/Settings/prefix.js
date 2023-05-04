const {
    SlashCommandBuilder,
    CommandInteraction,
    PermissionFlagsBits,
    ApplicationCommandType,
  } = require("discord.js");
const { Queue } = require("distube");
const { PREFIX } = require("../../../settings/config");

module.exports = {
  name: "prefix",
  description: `change prefix of current server`,
  userPermissions: PermissionFlagsBits.ManageGuild,
  botPermissions: PermissionFlagsBits.ManageGuild,
  category: "Settings",
  cooldown: 5,
  type: ApplicationCommandType.ChatInput,
  inVoiceChannel: false,
  inSameVoiceChannel: false,
  Player: false,
  djOnly: false,
  data: new SlashCommandBuilder()
        .setName("perfix")
        .setDescription("asdasd")
        .addStringOption((option) =>
        option
            .setName("set")
            .setDescription("asdasd")
            .setRequired(true)
        ),

  /**
   *
   * @param {JUGNU} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   * @param {Queue} queue
   */
  run: async (client, message, args, prefix, queue) => {
    // Code
    const getName = interaction.options.getString("set");

    let options = args[0];
    switch (options) {
      case getName:
        {
          let nPrefix = args[1];
          if (!nPrefix) {
            return client.embed(
              message,
              `${client.config.emoji.ERROR} Please Provide New Prefix`
            );
          } else {
            await client.music.set(`${message.guildId}.prefix`, nPrefix);
            client.embed(
              message,
              `${client.config.emoji.SUCCESS} Prefix Updated to \`${nPrefix}\``
            );
          }
        }
        break;
      case "reset":
        {
          await client.music.set(`${message.guildId}.prefix`, PREFIX);
          client.embed(
            message,
            `${client.config.emoji.SUCCESS} Prefix Updated to \`${PREFIX}\``
          );
        }
        break;

      default:
        {
          client.embed(
            message,
            `** ${client.config.emoji.ERROR} Wrong Usage **  \n\n \`${prefix}prefix set <newprefix>\` \n\n \`${prefix}prefix reset\` `
          );
        }
        break;
    }
  },
};
