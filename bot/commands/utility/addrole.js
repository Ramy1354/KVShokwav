import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('addrole')
    .setDescription('Assign a role to a user')
    .addUserOption(option =>
      option
        .setName('user')
        .setDescription('The user to assign the role to')
        .setRequired(true)
    )
    .addRoleOption(option =>
      option
        .setName('role')
        .setDescription('The role to assign')
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

    if (member.roles.cache.has(role.id)) {
      return interaction.reply({ content: `❌ ${user.tag} already has the ${role.name} role!`, ephemeral: true });
    }

    try {
      await member.roles.add(role);
      
      // Try to send DM to user about role addition
      try {
        await user.send({
          embeds: [{
            color: 0x00ff00,
            title: '🎭 Role Added!',
            description: `You have been given the **${role.name}** role in **${interaction.guild.name}**`,
            fields: [
              {
                name: 'Role',
                value: role.name,
                inline: true
              },
              {
                name: 'Added by',
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
      
      await interaction.reply({ content: `✅ Successfully added the **${role.name}** role to ${user.tag}!` });
    } catch (error) {
      console.error(error);
      await interaction.reply({ content: '❌ Failed to add role. Make sure I have the proper permissions!', ephemeral: true });
    }
  },
};