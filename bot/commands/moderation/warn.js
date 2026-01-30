import { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } from 'discord.js';
import { supabase } from '../../index.js';

export default {
  data: new SlashCommandBuilder()
    .setName('warn')
    .setDescription('Warn a user')
    .addUserOption(option =>
      option
        .setName('user')
        .setDescription('The user to warn')
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName('reason')
        .setDescription('Reason for the warning')
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
    const reason = interaction.options.getString('reason');
    const member = interaction.guild.members.cache.get(user.id);

    if (!member) {
      return interaction.reply({ content: '❌ User not found in this server!', ephemeral: true });
    }

    try {
      // Add warning to database
      const { error } = await supabase
        .from('warnings')
        .insert({
          user_id: user.id,
          guild_id: interaction.guild.id,
          moderator_id: interaction.user.id,
          reason: reason,
          created_at: new Date().toISOString()
        });

      if (error) throw error;

      // Get total warnings for user
      const { data: warnings, error: countError } = await supabase
        .from('warnings')
        .select('*')
        .eq('user_id', user.id)
        .eq('guild_id', interaction.guild.id);

      if (countError) throw countError;

      const embed = new EmbedBuilder()
        .setColor('#FFA500')
        .setTitle('⚠️ User Warned')
        .addFields(
          { name: '👤 User', value: `${user.tag} (${user.id})`, inline: true },
          { name: '👮 Moderator', value: interaction.user.tag, inline: true },
          { name: '📝 Reason', value: reason, inline: false },
          { name: '📊 Total Warnings', value: `${warnings.length}`, inline: true }
        )
        .setTimestamp();

      await interaction.reply({ embeds: [embed] });

      // Try to DM the user
      try {
        const dmEmbed = new EmbedBuilder()
          .setColor('#FFA500')
          .setTitle('⚠️ You have been warned')
          .setDescription(`You have been warned in **${interaction.guild.name}**`)
          .addFields(
            { name: 'Reason', value: reason, inline: false },
            { name: 'Moderator', value: interaction.user.tag, inline: true },
            { name: 'Total Warnings', value: `${warnings.length}`, inline: true }
          )
          .setTimestamp()
          .setFooter({ text: 'KV | Shok.wav Bot' });

        await user.send({ embeds: [dmEmbed] });
      } catch (dmError) {
        console.log('Could not send DM to user (DMs disabled or blocked)');
      }

    } catch (error) {
      console.error(error);
      await interaction.reply({ content: '❌ Failed to warn user. Database error occurred.', ephemeral: true });
    }
  },
};