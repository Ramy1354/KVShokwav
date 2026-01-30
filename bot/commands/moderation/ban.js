import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Ban a member from the server')
    .addUserOption(option =>
      option
        .setName('user')
        .setDescription('The member to ban')
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName('reason')
        .setDescription('Reason for the ban')
        .setRequired(false)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

  async execute(interaction) {
    // Check if user has ban members permissions
    if (!interaction.member.permissions.has(PermissionFlagsBits.BanMembers)) {
      return interaction.reply({
        content: '❌ You need **Ban Members** permissions to use this command!',
        ephemeral: true
      });
    }

    const user = interaction.options.getUser('user');
    const reason = interaction.options.getString('reason') || 'No reason provided';
    const member = interaction.guild.members.cache.get(user.id);

    if (member) {
      if (member.id === interaction.user.id) {
        return interaction.reply({
          content: 'You cannot ban yourself!',
          ephemeral: true,
        });
      }

      if (!member.bannable) {
        return interaction.reply({
          content: 'I cannot ban this user!',
          ephemeral: true,
        });
      }
    }

    // Try to send DM before banning
    try {
      await user.send({
        embeds: [{
          color: 0xff0000,
          title: '🔨 You have been banned',
          description: `You have been banned from **${interaction.guild.name}**`,
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

    await interaction.guild.members.ban(user, { reason });

    await interaction.reply({
      content: `🔨 ${user.tag} has been banned! Reason: ${reason}`,
    });
  },
};
