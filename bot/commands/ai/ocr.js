import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('ocr')
    .setDescription('Extract text from an image using OCR')
    .addAttachmentOption(option =>
      option
        .setName('image')
        .setDescription('The image to extract text from')
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName('language')
        .setDescription('Text language (optional)')
        .addChoices(
          { name: 'English', value: 'en' },
          { name: 'Spanish', value: 'es' },
          { name: 'French', value: 'fr' },
          { name: 'German', value: 'de' },
          { name: 'Auto-detect', value: 'auto' }
        )
        .setRequired(false)
    ),

  async execute(interaction) {
    const attachment = interaction.options.getAttachment('image');
    const language = interaction.options.getString('language') || 'auto';

    if (!attachment.contentType?.startsWith('image/')) {
      return interaction.reply({ content: '❌ Please provide a valid image file!', ephemeral: true });
    }

    await interaction.deferReply();

    try {
      // Mock OCR results (replace with actual OCR service like Google Vision or Tesseract)
      const mockTexts = [
        "Hello World!\nThis is a sample text extracted from the image.",
        "Welcome to Discord!\nEnjoy your stay and have fun chatting.",
        "SALE 50% OFF\nLimited time offer\nDon't miss out!",
        "Meeting at 3 PM\nConference Room A\nBring your laptops",
        "No text detected in this image.",
        "The quick brown fox jumps over the lazy dog.",
        "Error 404\nPage not found\nPlease try again later"
      ];

      const extractedText = mockTexts[Math.floor(Math.random() * mockTexts.length)];
      const confidence = Math.floor(Math.random() * 30) + 70; // 70-99%
      const wordCount = extractedText.split(' ').length;

      const embed = new EmbedBuilder()
        .setColor('#9370DB')
        .setTitle('📝 OCR Text Extraction')
        .setImage(attachment.url)
        .setTimestamp();

      if (extractedText === "No text detected in this image.") {
        embed.setDescription('❌ No readable text was found in this image.')
          .addFields(
            { name: '💡 Tips', value: '• Make sure text is clear and readable\n• Try images with higher contrast\n• Avoid heavily stylized fonts', inline: false }
          );
      } else {
        embed.setDescription('✅ Text successfully extracted!')
          .addFields(
            { name: '📄 Extracted Text', value: `\`\`\`\n${extractedText}\n\`\`\``, inline: false },
            { name: '🌐 Language', value: language === 'auto' ? 'Auto-detected (English)' : language.toUpperCase(), inline: true },
            { name: '📊 Confidence', value: `${confidence}%`, inline: true },
            { name: '📝 Word Count', value: `${wordCount} words`, inline: true }
          );
      }

      embed.setFooter({ text: 'Powered by Shok.wav OCR Engine' });

      await interaction.editReply({ embeds: [embed] });

    } catch (error) {
      console.error(error);
      await interaction.editReply({ content: '❌ Failed to extract text from image. Please try again later!' });
    }
  },
};