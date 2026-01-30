import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('meme')
    .setDescription('Get a random meme'),

  async execute(interaction) {
    await interaction.deferReply();

    try {
      const response = await fetch('https://meme-api.com/gimme');
      const data = await response.json();

      const embed = new EmbedBuilder()
        .setColor('#FF6B6B')
        .setTitle(data.title)
        .setImage(data.url)
        .setFooter({ text: `👍 ${data.ups} | r/${data.subreddit}` })
        .setTimestamp();

      await interaction.editReply({ embeds: [embed] });
    } catch (error) {
      await interaction.editReply({
        content: 'Failed to fetch a meme. Try again later!',
      });
    }
  },
};
