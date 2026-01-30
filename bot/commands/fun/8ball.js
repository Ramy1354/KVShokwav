import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('8ball')
    .setDescription('Ask the magic 8ball a question')
    .addStringOption(option =>
      option
        .setName('question')
        .setDescription('Your question for the 8ball')
        .setRequired(true)
    ),

  async execute(interaction) {
    const question = interaction.options.getString('question');

    const responses = [
      { text: 'Yes, definitely!', color: '#4CAF50' },
      { text: 'Without a doubt.', color: '#4CAF50' },
      { text: 'You may rely on it.', color: '#4CAF50' },
      { text: 'Most likely.', color: '#8BC34A' },
      { text: 'Outlook good.', color: '#8BC34A' },
      { text: 'Yes.', color: '#4CAF50' },
      { text: 'Signs point to yes.', color: '#8BC34A' },
      { text: 'Reply hazy, try again.', color: '#FFC107' },
      { text: 'Ask again later.', color: '#FFC107' },
      { text: 'Better not tell you now.', color: '#FFC107' },
      { text: 'Cannot predict now.', color: '#FFC107' },
      { text: 'Concentrate and ask again.', color: '#FFC107' },
      { text: "Don't count on it.", color: '#FF5722' },
      { text: 'My reply is no.', color: '#F44336' },
      { text: 'My sources say no.', color: '#F44336' },
      { text: 'Outlook not so good.', color: '#FF5722' },
      { text: 'Very doubtful.', color: '#F44336' },
    ];

    const answer = responses[Math.floor(Math.random() * responses.length)];

    const embed = new EmbedBuilder()
      .setColor(answer.color)
      .setTitle('🎱 Magic 8-Ball')
      .addFields(
        { name: '❓ Question', value: question, inline: false },
        { name: '🔮 Answer', value: answer.text, inline: false }
      )
      .setTimestamp()
      .setFooter({ text: `Asked by ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL() });

    await interaction.reply({ embeds: [embed] });
  },
};