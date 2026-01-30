import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('kick')
    .setDescription('Kick a member from the server')
    .addUserOption(option =>
      option
        .setName('user')
        .setDescription('The member to kick')
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName('reason')
        .setDescription('Reason for the kick')
        .setRequired(false)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),

  async execute(interaction) {
    // Check if user has kick members permissions
    if (!interaction.member.permissions.has(PermissionFlagsBits.KickMembers)) {
      return interaction.reply({
        content: '❌ You need **Kick Members** permissions to use this command!',
        ephemeral: true
      });
    }

    const user = interaction.options.getUser('user');
    const reason = interaction.options.getString('reason') || 'No reason provided';
    const member = interaction.guild.members.cache.get(user.id);

    if (!member) {
      return interaction.reply({
        content: 'User not found in this server!',
        ephemeral: true,
      });
    }

    if (member.id === interaction.user.id) {
      return interaction.reply({
        content: 'You cannot kick yourself!',
        ephemeral: true,
      });
    }

    if (!member.kickable) {
      return interaction.reply({
        content: 'I cannot kick this user!',
        ephemeral: true,
      });
    }

    // Try to send DM before kicking
    try {
      await user.send({
        embeds: [{
          color: 0xff9900,
          title: '👢 You have been kicked',
          description: `You have been kicked from **${interaction.guild.name}**`,
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

    await member.kick(reason);

    await interaction.reply({
      content: `👢 ${user.tag} has been kicked! Reason: ${reason}`,
    });
  },
};
