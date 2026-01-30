# 🚀 KV Shok.wav Bot - Deployment Guide

## 📋 Prerequisites

### Required Software
- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **Git** - [Download](https://git-scm.com/)
- **Discord Application** - [Discord Developer Portal](https://discord.com/developers/applications)
- **Supabase Account** - [Supabase](https://supabase.com/)

### Required Tokens
- Discord Bot Token
- Discord Client ID
- Supabase URL
- Supabase Anon Key

## 🔧 Setup Instructions

### 1. Clone Repository
```bash
git clone https://github.com/yourusername/kv-shokwav-bot.git
cd kv-shokwav-bot
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Create `.env` file in project root:
```env
DISCORD_TOKEN=your_discord_bot_token_here
DISCORD_CLIENT_ID=your_discord_client_id_here
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Database Setup
1. Create Supabase project
2. Run migrations in `supabase/migrations/`
3. Configure database tables

### 5. Discord Bot Setup
1. Create application at [Discord Developer Portal](https://discord.com/developers/applications)
2. Create bot user
3. Copy bot token to `.env`
4. Enable necessary intents:
   - Guilds
   - Guild Messages
   - Message Content
   - Guild Members
   - Guild Moderation

### 6. OAuth Setup (Website)
1. In Discord application settings
2. Go to OAuth2 → Redirects
3. Add redirect URLs:
   - `http://localhost:5173/auth/callback` (development)
   - `https://yourdomain.com/auth/callback` (production)

## 🏃‍♂️ Running the Project

### Development Mode
```bash
# Run Discord bot
node bot/index.js

# Run website (separate terminal)
npm run dev
```

### Production Build
```bash
# Build website
npm run build

# Run bot in production
NODE_ENV=production node bot/index.js
```

## 🌐 Website Deployment Options

### Option 1: GitHub Pages (Free)
1. Push code to GitHub repository
2. Enable GitHub Pages in repository settings
3. Select "GitHub Actions" as source
4. Automatic deployment on push

### Option 2: Netlify (Free)
1. Connect GitHub repository to Netlify
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Automatic deployments

### Option 3: Vercel (Free)
1. Import GitHub repository to Vercel
2. Framework preset: Vite
3. Build command: `npm run build`
4. Output directory: `dist`

### Option 4: Manual Upload
1. Run `npm run build`
2. Upload `dist/` folder contents to web host
3. Configure server for SPA routing

## 🤖 Bot Hosting Options

### Option 1: VPS/Dedicated Server
```bash
# Install PM2 for process management
npm install -g pm2

# Start bot with PM2
pm2 start bot/index.js --name "kv-shokwav-bot"

# Save PM2 configuration
pm2 save
pm2 startup
```

### Option 2: Heroku
1. Create Heroku app
2. Add environment variables
3. Deploy via Git or GitHub integration

### Option 3: Railway
1. Connect GitHub repository
2. Add environment variables
3. Automatic deployment

### Option 4: DigitalOcean App Platform
1. Create new app from GitHub
2. Configure environment variables
3. Deploy with automatic scaling

## 🔐 Security Checklist

### Environment Variables
- ✅ Never commit `.env` to Git
- ✅ Use different tokens for development/production
- ✅ Rotate tokens regularly
- ✅ Use secure hosting for production

### Bot Permissions
- ✅ Only grant necessary permissions
- ✅ Use role-based command restrictions
- ✅ Implement rate limiting
- ✅ Validate all user inputs

### Website Security
- ✅ Use HTTPS in production
- ✅ Implement CORS properly
- ✅ Validate OAuth redirects
- ✅ Sanitize user inputs

## 📊 Monitoring & Maintenance

### Bot Monitoring
```bash
# Check bot status
pm2 status

# View bot logs
pm2 logs kv-shokwav-bot

# Restart bot
pm2 restart kv-shokwav-bot
```

### Database Maintenance
- Regular backups
- Monitor query performance
- Update migrations as needed
- Clean up old data

### Website Monitoring
- Monitor uptime
- Check performance metrics
- Update dependencies
- Review security updates

## 🐛 Troubleshooting

### Common Issues

#### Bot Won't Start
```bash
# Check Node.js version
node --version

# Verify dependencies
npm install

# Check environment variables
cat .env
```

#### Commands Not Working
- Verify bot permissions in Discord
- Check command registration in logs
- Ensure intents are enabled
- Validate database connection

#### Website Login Issues
- Check OAuth redirect URLs
- Verify Discord application settings
- Ensure environment variables are set
- Check browser console for errors

#### Database Connection Issues
- Verify Supabase URL and key
- Check network connectivity
- Review database permissions
- Validate table schemas

### Log Analysis
```bash
# Bot logs
tail -f logs/bot.log

# Website logs (if using PM2)
pm2 logs website

# System logs
journalctl -u your-service-name
```

## 📈 Scaling Considerations

### Bot Scaling
- Use clustering for multiple servers
- Implement command cooldowns
- Optimize database queries
- Consider sharding for large bots

### Website Scaling
- Use CDN for static assets
- Implement caching strategies
- Optimize bundle size
- Consider server-side rendering

## 🔄 Updates & Maintenance

### Regular Updates
1. Update dependencies monthly
2. Review security advisories
3. Test in development first
4. Deploy during low-traffic periods
5. Monitor after deployment

### Backup Strategy
- Daily database backups
- Weekly full system backups
- Test restore procedures
- Store backups securely

---

## 📞 Support

For deployment issues:
1. Check this guide first
2. Review error logs
3. Check GitHub issues
4. Contact KVA Team

**Status: "Well Developed by KVA"**
**Made with ❤️ by KVA Team**