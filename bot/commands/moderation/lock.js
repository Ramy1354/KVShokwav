import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('lock')
    .setDescription('Lock a channel to prevent members from sending messages')
    .addChannelOption(option =>
      option
        .setName('channel')
        .setDescription('The channel to lock')
        .setRequired(false)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),

  async execute(interaction) {
    // Check if user has manage channels permissions
    if (!interaction.member.permissions.has(PermissionFlagsBits.ManageChannels)) {
      return interaction.reply({
        content: '❌ You need **Manage Channels** permissions to use this command!',
        ephemeral: true
      });
    }

    const channel = interaction.options.getChannel('channel') || interaction.channel;

    if (!channel.permissionsFor(interaction.guild.roles.everyone).has(PermissionFlagsBits.SendMessages)) {
      return interaction.reply({
        content: `${channel} is already locked!`,
        ephemeral: true,
      });
    }

    await channel.permissionOverwrites.edit(interaction.guild.roles.everyone, {
      SendMessages: false,
    });

    await interaction.reply({
      content: `🔒 ${channel} has been locked!`,
    });
  },
};
