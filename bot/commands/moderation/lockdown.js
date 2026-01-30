import { SlashCommandBuilder, PermissionFlagsBits, ChannelType } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('lockdown')
    .setDescription('Lock down the entire server')
    .addStringOption(option =>
      option
        .setName('action')
        .setDescription('Lock or unlock the server')
        .setRequired(true)
        .addChoices(
          { name: 'Lock', value: 'lock' },
          { name: 'Unlock', value: 'unlock' }
        )
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    // Check if user has administrator permissions
    if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
      return interaction.reply({
        content: '❌ You need **Administrator** permissions to use this command!',
        ephemeral: true
      });
    }

    const action = interaction.options.getString('action');
    await interaction.deferReply();

    const channels = interaction.guild.channels.cache.filter(
      channel => channel.type === ChannelType.GuildText
    );

    let count = 0;

    for (const [, channel] of channels) {
      try {
        await channel.permissionOverwrites.edit(interaction.guild.roles.everyone, {
          SendMessages: action === 'lock' ? false : null,
        });
        count++;
      } catch (error) {
        console.error(`Failed to ${action} ${channel.name}:`, error);
      }
    }

    await interaction.editReply({
      content: action === 'lock'
        ? `🔒 Server lockdown activated! Locked ${count} channels.`
        : `🔓 Server lockdown lifted! Unlocked ${count} channels.`,
    });
  },
};
