import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { supabase } from '../../index.js';

export default {
  data: new SlashCommandBuilder()
    .setName('balance')
    .setDescription('Check your balance or another users balance')
    .addUserOption(option =>
      option
        .setName('user')
        .setDescription('The user to check balance for')
        .setRequired(false)
    ),

  async execute(interaction) {
    const user = interaction.options.getUser('user') || interaction.user;

    let { data: economy } = await supabase
      .from('economy')
      .select('*')
      .eq('user_id', user.id)
      .eq('guild_id', interaction.guild.id)
      .maybeSingle();

    if (!economy) {
      const { data: newEconomy } = await supabase
        .from('economy')
        .insert({
          user_id: user.id,
          guild_id: interaction.guild.id,
          balance: 0,
          bank: 0,
        })
        .select()
        .single();

      economy = newEconomy;
    }

    const embed = new EmbedBuilder()
      .setColor('#00FF00')
      .setTitle(`${user.username}'s Balance`)
      .addFields(
        { name: '💰 Wallet', value: `$${economy.balance.toLocaleString()}`, inline: true },
        { name: '🏦 Bank', value: `$${economy.bank.toLocaleString()}`, inline: true },
        { name: '💵 Total', value: `$${(economy.balance + economy.bank).toLocaleString()}`, inline: true }
      )
      .setThumbnail(user.displayAvatarURL({ dynamic: true }))
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};
