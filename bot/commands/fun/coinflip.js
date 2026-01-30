import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('coinflip')
    .setDescription('Flip a coin'),

  async execute(interaction) {
    const isHeads = Math.random() < 0.5;
    const result = isHeads ? 'Heads' : 'Tails';
    const emoji = isHeads ? '🟡' : '⚪';
    const color = isHeads ? '#FFD700' : '#C0C0C0';

    const embed = new EmbedBuilder()
      .setColor(color)
      .setTitle('🪙 Coin Flip')
      .setDescription(`${emoji} The coin landed on **${result}**!`)
      .addFields(
        { name: '🎯 Result', value: `**${result}**`, inline: true },
        { name: '🎲 Probability', value: '50/50', inline: true }
      )
      .setTimestamp()
      .setFooter({ text: `Flipped by ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL() });

    await interaction.reply({ embeds: [embed] });
  },
};