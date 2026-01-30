import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('memeify')
    .setDescription('Add meme text to an image')
    .addAttachmentOption(option =>
      option
        .setName('image')
        .setDescription('The image to memeify')
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName('top_text')
        .setDescription('Text for the top of the image')
        .setRequired(false)
    )
    .addStringOption(option =>
      option
        .setName('bottom_text')
        .setDescription('Text for the bottom of the image')
        .setRequired(false)
    )
    .addStringOption(option =>
      option
        .setName('template')
        .setDescription('Use a meme template')
        .addChoices(
          { name: 'Drake Pointing', value: 'drake' },
          { name: 'Distracted Boyfriend', value: 'distracted' },
          { name: 'Woman Yelling at Cat', value: 'woman_cat' },
          { name: 'This is Fine', value: 'fine' },
          { name: 'Galaxy Brain', value: 'brain' },
          { name: 'Custom', value: 'custom' }
        )
        .setRequired(false)
    ),

  async execute(interaction) {
    const attachment = interaction.options.getAttachment('image');
    const topText = interaction.options.getString('top_text');
    const bottomText = interaction.options.getString('bottom_text');
    const template = interaction.options.getString('template') || 'custom';

    if (!attachment.contentType?.startsWith('image/')) {
      return interaction.reply({ content: '❌ Please provide a valid image file!', ephemeral: true });
    }

    if (!topText && !bottomText && template === 'custom') {
      return interaction.reply({ content: '❌ Please provide at least some text or select a template!', ephemeral: true });
    }

    await interaction.deferReply();

    try {
      // Mock meme generation (in real implementation, you'd use image processing libraries)
      const memeTemplates = {
        drake: {
          topText: topText || "Old way of doing things",
          bottomText: bottomText || "New improved method"
        },
        distracted: {
          topText: topText || "Me",
          bottomText: bottomText || "New shiny thing"
        },
        woman_cat: {
          topText: topText || "Me explaining something",
          bottomText: bottomText || "My brain understanding it"
        },
        fine: {
          topText: topText || "Everything is fine",
          bottomText: bottomText || "This is fine"
        },
        brain: {
          topText: topText || "Small brain",
          bottomText: bottomText || "Galaxy brain"
        },
        custom: {
          topText: topText || "",
          bottomText: bottomText || ""
        }
      };

      const selectedTemplate = memeTemplates[template];
      
      const embed = new EmbedBuilder()
        .setColor('#FF1493')
        .setTitle('🎭 Meme Generated!')
        .setDescription(`**Template:** ${template === 'custom' ? 'Custom' : template.charAt(0).toUpperCase() + template.slice(1)}`)
        .setImage(attachment.url)
        .setTimestamp();

      if (selectedTemplate.topText) {
        embed.addFields({ name: '⬆️ Top Text', value: `"${selectedTemplate.topText}"`, inline: true });
      }
      
      if (selectedTemplate.bottomText) {
        embed.addFields({ name: '⬇️ Bottom Text', value: `"${selectedTemplate.bottomText}"`, inline: true });
      }

      embed.addFields(
        { name: '🎨 Style', value: 'Impact Font, White Text, Black Outline', inline: true },
        { name: '📏 Format', value: 'Classic Meme Format', inline: true }
      );

      embed.setFooter({ text: '⚠️ Note: This is a preview. Actual text overlay requires image processing service.' });

      await interaction.editReply({ embeds: [embed] });

    } catch (error) {
      console.error(error);
      await interaction.editReply({ content: '❌ Failed to create meme. Please try again later!' });
    }
  },
};