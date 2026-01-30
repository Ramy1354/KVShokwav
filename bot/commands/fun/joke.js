import { SlashCommandBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('joke')
    .setDescription('Get a random joke'),

  async execute(interaction) {
    const jokes = [
      "Why don't scientists trust atoms? Because they make up everything!",
      "Why did the scarecrow win an award? He was outstanding in his field!",
      "Why don't eggs tell jokes? They'd crack each other up!",
      "What do you call a fake noodle? An impasta!",
      "Why did the bicycle fall over? It was two-tired!",
      "What do you call a bear with no teeth? A gummy bear!",
      "Why couldn't the bicycle stand up? It was two tired!",
      "What's the best thing about Switzerland? I don't know, but the flag is a big plus!",
    ];

    const joke = jokes[Math.floor(Math.random() * jokes.length)];

    await interaction.reply({
      content: `😂 ${joke}`,
    });
  },
};
