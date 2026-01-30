import { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType, PermissionFlagsBits } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('setup')
    .setDescription('Setup the ticket system')
    .addStringOption(option =>
      option
        .setName('name')
        .setDescription('Name for the ticket system (e.g., "Support Tickets")')
        .setRequired(true)
    )
    .addChannelOption(option =>
      option
        .setName('channel')
        .setDescription('Channel where the ticket button will be placed')
        .addChannelTypes(ChannelType.GuildText)
        .setRequired(true)
    )
    .addChannelOption(option =>
      option
        .setName('category')
        .setDescription('Category where new tickets will be created')
        .addChannelTypes(ChannelType.GuildCategory)
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    try {
      await interaction.deferReply({ ephemeral: true });

      const ticketName = interaction.options.getString('name');
      const setupChannel = interaction.options.getChannel('channel');
      const category = interaction.options.getChannel('category');

      // Create the ticket setup embed
      const setupEmbed = new EmbedBuilder()
        .setColor('#4CAF50')
        .setTitle(`🎫 ${ticketName}`)
        .setDescription('Need help? Click the button below to create a support ticket!\n\n**What happens when you create a ticket:**\n• A private channel will be created for you\n• Only you and staff can see the ticket\n• Describe your issue and wait for assistance')
        .addFields(
          { name: '📋 Guidelines', value: '• Be respectful and patient\n• Provide detailed information\n• One ticket per issue', inline: true },
          { name: '⏰ Response Time', value: 'Staff will respond as soon as possible during business hours', inline: true }
        )
        .setFooter({ text: 'Click the button below to get started!' })
        .setTimestamp();

      // Create the ticket button
      const ticketButton = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setCustomId(`create_ticket_${category.id}`)
            .setLabel('🎫 Create Ticket')
            .setStyle(ButtonStyle.Primary)
            .setEmoji('🎫')
        );

      // Send the setup message to the specified channel
      await setupChannel.send({
        embeds: [setupEmbed],
        components: [ticketButton]
      });

      // Confirmation message
      const confirmEmbed = new EmbedBuilder()
        .setColor('#4CAF50')
        .setTitle('✅ Ticket System Setup Complete!')
        .setDescription(`The ticket system has been successfully configured!`)
        .addFields(
          { name: '🎫 Ticket Name', value: ticketName, inline: true },
          { name: '📍 Setup Channel', value: setupChannel.toString(), inline: true },
          { name: '📁 Category', value: category.name, inline: true }
        )
        .setTimestamp();

      await interaction.editReply({ embeds: [confirmEmbed] });

    } catch (error) {
      console.error('Setup command error:', error);
      await interaction.editReply({
        content: '❌ Failed to setup ticket system. Please check my permissions!'
      });
    }
  },
};