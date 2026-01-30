import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('unmute')
    .setDescription('Unmute a user (remove timeout)')
    .addUserOption(option =>
      option
        .setName('user')
        .setDescription('The user to unmute')
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName('reason')
        .setDescription('Reason for unmuting')
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
    const reason = interaction.options.getString('reason') || 'No reason provided';
    const member = interaction.guild.members.cache.get(user.id);

    if (!member) {
      return interaction.reply({ content: '❌ User not found in this server!', ephemeral: true });
    }

    if (!member.isCommunicationDisabled()) {
      return interaction.reply({ content: '❌ This user is not muted!', ephemeral: true });
    }

    try {
      // Try to send DM before unmuting
    try {
      await user.send({
        embeds: [{
          color: 0x00ff00,
          title: '🔊 You have been unmuted',
          description: `You have been unmuted in **${interaction.guild.name}**`,
          fields: [
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

    await member.timeout(null, reason);
      await interaction.reply({ 
        content: `✅ Successfully unmuted ${user.tag}\n**Reason:** ${reason}` 
      });
    } catch (error) {
      console.error(error);
      await interaction.reply({ content: '❌ Failed to unmute user. Make sure I have the proper permissions!', ephemeral: true });
    }
  },
};