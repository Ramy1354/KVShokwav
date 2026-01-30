import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('removerole')
    .setDescription('Remove a role from a user')
    .addUserOption(option =>
      option
        .setName('user')
        .setDescription('The user to remove the role from')
        .setRequired(true)
    )
    .addRoleOption(option =>
      option
        .setName('role')
        .setDescription('The role to remove')
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles),

  async execute(interaction) {
    // Check if user has manage roles permissions
    if (!interaction.member.permissions.has(PermissionFlagsBits.ManageRoles)) {
      return interaction.reply({
        content: '❌ You need **Manage Roles** permissions to use this command!',
        ephemeral: true
      });
    }

    const user = interaction.options.getUser('user');
    const role = interaction.options.getRole('role');
    const member = interaction.guild.members.cache.get(user.id);

    if (!member) {
      return interaction.reply({ content: '❌ User not found in this server!', ephemeral: true });
    }

    if (!member.roles.cache.has(role.id)) {
      return interaction.reply({ content: `❌ ${user.tag} doesn't have the ${role.name} role!`, ephemeral: true });
    }

    try {
      await member.roles.remove(role);
      
      // Try to send DM to user about role removal
      try {
        await user.send({
          embeds: [{
            color: 0xff6600,
            title: '🎭 Role Removed',
            description: `The **${role.name}** role has been removed from you in **${interaction.guild.name}**`,
            fields: [
              {
                name: 'Role',
                value: role.name,
                inline: true
              },
              {
                name: 'Removed by',
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
      
      await interaction.reply({ content: `✅ Successfully removed the **${role.name}** role from ${user.tag}!` });
    } catch (error) {
      console.error(error);
      await interaction.reply({ content: '❌ Failed to remove role. Make sure I have the proper permissions!', ephemeral: true });
    }
  },
};