# 🤖 KV | Shok.wav Discord Bot

A feature-rich Discord bot with economy system, ticket support, moderation tools, and AI-powered features.

## ✨ Features

### 💰 Economy System
- `/balance` - Check wallet and bank balance
- `/daily` - Claim daily 1000 coins
- `/work` - Earn 200-600 coins per work session
- `/deposit <amount>` - Move coins to bank
- `/withdraw <amount>` - Move coins from bank

### 🎫 Ticket System
- `/setup <name> <channel> <category>` - Setup ticket system with button
- `/transcript <channel>` - Generate and send ticket transcripts
- `/adduser <user>` - Add user to ticket
- `/removeuser <user>` - Remove user from ticket
- **Buttons**: Create Ticket, Close Ticket, Claim Ticket (staff only)

### 🔨 Moderation
- `/ban <user> [reason]` - Ban user from server
- `/kick <user> [reason]` - Kick user from server
- `/mute <user> <time>` - Timeout user
- `/unmute <user>` - Remove timeout
- `/warn <user> [reason]` - Warn user
- `/warnings <user>` - View user warnings
- `/lock` - Lock channel
- `/unlock` - Unlock channel
- `/slowmode <seconds>` - Set channel slowmode
- `/lockdown` - Server-wide lockdown
- `/unban <user>` - Unban user

### 🎮 Fun Commands
- `/8ball <question>` - Magic 8-ball responses
- `/coinflip` - Flip a coin
- `/roll <sides>` - Roll dice
- `/joke` - Get random jokes
- `/meme` - Get random memes

### 🎓 Leveling System
- `/level` - Check your XP and level
- `/leaderboard` - View top users
- `/addxp <user> <amount>` - Add XP (admin)
- `/removexp <user> <amount>` - Remove XP (admin)

### 🤖 AI & Image Features
- `/caption <text> [image]` - Create meme-style captions
- `/describe [image]` - AI image description
- `/analyze [image]` - Deep image analysis
- `/enhance [image]` - AI image upscaling
- `/generate <prompt>` - Create images from text
- `/memeify [image]` - Add meme text to images
- `/ocr [image]` - Extract text from images

### 🛠️ Utility
- `/help` - Show all commands with categories
- `/test` - Test bot functionality
- `/say <message>` - Make bot say something
- `/botinfo` - Bot information and stats
- `/serverinfo` - Server information
- `/userinfo <user>` - User information
- `/roleinfo <role>` - Role information
- `/addrole <user> <role>` - Assign role to user
- `/removerole <user> <role>` - Remove role from user
- `/afk [reason]` - Set AFK status
- `/nuke` - Delete and recreate channel
- `/purge <amount>` - Delete messages

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- Discord bot token
- Supabase account (optional, for database features)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/KVShokwav-Bot.git
cd KVShokwav-Bot
```

2. **Install dependencies**
```bash
npm install
```

3. **Create `.env` file**
```bash
cp .env.example .env
```

4. **Add your credentials to `.env`**
```
DISCORD_TOKEN=your_bot_token_here
DISCORD_CLIENT_ID=your_client_id_here
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_key
```

5. **Run the bot**
```bash
npm start
```

## 📦 Deployment

### Deploy to Railway (Recommended)

1. **Push to GitHub**
```bash
git add .
git commit -m "Initial commit"
git push
```

2. **Go to Railway.app**
- Sign in with GitHub
- Click "New Project"
- Select "Deploy from GitHub repo"
- Choose this repository

3. **Add Environment Variables**
- `DISCORD_TOKEN` - Your Discord bot token
- `DISCORD_CLIENT_ID` - Your Discord client ID
- `VITE_SUPABASE_URL` - Your Supabase URL
- `VITE_SUPABASE_ANON_KEY` - Your Supabase anon key

4. **Deploy**
- Click Deploy
- Wait 1-2 minutes
- Bot is now online 24/7! 🎉

### Other Hosting Options

- **Render.com** - Free tier available
- **Replit** - Easy for beginners
- **VPS** - Full control (DigitalOcean, Linode)
- **Oracle Cloud** - Always free tier

## 🗄️ Database Setup (Optional)

For advanced features like persistent ticket numbers and analytics:

1. Create a Supabase account at https://supabase.com
2. Create a new project
3. Run the SQL migrations from `supabase/migrations/`
4. Add Supabase credentials to `.env`

## 📝 Configuration

### Bot Permissions
The bot requires these permissions:
- Send Messages
- Embed Links
- Attach Files
- Manage Messages
- Manage Channels
- Manage Roles
- Ban Members
- Kick Members
- Moderate Members

### Recommended Setup
1. Create a role for the bot
2. Place bot role above other roles
3. Give bot role necessary permissions
4. Create a category for tickets
5. Run `/setup` to configure ticket system

## 🔧 Development

### Project Structure
```
KVShokwav-Bot/
├── bot/
│   ├── commands/
│   │   ├── ai/           # AI features
│   │   ├── economy/      # Economy commands
│   │   ├── fun/          # Fun commands
│   │   ├── leveling/     # Leveling system
│   │   ├── moderation/   # Moderation tools
│   │   ├── tickets/      # Ticket system
│   │   └── utility/      # Utility commands
│   └── index.js          # Main bot file
├── supabase/
│   └── migrations/       # Database migrations
├── .env.example          # Environment template
├── .gitignore            # Git ignore rules
├── package.json          # Dependencies
├── Procfile              # Railway config
└── README.md             # This file
```

### Adding New Commands

1. Create a new file in `bot/commands/category/`
2. Use this template:

```javascript
import { SlashCommandBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('commandname')
    .setDescription('Command description'),
  
  async execute(interaction) {
    await interaction.reply('Response here');
  }
};
```

3. Bot automatically loads the command on restart

## 🐛 Troubleshooting

### Bot Not Starting
- Check `.env` file exists and has correct values
- Verify Discord token is valid
- Check Node.js version (18+)
- Review console logs for errors

### Bot Goes Offline
- Check Railway dashboard for crashes
- Review logs for errors
- Verify Supabase connection
- Check Discord token validity

### Commands Not Working
- Verify bot has required permissions
- Check bot role is above user roles
- Ensure bot is in the server
- Review command syntax

## 📚 Resources

- [Discord.js Documentation](https://discord.js.org/)
- [Discord Developer Portal](https://discord.com/developers/applications)
- [Railway Documentation](https://docs.railway.app/)
- [Supabase Documentation](https://supabase.com/docs)

## 📄 License

MIT License - Feel free to use and modify!

## 🤝 Support

For issues or questions:
1. Check the troubleshooting section
2. Review Discord.js documentation
3. Check Railway logs
4. Open an issue on GitHub

## 🎉 Credits

Built with ❤️ by KV | Shok.wav

---

**Enjoy your Discord bot!** 🚀
