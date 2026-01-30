# Discord Bot Hosting Guide

## 🚀 Best Hosting Options for Your Discord Bot

### 1. **Railway.app** (Recommended - Free Tier Available)
**Best for: Easy setup, free tier, automatic deployments**

#### Setup Steps:
1. Go to https://railway.app/
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your bot repository
5. Add environment variables:
   - `DISCORD_TOKEN`
   - `DISCORD_CLIENT_ID`
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
6. Railway will auto-detect Node.js and deploy!

#### Pros:
- ✅ $5 free credit per month (enough for small bots)
- ✅ Automatic deployments from GitHub
- ✅ Easy environment variable management
- ✅ Built-in logs and monitoring

#### Cons:
- ❌ Free tier has usage limits
- ❌ Bot sleeps after credit runs out

---

### 2. **Render.com** (Free Tier)
**Best for: Completely free hosting**

#### Setup Steps:
1. Go to https://render.com/
2. Sign up with GitHub
3. Click "New" → "Web Service"
4. Connect your GitHub repository
5. Configure:
   - **Build Command**: `npm install`
   - **Start Command**: `node bot/index.js`
6. Add environment variables in the dashboard
7. Deploy!

#### Pros:
- ✅ Completely free tier
- ✅ Automatic deployments
- ✅ No credit card required

#### Cons:
- ❌ Free tier spins down after 15 minutes of inactivity
- ❌ Slower cold starts

---

### 3. **Heroku** (Paid - $5/month)
**Best for: Reliable 24/7 hosting**

#### Setup Steps:
1. Go to https://heroku.com/
2. Create account and install Heroku CLI
3. In your project folder:
```bash
heroku login
heroku create your-bot-name
git push heroku main
heroku config:set DISCORD_TOKEN=your_token
heroku config:set DISCORD_CLIENT_ID=your_client_id
heroku config:set VITE_SUPABASE_URL=your_supabase_url
heroku config:set VITE_SUPABASE_ANON_KEY=your_supabase_key
```

#### Pros:
- ✅ Very reliable
- ✅ 24/7 uptime
- ✅ Easy scaling

#### Cons:
- ❌ No free tier anymore ($5/month minimum)

---

### 4. **Replit** (Free with limitations)
**Best for: Quick testing and development**

#### Setup Steps:
1. Go to https://replit.com/
2. Create a new Repl
3. Import from GitHub
4. Add secrets (environment variables) in the Secrets tab
5. Click "Run"

#### Pros:
- ✅ Free tier available
- ✅ Built-in code editor
- ✅ Easy to use

#### Cons:
- ❌ Bot may sleep when inactive
- ❌ Limited resources on free tier
- ❌ Requires "Always On" ($7/month) for 24/7

---

### 5. **VPS (DigitalOcean, Linode, Vultr)** (Paid - $5-10/month)
**Best for: Full control and multiple bots**

#### Setup Steps:
1. Create a VPS (Ubuntu recommended)
2. SSH into your server
3. Install Node.js:
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```
4. Clone your repository:
```bash
git clone https://github.com/yourusername/your-bot-repo.git
cd your-bot-repo
npm install
```
5. Create `.env` file with your credentials
6. Install PM2 to keep bot running:
```bash
sudo npm install -g pm2
pm2 start bot/index.js --name discord-bot
pm2 startup
pm2 save
```

#### Pros:
- ✅ Full control
- ✅ Can host multiple bots
- ✅ True 24/7 uptime
- ✅ Better performance

#### Cons:
- ❌ Requires server management knowledge
- ❌ Monthly cost ($5-10)

---

### 6. **Oracle Cloud Free Tier** (Free Forever)
**Best for: Free VPS with generous limits**

#### Setup Steps:
1. Sign up at https://cloud.oracle.com/
2. Create a free tier VM instance (ARM or AMD)
3. Follow VPS setup steps above
4. Configure firewall rules if needed

#### Pros:
- ✅ Completely free forever
- ✅ Generous resources (4 ARM cores, 24GB RAM)
- ✅ Full control like VPS

#### Cons:
- ❌ Complex setup for beginners
- ❌ Requires credit card for verification

---

## 🎯 My Recommendation

### For You: **Railway.app**

**Why?**
1. ✅ **Easy Setup** - Just connect GitHub and deploy
2. ✅ **Free Tier** - $5 credit per month (enough for your bot)
3. ✅ **Auto-Deploy** - Push to GitHub = automatic deployment
4. ✅ **Environment Variables** - Easy to manage
5. ✅ **Logs** - Built-in monitoring

### Quick Railway Setup:

1. **Prepare your repository:**
   - Make sure all your bot code is pushed to GitHub
   - Ensure `package.json` has the correct start script

2. **Create `Procfile`** (optional but recommended):
```
worker: node bot/index.js
```

3. **Deploy to Railway:**
   - Go to https://railway.app/
   - Click "Start a New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository
   - Add environment variables
   - Deploy!

4. **Monitor:**
   - Check logs in Railway dashboard
   - Bot should be online 24/7 (within free tier limits)

---

## 📊 Comparison Table

| Service | Cost | Uptime | Ease of Use | Auto-Deploy |
|---------|------|--------|-------------|-------------|
| Railway | Free ($5 credit) | 24/7* | ⭐⭐⭐⭐⭐ | ✅ |
| Render | Free | Sleeps | ⭐⭐⭐⭐ | ✅ |
| Heroku | $5/month | 24/7 | ⭐⭐⭐⭐⭐ | ✅ |
| Replit | Free/Paid | Sleeps | ⭐⭐⭐⭐⭐ | ❌ |
| VPS | $5-10/month | 24/7 | ⭐⭐ | ❌ |
| Oracle Cloud | Free | 24/7 | ⭐⭐ | ❌ |

*Within usage limits

---

## 🔧 Files Needed for Deployment

Make sure these files are in your repository:

1. **`package.json`** - Already exists ✅
2. **`.env.example`** - Template for environment variables
3. **`Procfile`** (for Heroku/Railway) - Optional but recommended
4. **`.gitignore`** - Make sure `.env` is ignored ✅

---

## 🚨 Important Notes

1. **Never commit `.env` file** - It contains sensitive tokens!
2. **Use environment variables** - Set them in hosting dashboard
3. **Keep bot token secret** - Regenerate if exposed
4. **Monitor usage** - Check logs regularly
5. **Update dependencies** - Keep packages up to date

---

## 💡 Need Help?

If you want me to help you set up Railway or any other hosting service, just let me know! I can:
- Create the necessary configuration files
- Guide you through the deployment process
- Help troubleshoot any issues

Would you like me to prepare your bot for Railway deployment?
