import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';
import { supabase } from '../../index.js';

export default {
  data: new SlashCommandBuilder()
    .setName('removexp')
    .setDescription('Manually remove XP from a user')
    .addUserOption(option =>
      option
        .setName('user')
        .setDescription('The user to remove XP from')
        .setRequired(true)
    )
    .addIntegerOption(option =>
      option
        .setName('amount')
        .setDescription('Amount of XP to remove')
        .setMinValue(1)
        .setMaxValue(10000)
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    // Check if user has administrator permissions
    if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
      return interaction.reply({
        content: '❌ You need **Administrator** permissions to use this command!',
        ephemeral: true
      });
    }

    const user = interaction.options.getUser('user');
    const amount = interaction.options.getInteger('amount');

    try {
      // Get current user data
      let { data: userLevel } = await supabase
        .from('levels')
        .select('*')
        .eq('user_id', user.id)
        .eq('guild_id', interaction.guild.id)
        .single();

      if (!userLevel) {
        return interaction.reply({ content: `❌ ${user.tag} has no level data!`, ephemeral: true });
      }

      // Calculate new values
      const newTotalXP = Math.max(0, userLevel.total_xp - amount);
      const newLevel = Math.max(1, Math.floor(newTotalXP / 100) + 1);
      const newCurrentXP = newTotalXP % 100;

      // Update database
      const { error: updateError } = await supabase
        .from('levels')
        .update({
          xp: newCurrentXP,
          level: newLevel,
          total_xp: newTotalXP
        })
        .eq('user_id', user.id)
        .eq('guild_id', interaction.guild.id);

      if (updateError) throw updateError;

      // Try to send DM to user about XP removal
      try {
        await user.send({
          embeds: [{
            color: 0xff6600,
            title: '📉 XP Removed',
            description: `**${amount} XP** has been removed from your account in **${interaction.guild.name}**`,
            fields: [
              {
                name: 'New Level',
                value: `Level ${newLevel}`,
                inline: true
              },
              {
                name: 'Total XP',
                value: `${newTotalXP} XP`,
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

      await interaction.reply({ 
        content: `✅ Successfully removed **${amount} XP** from ${user.tag}!\n` +
                `**New Level:** ${newLevel} | **Total XP:** ${newTotalXP}` 
      });

    } catch (error) {
      console.error(error);
      await interaction.reply({ content: '❌ Failed to remove XP. Database error occurred.', ephemeral: true });
    }
  },
};