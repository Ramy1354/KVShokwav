import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { supabase } from '../../index.js';

export default {
  data: new SlashCommandBuilder()
    .setName('leaderboard')
    .setDescription('Show the top users by XP and level'),

  async execute(interaction) {
    try {
      const { data: topUsers, error } = await supabase
        .from('levels')
        .select('*')
        .eq('guild_id', interaction.guild.id)
        .order('total_xp', { ascending: false })
        .limit(10);

      if (error) throw error;

      if (!topUsers || topUsers.length === 0) {
        return interaction.reply({ content: '❌ No level data found for this server!', ephemeral: true });
      }

      const embed = new EmbedBuilder()
        .setColor('#FFD700')
        .setTitle('🏆 Server Leaderboard')
        .setDescription('Top 10 users by total XP')
        .setTimestamp();

      let description = '';
      for (let i = 0; i < topUsers.length; i++) {
        const userData = topUsers[i];
        const user = await interaction.client.users.fetch(userData.user_id).catch(() => null);
        const medal = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `${i + 1}.`;
        
        description += `${medal} ${user ? user.tag : 'Unknown User'}\n`;
        description += `   Level: **${userData.level}** | XP: **${userData.total_xp}**\n\n`;
      }

      embed.setDescription(description);

      await interaction.reply({ embeds: [embed] });

    } catch (error) {
      console.error(error);
      await interaction.reply({ content: '❌ Failed to fetch leaderboard data.', ephemeral: true });
    }
  },
};