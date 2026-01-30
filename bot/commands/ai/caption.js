import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('caption')
    .setDescription('Add a caption to an image')
    .addStringOption(option =>
      option
        .setName('text')
        .setDescription('The text to add to the image')
        .setRequired(true)
        .setMaxLength(200)
    )
    .addAttachmentOption(option =>
      option
        .setName('image')
        .setDescription('The image to add caption to (optional)')
        .setRequired(false)
    )
    .addStringOption(option =>
      option
        .setName('style')
        .setDescription('Caption style')
        .addChoices(
          { name: 'POV', value: 'pov' },
          { name: 'Nobody/Everybody', value: 'nobody' },
          { name: 'Me When', value: 'mewhen' },
          { name: 'This You?', value: 'thisyou' },
          { name: 'Custom', value: 'custom' }
        )
        .setRequired(false)
    ),

  async execute(interaction) {
    try {
      await interaction.deferReply();

      const text = interaction.options.getString('text');
      const attachment = interaction.options.getAttachment('image');
      const style = interaction.options.getString('style') || 'custom';

      let imageUrl = null;
      
      if (attachment) {
        // Check if attachment is an image
        if (!attachment.contentType?.startsWith('image/')) {
          return await interaction.editReply({ 
            content: '❌ Please provide a valid image file!' 
          });
        }
        imageUrl = attachment.url;
      }

      // Format text based on style
      let formattedText;
      switch (style) {
        case 'pov':
          formattedText = `**P.O.V:** ${text}`;
          break;
        case 'nobody':
          formattedText = `**Nobody:**\n**Absolutely nobody:**\n**Me:** ${text}`;
          break;
        case 'mewhen':
          formattedText = `**Me when** ${text}`;
          break;
        case 'thisyou':
          formattedText = `**This you?** ${text}`;
          break;
        default:
          formattedText = text;
      }

      const embed = new EmbedBuilder()
        .setColor('#FF69B4')
        .setTitle('📝 Meme Caption')
        .setDescription(formattedText);

      // Add image if provided
      if (imageUrl) {
        embed.setImage(imageUrl);
      } else {
        // Use a default meme template
        const defaultImages = [
          'https://i.imgflip.com/1bij.jpg', // Drake pointing
          'https://i.imgflip.com/30b1gx.jpg', // Drake no/yes
          'https://i.imgflip.com/1g8my4.jpg', // Distracted boyfriend
          'https://i.imgflip.com/26am.jpg', // Surprised Pikachu
          'https://i.imgflip.com/1otk96.jpg', // Distracted boyfriend
        ];
        const randomImage = defaultImages[Math.floor(Math.random() * defaultImages.length)];
        embed.setImage(randomImage);
      }

      embed
        .setFooter({ text: 'Meme created by KV | Shok.wav' })
        .setTimestamp();

      await interaction.editReply({ embeds: [embed] });

    } catch (error) {
      console.error('Caption command error:', error);
      
      const errorEmbed = new EmbedBuilder()
        .setColor('#FF6B6B')
        .setTitle('❌ Caption Failed')
        .setDescription('Could not create the caption. Please try again!')
        .setTimestamp();

      await interaction.editReply({ embeds: [errorEmbed] });
    }
  },
};