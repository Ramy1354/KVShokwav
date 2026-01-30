import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('test')
    .setDescription('Test command to check if the bot is working'),

  async execute(interaction) {
    const responses = [
      { title: '✅ Bot Status Check', desc: 'Bot is working perfectly!', color: '#4CAF50' },
      { title: '🚀 System Status', desc: 'All systems operational!', color: '#2196F3' },
      { title: '⚡ Performance Check', desc: 'Running smoothly!', color: '#FF9800' },
      { title: '🎯 Connection Test', desc: 'Test successful!', color: '#9C27B0' },
      { title: '💯 Health Check', desc: 'Everything looks good!', color: '#00BCD4' }
    ];

    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    
    const embed = new EmbedBuilder()
      .setColor(randomResponse.color)
      .setTitle(randomResponse.title)
      .setDescription(randomResponse.desc)
      .addFields(
        { name: '🏓 Ping', value: `${interaction.client.ws.ping}ms`, inline: true },
        { name: '⏰ Uptime', value: `<t:${Math.floor((Date.now() - interaction.client.uptime) / 1000)}:R>`, inline: true },
        { name: '🌐 Servers', value: `${interaction.client.guilds.cache.size}`, inline: true }
      )
      .setTimestamp()
      .setFooter({ text: 'Bot Test Complete' });
    
    await interaction.reply({ embeds: [embed], ephemeral: true });
  },
};