# 🎵 KV Shok.wav Bot - Complete Command Reference

## 🤖 Bot Status
**Playing:** "Well Developed by KVA"

## 📋 Command Categories (42+ Commands)

### 🤖 AI & Image Processing (7 Commands)
Advanced AI-powered image tools inspired by Assyst bot.

| Command | Description | Usage |
|---------|-------------|-------|
| `/caption` | Generate funny captions for images | `/caption image:[file] style:[funny/meme/roast/wholesome/genz]` |
| `/describe` | AI-powered image description | `/describe image:[file] detail:[basic/detailed/creative]` |
| `/ocr` | Extract text from images | `/ocr image:[file] language:[en/es/fr/de/auto]` |
| `/enhance` | AI image upscaling | `/enhance image:[file] scale:[2x/4x/8x] type:[general/anime/photo/face]` |
| `/generate` | Generate images from text | `/generate prompt:[description] style:[realistic/anime/digital] size:[512x512/1024x1024]` |
| `/analyze` | Deep image analysis | `/analyze image:[file] focus:[general/faces/objects/colors/text/emotions]` |
| `/memeify` | Add meme text to images | `/memeify image:[file] top_text:[text] bottom_text:[text] template:[drake/distracted]` |

### 💰 Economy System (5 Commands)
Virtual currency system with banking features.

| Command | Description | Usage |
|---------|-------------|-------|
| `/balance` | Check your or another user's balance | `/balance user:[optional]` |
| `/daily` | Claim daily reward | `/daily` |
| `/work` | Work to earn money | `/work` |
| `/deposit` | Deposit money to bank | `/deposit amount:[number]` |
| `/withdraw` | Withdraw money from bank | `/withdraw amount:[number]` |

### 🎮 Fun & Games (5 Commands)
Entertainment and interactive commands.

| Command | Description | Usage |
|---------|-------------|-------|
| `/8ball` | Ask the magic 8-ball | `/8ball question:[your question]` |
| `/coinflip` | Flip a coin | `/coinflip` |
| `/joke` | Get a random joke | `/joke` |
| `/meme` | Get a random meme | `/meme` |
| `/roll` | Roll dice | `/roll sides:[number] count:[number]` |

### 🎓 Leveling System (4 Commands)
XP and level progression system with DM notifications.

| Command | Description | Usage | Permissions | DM Notification |
|---------|-------------|-------|-------------|-----------------|
| `/level` | Check XP and level | `/level user:[optional]` | Everyone | ❌ No |
| `/leaderboard` | Show top users by XP | `/leaderboard` | Everyone | ❌ No |
| `/addxp` | Manually add XP to user | `/addxp user:[user] amount:[number]` | Admin | ✅ Yes |
| `/removexp` | Remove XP from user | `/removexp user:[user] amount:[number]` | Admin | ✅ Yes |

### 🛡️ Moderation Tools (10 Commands)
Comprehensive server moderation system with DM notifications.

| Command | Description | Usage | Permissions | DM Notification |
|---------|-------------|-------|-------------|-----------------|
| `/ban` | Ban a user from server | `/ban user:[user] reason:[optional]` | Ban Members | ✅ Yes |
| `/kick` | Kick a user from server | `/kick user:[user] reason:[optional]` | Kick Members | ✅ Yes |
| `/mute` | Timeout a user | `/mute user:[user] duration:[minutes] reason:[optional]` | Moderate Members | ✅ Yes |
| `/unmute` | Remove user timeout | `/unmute user:[user] reason:[optional]` | Moderate Members | ✅ Yes |
| `/warn` | Warn a user | `/warn user:[user] reason:[reason]` | Moderate Members | ✅ Yes |
| `/warnings` | View user warnings | `/warnings user:[user]` | Moderate Members | ❌ No |
| `/lock` | Lock a channel | `/lock channel:[optional]` | Manage Channels | ❌ No |
| `/unlock` | Unlock a channel | `/unlock channel:[optional]` | Manage Channels | ❌ No |
| `/lockdown` | Lock entire server | `/lockdown` | Manage Channels | ❌ No |
| `/slowmode` | Set channel slowmode | `/slowmode seconds:[0-21600]` | Manage Channels | ❌ No |

