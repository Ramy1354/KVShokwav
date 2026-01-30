import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('botinfo')
    .setDescription('Show information about the bot'),

  async execute(interaction) {
    const { client } = interaction;
    
    const embed = new EmbedBuilder()
      .setColor('#FF0000')
      .setTitle('🤖 Bot Information')
      .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
      .addFields(
        { name: '📝 Bot Name', value: client.user.tag, inline: true },
        { name: '🆔 Bot ID', value: client.user.id, inline: true },
        { name: '📅 Created', value: `<t:${Math.floor(client.user.createdTimestamp / 1000)}:R>`, inline: true },
        { name: '🌐 Servers', value: `${client.guilds.cache.size}`, inline: true },
        { name: '👥 Users', value: `${client.users.cache.size}`, inline: true },
        { name: '📊 Uptime', value: `<t:${Math.floor((Date.now() - client.uptime) / 1000)}:R>`, inline: true },
        { name: '💻 Node.js', value: process.version, inline: true },
        { name: '📚 Discord.js', value: '14.x', inline: true },
        { name: '🏓 Ping', value: `${client.ws.ping}ms`, inline: true }
      )
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};