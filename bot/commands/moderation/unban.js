import { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('unban')
    .setDescription('Unban a user from the server')
    .addStringOption(option =>
      option
        .setName('userid')
        .setDescription('The ID of the user to unban')
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName('reason')
        .setDescription('Reason for unbanning')
        .setRequired(false)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

  async execute(interaction) {
    try {
      await interaction.deferReply();

      const userId = interaction.options.getString('userid');
      const reason = interaction.options.getString('reason') || 'No reason provided';

      // Check if user has permission
      if (!interaction.member.permissions.has(PermissionFlagsBits.BanMembers)) {
        const noPermEmbed = new EmbedBuilder()
          .setColor('#FF6B6B')
          .setTitle('❌ Insufficient Permissions')
          .setDescription('You need the **Ban Members** permission to use this command.')
          .setTimestamp();

        return await interaction.editReply({ embeds: [noPermEmbed] });
      }

      // Check if bot has permission
      if (!interaction.guild.members.me.permissions.has(PermissionFlagsBits.BanMembers)) {
        const botNoPermEmbed = new EmbedBuilder()
          .setColor('#FF6B6B')
          .setTitle('❌ Bot Missing Permissions')
          .setDescription('I need the **Ban Members** permission to unban users.')
          .setTimestamp();

        return await interaction.editReply({ embeds: [botNoPermEmbed] });
      }

      // Validate user ID format
      if (!/^\d{17,19}$/.test(userId)) {
        const invalidIdEmbed = new EmbedBuilder()
          .setColor('#FF6B6B')
          .setTitle('❌ Invalid User ID')
          .setDescription('Please provide a valid Discord user ID (17-19 digits).')
          .setTimestamp();

        return await interaction.editReply({ embeds: [invalidIdEmbed] });
      }

      // Check if user is actually banned
      let bannedUser;
      try {
        const bans = await interaction.guild.bans.fetch();
        bannedUser = bans.get(userId);
        
        if (!bannedUser) {
          const notBannedEmbed = new EmbedBuilder()
            .setColor('#FFA500')
            .setTitle('⚠️ User Not Banned')
            .setDescription(`User with ID \`${userId}\` is not banned from this server.`)
            .setTimestamp();

          return await interaction.editReply({ embeds: [notBannedEmbed] });
        }
      } catch (error) {
        const errorEmbed = new EmbedBuilder()
          .setColor('#FF6B6B')
          .setTitle('❌ Error Fetching Bans')
          .setDescription('Failed to fetch the ban list. Please try again.')
          .setTimestamp();

        return await interaction.editReply({ embeds: [errorEmbed] });
      }

      // Unban the user
      try {
        await interaction.guild.members.unban(userId, reason);

        const successEmbed = new EmbedBuilder()
          .setColor('#4CAF50')
          .setTitle('✅ User Unbanned')
          .setDescription(`Successfully unbanned **${bannedUser.user.tag}**`)
          .addFields(
            { name: '👤 User', value: `${bannedUser.user.tag} (\`${bannedUser.user.id}\`)`, inline: true },
            { name: '👮 Moderator', value: `${interaction.user.tag}`, inline: true },
            { name: '📝 Reason', value: reason, inline: false }
          )
          .setThumbnail(bannedUser.user.displayAvatarURL())
          .setTimestamp()
          .setFooter({ text: `Unbanned by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() });

        await interaction.editReply({ embeds: [successEmbed] });

        // Log to audit channel if exists
        const logChannel = interaction.guild.channels.cache.find(
          channel => channel.name === 'mod-logs' || channel.name === 'audit-logs'
        );

        if (logChannel) {
          const logEmbed = new EmbedBuilder()
            .setColor('#4CAF50')
            .setTitle('🔓 User Unbanned')
            .addFields(
              { name: '👤 User', value: `${bannedUser.user.tag} (\`${bannedUser.user.id}\`)`, inline: true },
              { name: '👮 Moderator', value: `${interaction.user.tag} (\`${interaction.user.id}\`)`, inline: true },
              { name: '📝 Reason', value: reason, inline: false },
              { name: '📍 Channel', value: `${interaction.channel}`, inline: true }
            )
            .setTimestamp();

          await logChannel.send({ embeds: [logEmbed] });
        }

      } catch (error) {
        console.error('Unban error:', error);
        
        const errorEmbed = new EmbedBuilder()
          .setColor('#FF6B6B')
          .setTitle('❌ Unban Failed')
          .setDescription(`Failed to unban the user: ${error.message}`)
          .setTimestamp();

        await interaction.editReply({ embeds: [errorEmbed] });
      }

    } catch (error) {
      console.error('Unban command error:', error);
      
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