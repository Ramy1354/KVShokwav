import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('adduser')
    .setDescription('Add a user to the current ticket')
    .addUserOption(option =>
      option
        .setName('user')
        .setDescription('The user to add to the ticket')
        .setRequired(true)
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

    const user = interaction.options.getUser('user');
    const channel = interaction.channel;

    // Check if this is a ticket channel
    if (!channel.name.startsWith('ticket-')) {
      return interaction.reply({ 
        content: '❌ This command can only be used in ticket channels!', 
        ephemeral: true 
      });
    }

    try {
      // Add user permissions to the channel
      await channel.permissionOverwrites.create(user.id, {
        ViewChannel: true,
        SendMessages: true,
        ReadMessageHistory: true,
      });

      await interaction.reply({ 
        content: `✅ Successfully added ${user} to this ticket!` 
      });

    } catch (error) {
      console.error(error);
      await interaction.reply({ 
        content: '❌ Failed to add user to ticket. Make sure I have the proper permissions!', 
        ephemeral: true 
      });
    }
  },
};