import { SlashCommandBuilder } from 'discord.js';

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
    ),

  async execute(interaction) {
    try {
      await interaction.deferReply({ ephemeral: true });

      const message = interaction.options.getString('message');
      const channel = interaction.channel;

      if (!channel) {
        return await interaction.editReply({
          content: '❌ Could not find channel!'
        });
      }

      // Filter out @everyone and @here mentions
      const filteredMessage = message
        .replace(/@everyone/gi, '@\u200beveryone')
        .replace(/@here/gi, '@\u200bhere');

      // Send message
      await channel.send(filteredMessage);

      await interaction.editReply({
        content: '✅ Message sent!'
      });

    } catch (error) {
      console.error('Say command error:', error);
      
      try {
        await interaction.editReply({
          content: '❌ Failed to send the message.'
        });
      } catch (e) {
        console.error('Failed to send error reply:', e);
      }
    }
  },
};