### 🎫 Ticket System (4 Commands)
Support ticket management system.

| Command | Description | Usage | Permissions |
|---------|-------------|-------|-------------|
| `/ticket` | Create support ticket | `/ticket reason:[reason]` | Everyone |
| `/closeticket` | Close current ticket | `/closeticket` | Manage Channels |
| `/adduser` | Add user to ticket | `/adduser user:[user]` | Manage Channels |
| `/removeuser` | Remove user from ticket | `/removeuser user:[user]` | Manage Channels |

### 🛠️ Utility Commands (7 Commands)
General utility and information commands.

| Command | Description | Usage | Permissions |
|---------|-------------|-------|-------------|
| `/help` | Show command categories | `/help` | Everyone |
| `/test` | Test bot functionality | `/test` | Everyone |
| `/botinfo` | Show bot information | `/botinfo` | Everyone |
| `/serverinfo` | Show server information | `/serverinfo` | Everyone |
| `/userinfo` | Show user information | `/userinfo user:[optional]` | Everyone |
| `/roleinfo` | Show role information | `/roleinfo role:[role]` | Everyone |
| `/afk` | Set AFK status | `/afk reason:[optional]` | Everyone |

### 👥 Role Management (4 Commands)
Advanced role assignment system with DM notifications.

| Command | Description | Usage | Permissions | DM Notification |
|---------|-------------|-------|-------------|-----------------|
| `/addrole` | Assign role to user | `/addrole user:[user] role:[role]` | Manage Roles | ✅ Yes |
| `/removerole` | Remove role from user | `/removerole user:[user] role:[role]` | Manage Roles | ✅ Yes |
| `/nuke` | Delete & recreate channel | `/nuke channel:[optional]` | Manage Channels | ❌ No |
| `/purge` | Delete user messages | `/purge user:[user] amount:[1-100]` | Manage Messages | ❌ No |

## 🎯 Special Features

### 📨 DM Notifications
The bot automatically sends direct messages to users when they are affected by moderation or leveling actions:

**Moderation Commands with DM:**
- `/ban` - Notifies user of ban with reason and moderator
- `/kick` - Notifies user of kick with reason and moderator  
- `/mute` - Notifies user of mute with duration, reason, and moderator
- `/unmute` - Notifies user of unmute with reason and moderator
- `/warn` - Notifies user of warning with reason and total warning count

**Leveling Commands with DM:**
- `/addxp` - Notifies user of XP addition with new level and total XP
- `/removexp` - Notifies user of XP removal with new level and total XP

**Role Commands with DM:**
- `/addrole` - Notifies user when role is added
- `/removerole` - Notifies user when role is removed

*Note: If a user has DMs disabled, the action will still complete but no notification will be sent.*

### 🔄 Auto-Features
- **AFK System**: Auto-reply when mentioned while AFK
- **Level Up**: Automatic XP gain from chatting
- **Welcome Messages**: Customizable server welcomes
- **Moderation Logs**: Automatic action logging

### 🎨 Customization
- **Prefix**: Customizable command prefix
- **Messages**: Editable bot responses
- **Channels**: Configurable log/welcome channels
- **Roles**: Assignable auto-roles

### 🗄️ Database Integration
- **Economy**: Persistent balance/bank system
- **Levels**: XP and level tracking
- **Warnings**: Moderation history
- **AFK**: Status persistence
- **Settings**: Per-server configuration

## 📊 Command Statistics
- **Total Commands**: 42+
- **Categories**: 7 main categories
- **Admin Commands**: 8 commands
- **Public Commands**: 34+ commands
- **Database Commands**: 15+ commands
- **AI Commands**: 7 commands

## 🚀 Performance
- **Response Time**: <100ms average
- **Uptime**: 99.9% target
- **Servers**: Unlimited scalability
- **Commands/sec**: High throughput
- **Database**: Optimized queries

## 🔐 Permissions
Commands respect Discord's permission system:
- **Public**: Available to all users
- **Moderator**: Requires moderation permissions
- **Admin**: Requires administrator permissions
- **Owner**: Server owner only features

---
**Status: "Well Developed by KVA"**
**Made with ❤️ by KVA Team**