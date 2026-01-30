import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('serverinfo')
    .setDescription('Get information about the server'),

  async execute(interaction) {
    const { guild } = interaction;

    const embed = new EmbedBuilder()
      .setColor('#FF0000')
      .setTitle(`${guild.name} Server Information`)
      .setThumbnail(guild.iconURL({ dynamic: true }))
      .addFields(
        { name: '📝 Server Name', value: guild.name, inline: true },
        { name: '🆔 Server ID', value: guild.id, inline: true },
        { name: '👑 Owner', value: `<@${guild.ownerId}>`, inline: true },
        { name: '👥 Members', value: `${guild.memberCount}`, inline: true },
        { name: '📅 Created', value: `<t:${Math.floor(guild.createdTimestamp / 1000)}:R>`, inline: true },
        { name: '💬 Channels', value: `${guild.channels.cache.size}`, inline: true },
        { name: '😊 Emojis', value: `${guild.emojis.cache.size}`, inline: true },
        { name: '🎭 Roles', value: `${guild.roles.cache.size}`, inline: true },
        { name: '🚀 Boost Level', value: `${guild.premiumTier}`, inline: true }
      )
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};
