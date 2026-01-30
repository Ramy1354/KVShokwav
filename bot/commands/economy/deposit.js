import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { supabase } from '../../index.js';

export default {
  data: new SlashCommandBuilder()
    .setName('deposit')
    .setDescription('Deposit money into your bank')
    .addStringOption(option =>
      option
        .setName('amount')
        .setDescription('Amount to deposit (or "all")')
        .setRequired(true)
    ),

  async execute(interaction) {
    try {
      await interaction.deferReply();

      const amountStr = interaction.options.getString('amount');

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
        const noAccountEmbed = new EmbedBuilder()
          .setColor('#FFA500')
          .setTitle('🏦 No Account Found')
          .setDescription('You don\'t have an economy account yet! Use `/balance` or `/work` to create one.')
          .setTimestamp();

        return await interaction.editReply({ embeds: [noAccountEmbed] });
      }

      let amount;
      if (amountStr.toLowerCase() === 'all') {
        amount = economy.balance;
      } else {
        amount = parseInt(amountStr.replace(/,/g, ''));
      }

      if (isNaN(amount) || amount <= 0) {
        const invalidEmbed = new EmbedBuilder()
          .setColor('#FF6B6B')
          .setTitle('❌ Invalid Amount')
          .setDescription('Please provide a valid positive number or "all"!')
          .setTimestamp();

        return await interaction.editReply({ embeds: [invalidEmbed] });
      }

      if (amount > economy.balance) {
        const insufficientEmbed = new EmbedBuilder()
          .setColor('#FF6B6B')
          .setTitle('❌ Insufficient Funds')
          .setDescription(`You don't have **${amount.toLocaleString()} coins** in your wallet!\nYour wallet balance: **${economy.balance.toLocaleString()} coins**`)
          .setTimestamp();

        return await interaction.editReply({ embeds: [insufficientEmbed] });
      }

      const { error: updateError } = await supabase
        .from('economy')
        .update({
          balance: economy.balance - amount,
          bank: economy.bank + amount,
        })
        .eq('user_id', interaction.user.id)
        .eq('guild_id', interaction.guild.id);

      if (updateError) {
        const errorEmbed = new EmbedBuilder()
          .setColor('#FF6B6B')
          .setTitle('❌ Error')
          .setDescription(`Failed to deposit money: ${updateError.message}`)
          .setTimestamp();
        
        return await interaction.editReply({ embeds: [errorEmbed] });
      }

      const successEmbed = new EmbedBuilder()
        .setColor('#4CAF50')
        .setTitle('🏦 Deposit Successful!')
        .setDescription(`Successfully deposited **${amount.toLocaleString()} coins** into your bank!`)
        .addFields(
          { name: '💵 New Wallet Balance', value: `${(economy.balance - amount).toLocaleString()} coins`, inline: true },
          { name: '🏦 New Bank Balance', value: `${(economy.bank + amount).toLocaleString()} coins`, inline: true },
          { name: '💎 Total Worth', value: `${(economy.balance + economy.bank).toLocaleString()} coins`, inline: true }
        )
        .setTimestamp();

      await interaction.editReply({ embeds: [successEmbed] });

    } catch (error) {
      console.error('Deposit command error:', error);
      
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