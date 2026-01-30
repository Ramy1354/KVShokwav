import { SlashCommandBuilder } from 'discord.js';
import { supabase } from '../../index.js';

export default {
  data: new SlashCommandBuilder()
    .setName('afk')
    .setDescription('Set yourself as AFK')
    .addStringOption(option =>
      option
        .setName('reason')
        .setDescription('Reason for being AFK')
        .setRequired(false)
    ),

  async execute(interaction) {
    const reason = interaction.options.getString('reason') || 'No reason provided';

    const { error } = await supabase
      .from('afk_users')
      .upsert({
        user_id: interaction.user.id,
        guild_id: interaction.guild.id,
        reason: reason,
        timestamp: new Date().toISOString(),
      }, {
        onConflict: 'user_id,guild_id'
      });

    if (error) {
      console.error('Error setting AFK:', error);
      return interaction.reply({
        content: 'Failed to set AFK status!',
        ephemeral: true,
      });
    }

    await interaction.reply({
      content: `💤 You are now AFK: ${reason}`,
    });
  },
};
