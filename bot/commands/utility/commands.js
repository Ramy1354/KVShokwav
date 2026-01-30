import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('commands')
    .setDescription('Show all available bot commands')
    .addStringOption(option =>
      option
        .setName('category')
        .setDescription('Choose a specific category to view')
        .addChoices(
          { name: '🛠️ Utility', value: 'utility' },
          { name: '🔨 Moderation', value: 'moderation' },
          { name: '🎮 Fun', value: 'fun' },
          { name: '💰 Economy', value: 'economy' },
          { name: '🎓 Leveling', value: 'leveling' },
          { name: '🎟️ Tickets', value: 'tickets' },
          { name: '🤖 AI & Images', value: 'ai' }
        )
        .setRequired(false)
    ),

  async execute(interaction) {
    const category = interaction.options.getString('category');

    if (!category) {
      // Show main help menu
      const embed = new EmbedBuilder()
        .setColor('#00CED1')
        .setTitle('🎵 Shok.wav Bot - Command List')
        .setDescription('**Available Command Categories:**\n\nUse `/commands category:<name>` to see commands in each category!')
        .addFields(
          { name: '🛠️ Utility', value: 'General utility commands\n`/commands category:utility`', inline: true },
          { name: '🔨 Moderation', value: 'Server moderation tools\n`/commands category:moderation`', inline: true },
          { name: '🎮 Fun', value: 'Entertainment commands\n`/commands category:fun`', inline: true },
          { name: '💰 Economy', value: 'Virtual economy system\n`/commands category:economy`', inline: true },
          { name: '🎓 Leveling', value: 'XP and level system\n`/commands category:leveling`', inline: true },
          { name: '🎟️ Tickets', value: 'Support ticket system\n`/commands category:tickets`', inline: true },
          { name: '🤖 AI & Images', value: 'AI-powered image tools\n`/commands category:ai`', inline: true }
        )
        .setThumbnail(interaction.client.user.displayAvatarURL({ dynamic: true }))
        .setFooter({ text: 'Bot Status: "Well Developed by KVA"' })
        .setTimestamp();

      return interaction.reply({ embeds: [embed] });
    }

    // Show specific category commands
    const commandLists = {
      utility: {
        title: '🛠️ Utility Commands',
        commands: [
          '`/help` - Show help menu (currently unavailiable)',
          '`/commands` - Show this command list',
          '`/test` - Test bot functionality',
          '`/addrole <user> <role>` - Assign roles to users',
          '`/removerole <user> <role>` - Remove roles from users'
        ]
      },
      moderation: {
        title: '🔨 Moderation Commands',
        commands: [
          '`/mute <user> <duration> [reason]` - Timeout users',
          '`/unmute <user> [reason]` - Remove user timeout',
          '`/warn <user> <reason>` - Warn users',
          '`/warnings <user>` - View user warnings'
        ]
      },
      fun: {
        title: '🎮 Fun Commands',
        commands: [
          '`/8ball <question>` - Magic 8-ball responses',
          '`/coinflip` - Flip a coin',
          '`/roll [sides] [count]` - Roll dice',
          '`/joke` - Get random jokes',
          '`/meme` - Get random memes'
        ]
      },
      economy: {
        title: '💰 Economy Commands',
        commands: [
          '`/balance [user]` - Check your balance',
          '`/daily` - Claim daily rewards',
          '`/work` - Work to earn money',
          '`/deposit <amount>` - Deposit money to bank',
          '`/withdraw <amount>` - Withdraw money from bank'
        ]
      },
      leveling: {
        title: '🎓 Leveling Commands',
        commands: [
          '`/level [user]` - Check XP and level',
          '`/leaderboard` - View top users',
          '`/addxp <user> <amount>` - Add XP to user (Admin)',
          '`/removexp <user> <amount>` - Remove XP from user (Admin)'
        ]
      },
      tickets: {
        title: '🎟️ Ticket Commands',
        commands: [
          '`/ticket <reason>` - Create support ticket',
          '`/adduser <user>` - Add user to ticket'
        ]
      },
      ai: {
        title: '🤖 AI & Image Commands',
        commands: [
          '`/caption <image> [style]` - Generate funny captions',
          '`/describe <image> [detail]` - AI image description',
          '`/analyze <image> [focus]` - Deep image analysis',
          '`/enhance <image> [scale]` - AI image upscaling',
          '`/generate <prompt> [style]` - Create images from text',
          '`/memeify <image> <top_text> <bottom_text>` - Add meme text'
        ]
      }
    };

    const selectedCategory = commandLists[category];
    
    if (selectedCategory) {
      const embed = new EmbedBuilder()
        .setColor('#00CED1')
        .setTitle(selectedCategory.title)
        .setDescription(selectedCategory.commands.join('\n'))
        .setFooter({ text: 'Use /commands to return to the main menu' })
        .setTimestamp();

      await interaction.reply({ embeds: [embed] });
    }
  },
};