import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('roll')
    .setDescription('Roll a dice')
    .addIntegerOption(option =>
      option
        .setName('sides')
        .setDescription('Number of sides on the dice')
        .setRequired(false)
        .setMinValue(2)
        .setMaxValue(100)
    ),

  async execute(interaction) {
    const sides = interaction.options.getInteger('sides') || 6;
    const result = Math.floor(Math.random() * sides) + 1;

    // Different colors based on result
    let color = '#4CAF50';
    if (result === 1) color = '#F44336';
    else if (result === sides) color = '#FFD700';
    else if (result <= sides * 0.3) color = '#FF9800';
    else if (result >= sides * 0.7) color = '#2196F3';

    const embed = new EmbedBuilder()
      .setColor(color)
      .setTitle('🎲 Dice Roll')
      .setDescription(`You rolled a **${result}** out of ${sides}!`)
      .addFields(
        { name: '🎯 Result', value: `**${result}**`, inline: true },
        { name: '🎲 Dice Type', value: `D${sides}`, inline: true },
        { name: '📊 Percentage', value: `${((result / sides) * 100).toFixed(1)}%`, inline: true }
      )
      .setTimestamp()
      .setFooter({ text: `Rolled by ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL() });

    await interaction.reply({ embeds: [embed] });
  },
};