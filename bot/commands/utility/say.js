import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';

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
        .setDescription('Channel to send the message to (optional)')
        .setRequired(false)
    ),

  async execute(interaction) {
    try {
      const message = interaction.options.getString('message');
      const targetChannel = interaction.options.getChannel('channel') || interaction.channel;

      // Check if channel exists
      if (!targetChannel) {
        return await interaction.reply({
          content: '❌ Channel not found! Please specify a channel or use the command in a text channel.',
          ephemeral: true
        });
      }

      // Check if bot has permission to send messages in target channel
      const botPermissions = targetChannel.permissionsFor(interaction.guild.members.me);
      if (!botPermissions || !botPermissions.has(PermissionFlagsBits.SendMessages)) {
        return await interaction.reply({
          content: '❌ I don\'t have permission to send messages in that channel!',
          ephemeral: true
        });
      }

      // Filter out @everyone and @here mentions for safety
      let filteredMessage = message
        .replace(/@everyone/gi, '@\u200beveryone')
        .replace(/@here/gi, '@\u200bhere');

      // Send the message to the target channel
      await targetChannel.send(filteredMessage);

      // Confirm to the user (ephemeral so only they see it)
      const confirmMessage = targetChannel.id === interaction.channel.id 
        ? '✅ Message sent!'
        : `✅ Message sent to ${targetChannel}!`;

      await interaction.reply({
        content: confirmMessage,
        ephemeral: true
      });

    } catch (error) {
      console.error('Say command error:', error);
      
      await interaction.reply({
        content: '❌ Failed to send the message. Please try again.',
        ephemeral: true
      });
    }
  },
};