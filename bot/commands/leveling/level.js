import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { supabase } from '../../index.js';

export default {
  data: new SlashCommandBuilder()
    .setName('level')
    .setDescription('Show XP and level for yourself or another user')
    .addUserOption(option =>
      option
        .setName('user')
        .setDescription('The user to check level for')
        .setRequired(false)
    ),

  async execute(interaction) {
    const user = interaction.options.getUser('user') || interaction.user;

    try {
      let { data: userLevel } = await supabase
        .from('levels')
        .select('*')
        .eq('user_id', user.id)
        .eq('guild_id', interaction.guild.id)
        .single();

      if (!userLevel) {
        // Create new user entry
        const { data: newUser, error } = await supabase
          .from('levels')
          .insert({
            user_id: user.id,
            guild_id: interaction.guild.id,
            xp: 0,
            level: 1,
            total_xp: 0
          })
          .select()
          .single();

        if (error) throw error;
        userLevel = newUser;
      }

      // Calculate XP needed for next level
      const currentLevelXP = userLevel.level * 100;
      const nextLevelXP = (userLevel.level + 1) * 100;
      const xpProgress = userLevel.xp;
      const xpNeeded = nextLevelXP - currentLevelXP - xpProgress;

      // Get user rank
      const { data: allUsers } = await supabase
        .from('levels')
        .select('user_id, total_xp')
        .eq('guild_id', interaction.guild.id)
        .order('total_xp', { ascending: false });

      const rank = allUsers.findIndex(u => u.user_id === user.id) + 1;

      const embed = new EmbedBuilder()
        .setColor('#00FF00')
        .setTitle(`📊 Level Stats for ${user.tag}`)
        .setThumbnail(user.displayAvatarURL({ dynamic: true }))
        .addFields(
          { name: '🏆 Level', value: `${userLevel.level}`, inline: true },
          { name: '⭐ Current XP', value: `${xpProgress}/${nextLevelXP - currentLevelXP}`, inline: true },
          { name: '📈 Total XP', value: `${userLevel.total_xp}`, inline: true },
          { name: '🎯 XP to Next Level', value: `${xpNeeded}`, inline: true },
          { name: '🏅 Server Rank', value: `#${rank}`, inline: true },
          { name: '📊 Progress', value: `${'█'.repeat(Math.floor((xpProgress / (nextLevelXP - currentLevelXP)) * 10))}${'░'.repeat(10 - Math.floor((xpProgress / (nextLevelXP - currentLevelXP)) * 10))}`, inline: false }
        )
        .setTimestamp();

      await interaction.reply({ embeds: [embed] });

    } catch (error) {
      console.error(error);
      await interaction.reply({ content: '❌ Failed to fetch level data.', ephemeral: true });
    }
  },
};