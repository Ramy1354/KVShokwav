# 🤖 Discord Bot - Separate Repository Setup

## 📋 What to Do

You want to:
- ✅ Keep Discord bot code **PUBLIC** (for deployment)
- ✅ Keep website code **PRIVATE** (classified)

## 🚀 Solution: Create a New Bot-Only Repository

### Step 1: Create New GitHub Repository

1. Go to https://github.com/new
2. Create a new repository:
   - **Name**: `KVShokwav-Bot` (or similar)
   - **Description**: "Discord Bot with Economy, Tickets, Moderation"
   - **Visibility**: **Public** (so Railway can access it)
   - **Initialize**: Don't add README (we'll add our own)

### Step 2: Copy Bot Files Only

Create a new folder on your computer:
```
KVShokwav-Bot/
├── bot/
│   ├── commands/
│   │   ├── ai/
│   │   ├── economy/
│   │   ├── fun/
│   │   ├── leveling/
│   │   ├── moderation/
│   │   ├── tickets/
│   │   └── utility/
│   └── index.js
├── supabase/
│   └── migrations/
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
├── Procfile
├── README.md
└── BOT_COMMANDS.md
```

### Step 3: Files to Copy

**Copy these from your current project:**

1. **`bot/` folder** - All bot commands and index.js
2. **`supabase/migrations/` folder** - Database migrations
3. **`package.json`** - Dependencies
4. **`package-lock.json`** - Lock file
5. **`.gitignore`** - Git ignore rules
6. **`Procfile`** - Railway configuration
7. **`.env.example`** - Environment template
8. **`BOT_COMMANDS.md`** - Command documentation
9. **`README.md`** - Bot documentation

### Step 4: Files to EXCLUDE

**Do NOT copy these:**
- ❌ `src/` folder (website code)
- ❌ `netlify/` folder (website functions)
- ❌ `vite.config.js` (website config)
- ❌ `index.html` (website)
- ❌ `.env` (contains secrets)
- ❌ `node_modules/` (will reinstall)

### Step 5: Create Bot README

Create a new `README.md` for the bot repository:

```markdown
# 🤖 KV | Shok.wav Discord Bot

A feature-rich Discord bot with economy, tickets, moderation, and more!

## 🎯 Features

- 💰 **Economy System** - Balance, daily rewards, work, bank
- 🎫 **Ticket System** - Support tickets with transcripts
- 🔨 **Moderation** - Ban, kick, mute, warn, lock channels
- 🎮 **Fun Commands** - 8ball, coinflip, roll, caption
- 🎓 **Leveling** - XP system and leaderboard
- 🤖 **AI Features** - Image captions and descriptions
- 🛠️ **Utility** - Help, info commands, say command

## 📦 Installation

1. Clone this repository
2. Install dependencies: `npm install`
3. Create `.env` file with your credentials
4. Run: `node bot/index.js`

## 🚀 Deployment

Deploy to Railway in 5 minutes:
1. Push to GitHub
2. Go to https://railway.app/
3. Connect GitHub repository
4. Add environment variables
5. Deploy!

## 📝 Environment Variables

```
DISCORD_TOKEN=your_bot_token
DISCORD_CLIENT_ID=your_client_id
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_key
```

## 📚 Commands

See `BOT_COMMANDS.md` for full command list.

## 🔗 Links

- [Discord.js Docs](https://discord.js.org/)
- [Railway Docs](https://docs.railway.app/)
- [Supabase Docs](https://supabase.com/docs)

## 📄 License

MIT License - Feel free to use and modify!
```

### Step 6: Push to GitHub

```bash
cd KVShokwav-Bot
git init
git add .
git commit -m "Initial bot commit"
git branch -M main
git remote add origin https://github.com/yourusername/KVShokwav-Bot.git
git push -u origin main
```

### Step 7: Deploy to Railway

1. Go to https://railway.app/
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Choose `KVShokwav-Bot` repository
5. Add environment variables
6. Deploy!

---

## 🔒 Keep Website Private

For your current repository with the website:

1. Go to repository settings
2. Click "Settings" → "General"
3. Scroll to "Danger Zone"
4. Click "Make private"
5. Website code is now private ✅

---

## ✅ Final Setup

### Public Repository (Bot Only):
- ✅ `KVShokwav-Bot` - Discord bot code
- ✅ Deployed to Railway
- ✅ 24/7 uptime

### Private Repository (Website):
- ✅ `KVShokwav-Website` - Website code
- ✅ Deployed to Netlify
- ✅ Only you can see it

---

## 🎯 Summary

| Repository | Visibility | Content | Deployment |
|-----------|-----------|---------|-----------|
| KVShokwav-Bot | Public | Bot code only | Railway |
| KVShokwav-Website | Private | Website code | Netlify |

---

## 📋 Checklist

- [ ] Create new GitHub repository for bot
- [ ] Copy bot files to new folder
- [ ] Create new README.md
- [ ] Push to GitHub
- [ ] Deploy to Railway
- [ ] Make original repository private
- [ ] Test bot is online
- [ ] Verify website is private

---

## 🚀 You're All Set!

Your bot is now:
- ✅ In a separate public repository
- ✅ Ready for deployment
- ✅ Easy to maintain and update
- ✅ Professional setup

Your website is:
- ✅ In a private repository
- ✅ Classified and secure
- ✅ Separate from bot code

**Perfect separation of concerns!** 🎉
