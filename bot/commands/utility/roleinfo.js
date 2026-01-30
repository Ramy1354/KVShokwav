import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('roleinfo')
    .setDescription('Get information about a role')
    .addRoleOption(option =>
      option
        .setName('role')
        .setDescription('The role to get info about')
        .setRequired(true)
    ),

  async execute(interaction) {
    const role = interaction.options.getRole('role');

    const embed = new EmbedBuilder()
      .setColor(role.color || '#00FFFF')
      .setTitle(`${role.name} Role Information`)
      .addFields(
        { name: '🎭 Role Name', value: role.name, inline: true },
        { name: '🆔 Role ID', value: role.id, inline: true },
        { name: '🎨 Color', value: role.hexColor, inline: true },
        { name: '👥 Members', value: `${role.members.size}`, inline: true },
        { name: '📊 Position', value: `${role.position}`, inline: true },
        { name: '📌 Hoisted', value: role.hoist ? 'Yes' : 'No', inline: true },
        { name: '🔔 Mentionable', value: role.mentionable ? 'Yes' : 'No', inline: true },
        { name: '📅 Created', value: `<t:${Math.floor(role.createdTimestamp / 1000)}:R>`, inline: true },
        { name: '🔑 Permissions', value: role.permissions.toArray().slice(0, 10).join(', ') || 'None', inline: false }
      )
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};
