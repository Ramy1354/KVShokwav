import { SlashCommandBuilder, ChannelType } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('say')
    .setDescription('Make the bot say something')
    .addStringOption(option =>
      option
        .setName('message')
        .setDescription('The message you want the bot to say')
        .setRequired(true)
        .setMaxLength(2000)
    )
    .addChannelOption(option =>
      option
        .setName('channel')
        .setDescription('Channel to send message to')
        .setRequired(false)
        .addChannelTypes(ChannelType.GuildText)
    ),

  async execute(interaction) {
    try {
      const message = interaction.options.getString('message');
      let channel = interaction.options.getChannel('channel');

      // If no channel specified, use the channel where command was used
      if (!channel) {
        channel = interaction.channel;
      }

      if (!channel) {
        return await interaction.reply({
          content: '❌ Could not find a valid channel!',
          ephemeral: true
        });
      }

      // Filter out @everyone and @here mentions
      const filteredMessage = message
        .replace(/@everyone/gi, '@\u200beveryone')
        .replace(/@here/gi, '@\u200bhere');

      // Send message
      await channel.send(filteredMessage);

      await interaction.reply({
        content: '✅ Message sent!',
        ephemeral: true
      });

    } catch (error) {
      console.error('Say command error:', error);
      
      await interaction.reply({
        content: '❌ Failed to send the message.',
        ephemeral: true
      });
    }
  },
};