import { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } from 'discord.js';
import { supabase } from '../../index.js';

export default {
  data: new SlashCommandBuilder()
    .setName('warnings')
    .setDescription('List warnings for a user')
    .addUserOption(option =>
      option
        .setName('user')
        .setDescription('The user to check warnings for')
        .setRequired(true)
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

    try {
      const { data: warnings, error } = await supabase
        .from('warnings')
        .select('*')
        .eq('user_id', user.id)
        .eq('guild_id', interaction.guild.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (!warnings || warnings.length === 0) {
        return interaction.reply({ content: `✅ ${user.tag} has no warnings!`, ephemeral: true });
      }

      const embed = new EmbedBuilder()
        .setColor('#FFA500')
        .setTitle(`⚠️ Warnings for ${user.tag}`)
        .setThumbnail(user.displayAvatarURL({ dynamic: true }))
        .setDescription(`Total warnings: **${warnings.length}**`)
        .setTimestamp();

      // Show last 10 warnings
      const recentWarnings = warnings.slice(0, 10);
      
      for (let i = 0; i < recentWarnings.length; i++) {
        const warning = recentWarnings[i];
        const moderator = await interaction.client.users.fetch(warning.moderator_id).catch(() => null);
        const date = new Date(warning.created_at);
        
        embed.addFields({
          name: `Warning #${i + 1}`,
          value: `**Reason:** ${warning.reason}\n**Moderator:** ${moderator ? moderator.tag : 'Unknown'}\n**Date:** <t:${Math.floor(date.getTime() / 1000)}:R>`,
          inline: false
        });
      }

      if (warnings.length > 10) {
        embed.setFooter({ text: `Showing 10 of ${warnings.length} warnings` });
      }

      await interaction.reply({ embeds: [embed] });

    } catch (error) {
      console.error(error);
      await interaction.reply({ content: '❌ Failed to fetch warnings. Database error occurred.', ephemeral: true });
    }
  },
};