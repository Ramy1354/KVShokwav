import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('mute')
    .setDescription('Mute a user (timeout)')
    .addUserOption(option =>
      option
        .setName('user')
        .setDescription('The user to mute')
        .setRequired(true)
    )
    .addIntegerOption(option =>
      option
        .setName('duration')
        .setDescription('Duration in minutes (max 40320 = 28 days)')
        .setMinValue(1)
        .setMaxValue(40320)
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName('reason')
        .setDescription('Reason for the mute')
        .setRequired(false)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),

  async execute(interaction) {
    // Check if user has moderate members permissions
    if (!interaction.member.permissions.has(PermissionFlagsBits.ModerateMembers)) {
      return interaction.reply({
        content: '❌ You need **Moderate Members** permissions to use this command!',
        ephemeral: true
      });
    }

    const user = interaction.options.getUser('user');
    const duration = interaction.options.getInteger('duration');
    const reason = interaction.options.getString('reason') || 'No reason provided';
    const member = interaction.guild.members.cache.get(user.id);

    if (!member) {
      return interaction.reply({ content: '❌ User not found in this server!', ephemeral: true });
    }

    if (member.isCommunicationDisabled()) {
      return interaction.reply({ content: '❌ This user is already muted!', ephemeral: true });
    }

    try {
      // Try to send DM before muting
    try {
      await user.send({
        embeds: [{
          color: 0xffaa00,
          title: '🔇 You have been muted',
          description: `You have been muted in **${interaction.guild.name}**`,
          fields: [
            {
              name: 'Duration',
              value: `${duration} minutes`,
              inline: true
            },
            {
              name: 'Reason',
              value: reason,
              inline: false
            },
            {
              name: 'Moderator',
              value: interaction.user.tag,
              inline: true
            }
          ],
          timestamp: new Date().toISOString(),
          footer: {
            text: 'KV | Shok.wav Bot'
          }
        }]
      });
    } catch (dmError) {
      console.log('Could not send DM to user (DMs disabled or blocked)');
    }

    await member.timeout(duration * 60 * 1000, reason);
      await interaction.reply({ 
        content: `✅ Successfully muted ${user.tag} for **${duration} minutes**\n**Reason:** ${reason}` 
      });
    } catch (error) {
      console.error(error);
      await interaction.reply({ content: '❌ Failed to mute user. Make sure I have the proper permissions!', ephemeral: true });
    }
  },
};