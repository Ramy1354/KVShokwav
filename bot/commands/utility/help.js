import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Show all available commands organized by category')
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
        .setTitle('🎵 Shok.wav Bot - Help Menu')
        .setDescription('**Available Command Categories:**\n\nUse `/help category:<name>` to see commands in each category!')
        .addFields(
          { name: '🛠️ Utility', value: 'General utility commands\n`/help category:utility`', inline: true },
          { name: '🔨 Moderation', value: 'Server moderation tools\n`/help category:moderation`', inline: true },
          { name: '🎮 Fun', value: 'Entertainment commands\n`/help category:fun`', inline: true },
          { name: '💰 Economy', value: 'Virtual economy system\n`/help category:economy`', inline: true },
          { name: '🎓 Leveling', value: 'XP and level system\n`/help category:leveling`', inline: true },
          { name: '🎟️ Tickets', value: 'Support ticket system\n`/help category:tickets`', inline: true },
          { name: '🤖 AI & Images', value: 'AI-powered image tools\n`/help category:ai`', inline: true }
        )
        .setThumbnail(interaction.client.user.displayAvatarURL({ dynamic: true }))
        .setFooter({ text: 'Bot Status: "Well Developed by KVA"' })
        .setTimestamp();

      return interaction.reply({ embeds: [embed] });
    }

    // Show specific category commands
    const commandLists = {
      utility: {
        title: '�️ Utility Commands',
        description: 'General utility and server management commands',
        commands: [
          '`/help` - Show this help menu',
          '`/test` - Test bot functionality',
          '`/addrole <user> <role>` - Assign roles to users',
          '`/removerole <user> <role>` - Remove roles from users',
          '`/serverinfo` - Show server information',
          '`/userinfo [user]` - Show user information',
          '`/roleinfo <role>` - Show role information',
          '`/botinfo` - Show bot information',
          '`/afk [reason]` - Set AFK status',
          '`/nuke [channel]` - Delete and recreate channel',
          '`/purge <user> [amount]` - Delete user messages'
        ]
      },
      moderation: {
        title: '🔨 Moderation Commands',
        description: 'Server moderation and safety tools',
        commands: [
          '`/ban <user> [reason]` - Ban users from server',
          '`/kick <user> [reason]` - Kick users from server',
          '`/mute <user> <duration> [reason]` - Timeout users',
          '`/unmute <user> [reason]` - Remove user timeout',
          '`/warn <user> <reason>` - Warn users',
          '`/warnings <user>` - View user warnings',
          '`/lock [channel]` - Lock channels',
          '`/unlock [channel]` - Unlock channels',
          '`/slowmode <seconds> [channel]` - Set channel slowmode',
          '`/lockdown <action>` - Server-wide lockdown'
        ]
      },
      fun: {
        title: '🎮 Fun Commands',
        description: 'Entertainment and games',
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
        description: 'Virtual currency and banking system',
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
        description: 'XP system and leaderboards',
        commands: [
          '`/level [user]` - Check XP and level',
          '`/leaderboard` - View top users',
          '`/addxp <user> <amount>` - Add XP to user (Admin)',
          '`/removexp <user> <amount>` - Remove XP from user (Admin)'
        ]
      },
      tickets: {
        title: '🎟️ Ticket Commands',
        description: 'Support ticket management system',
        commands: [
          '`/ticket <reason>` - Create support ticket',
          '`/closeticket` - Close current ticket',
          '`/adduser <user>` - Add user to ticket',
          '`/removeuser <user>` - Remove user from ticket'
        ]
      },
      ai: {
        title: '🤖 AI & Image Commands',
        description: 'AI-powered image processing and generation',
        commands: [
          '`/caption <image> [style]` - Generate funny captions',
          '`/describe <image> [detail]` - AI image description',
          '`/analyze <image> [focus]` - Deep image analysis',
          '`/enhance <image> [scale]` - AI image upscaling',
          '`/generate <prompt> [style]` - Create images from text',
          '`/memeify <image> <top_text> <bottom_text>` - Add meme text',
          '`/ocr <image> [language]` - Extract text from images'
        ]
      }
    };

    const selectedCategory = commandLists[category];
    
    if (selectedCategory) {
      const embed = new EmbedBuilder()
        .setColor('#00CED1')
        .setTitle(selectedCategory.title)
        .setDescription(`${selectedCategory.description}\n\n${selectedCategory.commands.join('\n')}`)
        .setFooter({ text: 'Use /help to return to the main menu • <required> [optional]' })
        .setTimestamp();

      await interaction.reply({ embeds: [embed] });
    } else {
      await interaction.reply({ content: '❌ Invalid category selected!', ephemeral: true });
    }
  },
};