import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('purge')
    .setDescription('Delete messages from a user')
    .addUserOption(option =>
      option
        .setName('user')
        .setDescription('The user whose messages to delete')
        .setRequired(true)
    )
    .addIntegerOption(option =>
      option
        .setName('amount')
        .setDescription('Number of messages to check (max 100)')
        .setMinValue(1)
        .setMaxValue(100)
        .setRequired(false)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

  async execute(interaction) {
    // Check if user has manage messages permissions
    if (!interaction.member.permissions.has(PermissionFlagsBits.ManageMessages)) {
      return interaction.reply({
        content: '❌ You need **Manage Messages** permissions to use this command!',
        ephemeral: true
      });
    }

    const user = interaction.options.getUser('user');
    const amount = interaction.options.getInteger('amount') || 50;

    await interaction.deferReply({ ephemeral: true });

    try {
      const messages = await interaction.channel.messages.fetch({ limit: amount });
      const userMessages = messages.filter(msg => msg.author.id === user.id);

      if (userMessages.size === 0) {
        return interaction.editReply({ content: `❌ No messages found from ${user.tag} in the last ${amount} messages.` });
      }

      await interaction.channel.bulkDelete(userMessages, true);
      
      await interaction.editReply({ 
        content: `✅ Successfully deleted **${userMessages.size}** messages from ${user.tag}!` 
      });
    } catch (error) {
      console.error(error);
      await interaction.editReply({ content: '❌ Failed to delete messages. Messages might be too old (14+ days).' });
    }
  },
};