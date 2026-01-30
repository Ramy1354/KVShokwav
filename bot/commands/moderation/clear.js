import { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('clear')
    .setDescription('Clear messages from the channel')
    .addIntegerOption(option =>
      option
        .setName('amount')
        .setDescription('Number of messages to delete (1-100)')
        .setRequired(true)
        .setMinValue(1)
        .setMaxValue(100)
    )
    .addUserOption(option =>
      option
        .setName('user')
        .setDescription('Only delete messages from this user')
        .setRequired(false)
    )
    .addStringOption(option =>
      option
        .setName('reason')
        .setDescription('Reason for clearing messages')
        .setRequired(false)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

  async execute(interaction) {
    try {
      await interaction.deferReply({ ephemeral: true });

      const amount = interaction.options.getInteger('amount');
      const targetUser = interaction.options.getUser('user');
      const reason = interaction.options.getString('reason') || 'No reason provided';

      // Check permissions
      if (!interaction.member.permissions.has(PermissionFlagsBits.ManageMessages)) {
        const noPermEmbed = new EmbedBuilder()
          .setColor('#FF6B6B')
          .setTitle('❌ Insufficient Permissions')
          .setDescription('You need the **Manage Messages** permission to use this command.')
          .setTimestamp();

        return await interaction.editReply({ embeds: [noPermEmbed] });
      }

      if (!interaction.guild.members.me.permissions.has(PermissionFlagsBits.ManageMessages)) {
        const botNoPermEmbed = new EmbedBuilder()
          .setColor('#FF6B6B')
          .setTitle('❌ Bot Missing Permissions')
          .setDescription('I need the **Manage Messages** permission to clear messages.')
          .setTimestamp();

        return await interaction.editReply({ embeds: [botNoPermEmbed] });
      }

      // Fetch messages
      let messages;
      try {
        messages = await interaction.channel.messages.fetch({ limit: amount });
      } catch (error) {
        const fetchErrorEmbed = new EmbedBuilder()
          .setColor('#FF6B6B')
          .setTitle('❌ Failed to Fetch Messages')
          .setDescription('Could not fetch messages from this channel.')
          .setTimestamp();

        return await interaction.editReply({ embeds: [fetchErrorEmbed] });
      }

      // Filter messages if user specified
      if (targetUser) {
        messages = messages.filter(msg => msg.author.id === targetUser.id);
      }

      // Filter out messages older than 14 days (Discord limitation)
      const twoWeeksAgo = Date.now() - 14 * 24 * 60 * 60 * 1000;
      const deletableMessages = messages.filter(msg => msg.createdTimestamp > twoWeeksAgo);

      if (deletableMessages.size === 0) {
        const noMessagesEmbed = new EmbedBuilder()
          .setColor('#FFA500')
          .setTitle('⚠️ No Messages to Delete')
          .setDescription(targetUser 
            ? `No recent messages found from **${targetUser.tag}** in this channel.`
            : 'No recent messages found to delete (messages must be less than 14 days old).'
          )
          .setTimestamp();

        return await interaction.editReply({ embeds: [noMessagesEmbed] });
      }

      // Delete messages
      try {
        let deletedCount = 0;
        
        if (deletableMessages.size === 1) {
          // Delete single message
          await deletableMessages.first().delete();
          deletedCount = 1;
        } else {
          // Bulk delete multiple messages
          const deleted = await interaction.channel.bulkDelete(deletableMessages, true);
          deletedCount = deleted.size;
        }

        const successEmbed = new EmbedBuilder()
          .setColor('#4CAF50')
          .setTitle('🗑️ Messages Cleared')
          .setDescription(`Successfully deleted **${deletedCount}** message${deletedCount === 1 ? '' : 's'}`)
          .addFields(
            { name: '📊 Deleted', value: `${deletedCount} messages`, inline: true },
            { name: '👮 Moderator', value: `${interaction.user.tag}`, inline: true },
            { name: '📍 Channel', value: `${interaction.channel}`, inline: true }
          );

        if (targetUser) {
          successEmbed.addFields(
            { name: '👤 Target User', value: `${targetUser.tag}`, inline: true }
          );
        }

        if (reason !== 'No reason provided') {
          successEmbed.addFields(
            { name: '📝 Reason', value: reason, inline: false }
          );
        }

        successEmbed.setTimestamp()
          .setFooter({ text: `Cleared by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() });

        await interaction.editReply({ embeds: [successEmbed] });

        // Log to audit channel
        const logChannel = interaction.guild.channels.cache.find(
          channel => channel.name === 'mod-logs' || channel.name === 'audit-logs'
        );

        if (logChannel && logChannel.id !== interaction.channel.id) {
          const logEmbed = new EmbedBuilder()
            .setColor('#4CAF50')
            .setTitle('🗑️ Messages Cleared')
            .addFields(
              { name: '📊 Deleted', value: `${deletedCount} messages`, inline: true },
              { name: '👮 Moderator', value: `${interaction.user.tag} (\`${interaction.user.id}\`)`, inline: true },
              { name: '📍 Channel', value: `${interaction.channel}`, inline: true }
            );

          if (targetUser) {
            logEmbed.addFields(
              { name: '👤 Target User', value: `${targetUser.tag} (\`${targetUser.id}\`)`, inline: true }
            );
          }

          if (reason !== 'No reason provided') {
            logEmbed.addFields(
              { name: '📝 Reason', value: reason, inline: false }
            );
          }

          logEmbed.setTimestamp();

          await logChannel.send({ embeds: [logEmbed] });
        }

      } catch (error) {
        console.error('Clear messages error:', error);
        
        const errorEmbed = new EmbedBuilder()
          .setColor('#FF6B6B')
          .setTitle('❌ Clear Failed')
          .setDescription(`Failed to clear messages: ${error.message}`)
          .setTimestamp();

        await interaction.editReply({ embeds: [errorEmbed] });
      }

    } catch (error) {
      console.error('Clear command error:', error);
      
      const errorEmbed = new EmbedBuilder()
        .setColor('#FF6B6B')
        .setTitle('❌ Unexpected Error')
        .setDescription(`An error occurred: ${error.message}`)
        .setTimestamp();

      if (interaction.deferred) {
        await interaction.editReply({ embeds: [errorEmbed] });
      } else {
        await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
      }
    }
  },
};