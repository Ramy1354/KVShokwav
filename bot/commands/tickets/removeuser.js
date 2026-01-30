import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('removeuser')
    .setDescription('Remove a user from the current ticket')
    .addUserOption(option =>
      option
        .setName('user')
        .setDescription('The user to remove from the ticket')
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

    // Don't allow removing the ticket creator
    const ticketOwner = channel.name.replace('ticket-', '');
    if (user.username.toLowerCase() === ticketOwner) {
      return interaction.reply({ 
        content: '❌ You cannot remove the ticket creator!', 
        ephemeral: true 
      });
    }

    try {
      // Remove user permissions from the channel
      await channel.permissionOverwrites.delete(user.id);

      await interaction.reply({ 
        content: `✅ Successfully removed ${user} from this ticket!` 
      });

    } catch (error) {
      console.error(error);
      await interaction.reply({ 
        content: '❌ Failed to remove user from ticket. Make sure I have the proper permissions!', 
        ephemeral: true 
      });
    }
  },
};