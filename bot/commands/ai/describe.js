import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('describe')
    .setDescription('Describe what\'s in an image using AI')
    .addAttachmentOption(option =>
      option
        .setName('image')
        .setDescription('The image to describe')
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName('detail')
        .setDescription('Level of detail')
        .addChoices(
          { name: 'Basic', value: 'basic' },
          { name: 'Detailed', value: 'detailed' },
          { name: 'Creative', value: 'creative' }
        )
        .setRequired(false)
    ),

  async execute(interaction) {
    const attachment = interaction.options.getAttachment('image');
    const detail = interaction.options.getString('detail') || 'basic';

    if (!attachment.contentType?.startsWith('image/')) {
      return interaction.reply({ content: '❌ Please provide a valid image file!', ephemeral: true });
    }

    await interaction.deferReply();

    try {
      // Mock AI description (replace with actual AI service like OpenAI Vision)
      const descriptions = {
        basic: [
          "This image shows a person in what appears to be an indoor setting.",
          "The image contains various objects and colors in a typical environment.",
          "This appears to be a photograph taken in natural lighting conditions.",
          "The image shows multiple elements arranged in a casual composition.",
          "This is a digital image with standard resolution and clarity."
        ],
        detailed: [
          "This image depicts a scene with multiple visual elements including people, objects, and environmental details. The lighting appears to be natural, creating shadows and highlights that add depth to the composition. The color palette consists of warm and cool tones that complement each other well.",
          "The photograph shows a carefully composed scene with attention to detail. Various textures and materials are visible, creating visual interest. The perspective and framing suggest this was taken with consideration for aesthetic appeal.",
          "This image contains several focal points that draw the viewer's attention. The background and foreground elements work together to create a cohesive visual narrative. The overall mood appears calm and inviting."
        ],
        creative: [
          "In this captivating visual narrative, we witness a moment frozen in time where reality meets imagination. The interplay of light and shadow dances across the frame, telling a story that words alone cannot capture.",
          "This image whispers secrets of everyday magic, where ordinary moments transform into extraordinary memories. Each pixel holds a piece of someone's story, waiting to be discovered by curious eyes.",
          "Like a window into another world, this photograph invites us to step beyond the frame and explore the emotions and experiences it contains. The visual symphony of colors and shapes creates a melody for the eyes."
        ]
      };

      const randomDescription = descriptions[detail][Math.floor(Math.random() * descriptions[detail].length)];

      // Mock additional details
      const mockDetails = {
        objects: ['person', 'furniture', 'lighting', 'background elements'],
        colors: ['warm tones', 'cool blues', 'neutral grays', 'vibrant accents'],
        mood: ['calm', 'energetic', 'mysterious', 'cheerful'][Math.floor(Math.random() * 4)],
        confidence: Math.floor(Math.random() * 20) + 80 // 80-99%
      };

      const embed = new EmbedBuilder()
        .setColor('#00CED1')
        .setTitle('🔍 AI Image Analysis')
        .setDescription(randomDescription)
        .addFields(
          { name: '🎯 Detected Objects', value: mockDetails.objects.join(', '), inline: true },
          { name: '🎨 Color Palette', value: mockDetails.colors.join(', '), inline: true },
          { name: '😊 Mood', value: mockDetails.mood, inline: true },
          { name: '📊 Confidence', value: `${mockDetails.confidence}%`, inline: true },
          { name: '📏 Detail Level', value: detail.charAt(0).toUpperCase() + detail.slice(1), inline: true },
          { name: '⚡ Processing Time', value: `${Math.floor(Math.random() * 3) + 1}s`, inline: true }
        )
        .setImage(attachment.url)
        .setFooter({ text: 'Powered by Shok.wav Vision AI' })
        .setTimestamp();

      await interaction.editReply({ embeds: [embed] });

    } catch (error) {
      console.error(error);
      await interaction.editReply({ content: '❌ Failed to analyze image. Please try again later!' });
    }
  },
};