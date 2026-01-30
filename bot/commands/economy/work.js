import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { supabase } from '../../index.js';

export default {
  data: new SlashCommandBuilder()
    .setName('work')
    .setDescription('Work to earn money'),

  async execute(interaction) {
    try {
      await interaction.deferReply();

      let { data: economy, error } = await supabase
        .from('economy')
        .select('*')
        .eq('user_id', interaction.user.id)
        .eq('guild_id', interaction.guild.id)
        .maybeSingle();

      if (error) {
        const errorEmbed = new EmbedBuilder()
          .setColor('#FF6B6B')
          .setTitle('❌ Database Error')
          .setDescription(`Failed to fetch your profile: ${error.message}`)
          .setTimestamp();
        
        return await interaction.editReply({ embeds: [errorEmbed] });
      }

      if (!economy) {
        const { data: newEconomy, error: insertError } = await supabase
          .from('economy')
          .insert({
            user_id: interaction.user.id,
            guild_id: interaction.guild.id,
            balance: 0,
            bank: 0,
          })
          .select()
          .single();

        if (insertError) {
          const errorEmbed = new EmbedBuilder()
            .setColor('#FF6B6B')
            .setTitle('❌ Error')
            .setDescription(`Failed to create economy profile: ${insertError.message}`)
            .setTimestamp();
          
          return await interaction.editReply({ embeds: [errorEmbed] });
        }

        economy = newEconomy;
      }

      const now = new Date();
      const lastWork = economy.last_work ? new Date(economy.last_work) : null;

      if (lastWork) {
        const timeDiff = now - lastWork;
        const minutesDiff = timeDiff / (1000 * 60);

        if (minutesDiff < 60) {
          const minutesLeft = Math.ceil(60 - minutesDiff);
          const cooldownEmbed = new EmbedBuilder()
            .setColor('#FFA500')
            .setTitle('⏰ Work Cooldown')
            .setDescription(`You're tired! Rest for **${minutesLeft} more minutes** before working again.`)
            .setTimestamp();

          return await interaction.editReply({ embeds: [cooldownEmbed] });
        }
      }

      const jobs = [
        { name: 'Developer', emoji: '💻', min: 300, max: 600 },
        { name: 'Designer', emoji: '🎨', min: 250, max: 550 },
        { name: 'Writer', emoji: '✍️', min: 200, max: 500 },
        { name: 'Teacher', emoji: '👨‍🏫', min: 280, max: 520 },
        { name: 'Doctor', emoji: '👨‍⚕️', min: 400, max: 700 },
        { name: 'Engineer', emoji: '👷', min: 350, max: 650 },
        { name: 'Artist', emoji: '🎭', min: 200, max: 450 },
        { name: 'Musician', emoji: '🎵', min: 180, max: 420 },
        { name: 'Chef', emoji: '👨‍🍳', min: 220, max: 480 },
        { name: 'Gamer', emoji: '🎮', min: 150, max: 400 }
      ];

      const job = jobs[Math.floor(Math.random() * jobs.length)];
      const earned = Math.floor(Math.random() * (job.max - job.min + 1)) + job.min;

      const { error: updateError } = await supabase
        .from('economy')
        .update({
          balance: economy.balance + earned,
          last_work: now.toISOString(),
        })
        .eq('user_id', interaction.user.id)
        .eq('guild_id', interaction.guild.id);

      if (updateError) {
        const errorEmbed = new EmbedBuilder()
          .setColor('#FF6B6B')
          .setTitle('❌ Error')
          .setDescription(`Failed to update balance: ${updateError.message}`)
          .setTimestamp();
        
        return await interaction.editReply({ embeds: [errorEmbed] });
      }

      const workEmbed = new EmbedBuilder()
        .setColor('#4CAF50')
        .setTitle('💼 Work Complete!')
        .setDescription(`You worked as a **${job.emoji} ${job.name}** and earned **${earned.toLocaleString()} coins**!`)
        .addFields(
          { name: '💰 New Balance', value: `${(economy.balance + earned).toLocaleString()} coins`, inline: true },
          { name: '⏰ Next Work', value: 'Available in 1 hour', inline: true }
        )
        .setTimestamp();

      await interaction.editReply({ embeds: [workEmbed] });

    } catch (error) {
      console.error('Work command error:', error);
      
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