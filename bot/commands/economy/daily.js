import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { supabase } from '../../index.js';

export default {
  data: new SlashCommandBuilder()
    .setName('daily')
    .setDescription('Claim your daily reward'),

  async execute(interaction) {
    try {
      await interaction.deferReply();

      let { data: economy, error: selectError } = await supabase
        .from('economy')
        .select('*')
        .eq('user_id', interaction.user.id)
        .eq('guild_id', interaction.guild.id)
        .maybeSingle();

      if (selectError) {
        console.error('Daily command - Select error:', selectError);
        return await interaction.editReply({
          content: `❌ Database error: ${selectError.message}`,
        });
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
          console.error('Daily command - Insert error:', insertError);
          return await interaction.editReply({
            content: `❌ Failed to create economy profile: ${insertError.message}`,
          });
        }

        economy = newEconomy;
      }

      const now = new Date();
      const lastDaily = economy.last_daily ? new Date(economy.last_daily) : null;

      if (lastDaily) {
        const timeDiff = now - lastDaily;
        const hoursDiff = timeDiff / (1000 * 60 * 60);

        if (hoursDiff < 24) {
          const hoursLeft = Math.ceil(24 - hoursDiff);
          const embed = new EmbedBuilder()
            .setColor('#FF6B6B')
            .setTitle('⏰ Daily Reward Already Claimed')
            .setDescription(`You've already claimed your daily reward!\nCome back in **${hoursLeft} hours**.`)
            .setTimestamp();

          return await interaction.editReply({ embeds: [embed] });
        }
      }

      const dailyAmount = 1000;

      const { error: updateError } = await supabase
        .from('economy')
        .update({
          balance: economy.balance + dailyAmount,
          last_daily: now.toISOString(),
        })
        .eq('user_id', interaction.user.id)
        .eq('guild_id', interaction.guild.id);

      if (updateError) {
        console.error('Daily command - Update error:', updateError);
        return await interaction.editReply({
          content: `❌ Failed to update balance: ${updateError.message}`,
        });
      }

      const embed = new EmbedBuilder()
        .setColor('#4CAF50')
        .setTitle('🎁 Daily Reward Claimed!')
        .setDescription(`You received **${dailyAmount.toLocaleString()}** coins!`)
        .addFields(
          { name: '💰 New Balance', value: `${(economy.balance + dailyAmount).toLocaleString()} coins`, inline: true }
        )
        .setTimestamp();

      await interaction.editReply({ embeds: [embed] });

    } catch (error) {
      console.error('Daily command error:', error);
      
      if (interaction.deferred) {
        await interaction.editReply({
          content: `❌ An unexpected error occurred: ${error.message}`,
        });
      } else {
        await interaction.reply({
          content: `❌ An unexpected error occurred: ${error.message}`,
          ephemeral: true,
        });
      }
    }
  },
};