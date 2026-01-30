import { SlashCommandBuilder, PermissionFlagsBits, ChannelType } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('nuke')
    .setDescription('Delete and recreate the current channel')
    .addChannelOption(option =>
      option
        .setName('channel')
        .setDescription('The channel to nuke (defaults to current channel)')
        .addChannelTypes(ChannelType.GuildText)
        .setRequired(false)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),

  async execute(interaction) {
    // Check if user has manage channels permissions
    if (!interaction.member.permissions.has(PermissionFlagsBits.ManageChannels)) {
      return interaction.reply({
        content: '❌ You need **Manage Channels** permissions to use this command!',
        ephemeral: true
      });
    }

    const channel = interaction.options.getChannel('channel') || interaction.channel;

    if (channel.type !== ChannelType.GuildText) {
      return interaction.reply({ content: '❌ This command can only be used in text channels!', ephemeral: true });
    }

    await interaction.reply({ content: '💣 Nuking channel in 3 seconds...', ephemeral: true });

    setTimeout(async () => {
      try {
        const newChannel = await channel.clone();
        await newChannel.setPosition(channel.position);
        await channel.delete();
        
        await newChannel.send('💥 **Channel has been nuked!** 💥\nAll messages have been cleared.');
      } catch (error) {
        console.error(error);
      }
    }, 3000);
  },
};