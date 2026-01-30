import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('slowmode')
    .setDescription('Set slowmode for a channel')
    .addIntegerOption(option =>
      option
        .setName('seconds')
        .setDescription('Slowmode duration in seconds (0 to disable)')
        .setRequired(true)
        .setMinValue(0)
        .setMaxValue(21600)
    )
    .addChannelOption(option =>
      option
        .setName('channel')
        .setDescription('The channel to set slowmode in')
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

    const seconds = interaction.options.getInteger('seconds');
    const channel = interaction.options.getChannel('channel') || interaction.channel;

    await channel.setRateLimitPerUser(seconds);

    if (seconds === 0) {
      await interaction.reply({
        content: `⏱️ Slowmode has been disabled in ${channel}!`,
      });
    } else {
      await interaction.reply({
        content: `⏱️ Slowmode set to ${seconds} seconds in ${channel}!`,
      });
    }
  },
};
