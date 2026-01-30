# 🚀 Deploy Your Discord Bot to Railway - 5 Minute Guide

## ✅ Prerequisites (Already Done!)
- ✅ Bot code is ready
- ✅ Procfile created
- ✅ .env.example created
- ✅ .gitignore configured

## 📋 Step-by-Step Deployment

### Step 1: Push Your Code to GitHub (If Not Already)

1. Open your terminal in the project folder
2. Run these commands:
```bash
git add .
git commit -m "Prepare bot for Railway deployment"
git push
```

### Step 2: Sign Up for Railway

1. Go to **https://railway.app/**
2. Click **"Login"** or **"Start a New Project"**
3. Sign in with your **GitHub account**
4. Authorize Railway to access your repositories

### Step 3: Create New Project

1. Click **"New Project"**
2. Select **"Deploy from GitHub repo"**
3. Choose your repository: **`KVShokwav-Website`** (or whatever you named it)
4. Railway will automatically detect it's a Node.js project

### Step 4: Add Environment Variables

1. In your Railway project, click on your service
2. Go to the **"Variables"** tab
3. Click **"+ New Variable"** and add these **4 variables**:

```
DISCORD_TOKEN = MTQ2NTc3OTkxNjUxODcyMzc5Ng.G2Au5M.F8zGjcOpOEQ_ExVxqAMnn1HyO-3rEO0a4vrBEI
DISCORD_CLIENT_ID = 1465779916518723796
VITE_SUPABASE_URL = https://evawikdmcpxlxbqnikrj.supabase.co
VITE_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV2YXdpa2RtY3B4bHhicW5pa3JqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk2NTQ2MzMsImV4cCI6MjA4NTIzMDYzM30.dv2mAF0yuF3wSSvzg7Cwwnlx_9snOyYw7yu0F2L2iDQ
```

### Step 5: Configure Start Command (Important!)

1. Go to **"Settings"** tab
2. Scroll to **"Deploy"** section
3. Set **Start Command** to:
```
node bot/index.js
```

### Step 6: Deploy!

1. Railway will automatically start deploying
2. Wait 1-2 minutes for the build to complete
3. Check the **"Deployments"** tab to see progress
4. Once it says **"Success"**, your bot is live! 🎉

### Step 7: Verify Bot is Online

1. Go to your Discord server
2. Check if the bot is online (green status)
3. Try a command like `/test` or `/help`
4. If it works, you're done! 🎊

---

## 🔍 Troubleshooting

### Bot Not Starting?

1. **Check Logs:**
   - Go to Railway dashboard
   - Click on your service
   - Go to "Deployments" tab
   - Click on the latest deployment
   - Check the logs for errors

2. **Common Issues:**
   - ❌ **Invalid Token**: Regenerate Discord token
   - ❌ **Missing Variables**: Double-check all 4 environment variables
   - ❌ **Wrong Start Command**: Make sure it's `node bot/index.js`

### Bot Goes Offline After Some Time?

- Check your Railway usage in the dashboard
- Free tier has $5 credit per month
- Your bot should stay online 24/7 within limits

---

## 💰 Railway Free Tier Limits

- **$5 credit per month** (resets monthly)
- **500 hours of execution time**
- **100 GB bandwidth**
- **1 GB RAM per service**

**Your bot should easily fit within these limits!**

---

## 🔄 Updating Your Bot

When you make changes to your bot:

1. Commit and push to GitHub:
```bash
git add .
git commit -m "Update bot"
git push
```

2. Railway will **automatically redeploy**! 🚀

---

## 📊 Monitoring Your Bot

### Check Bot Status:
1. Go to Railway dashboard
2. Click on your service
3. View metrics: CPU, Memory, Network

### View Logs:
1. Go to "Deployments" tab
2. Click on active deployment
3. See real-time logs

---

## 🎯 Quick Links

- **Railway Dashboard**: https://railway.app/dashboard
- **Discord Developer Portal**: https://discord.com/developers/applications
- **Supabase Dashboard**: https://supabase.com/dashboard

---

## ✅ Checklist

Before deploying, make sure:
- [ ] Code is pushed to GitHub
- [ ] Railway account created
- [ ] Project created from GitHub repo
- [ ] All 4 environment variables added
- [ ] Start command set to `node bot/index.js`
- [ ] Deployment successful
- [ ] Bot shows online in Discord
- [ ] Commands work

---

## 🆘 Need Help?

If you run into issues:

1. **Check Railway Logs** - Most errors show up here
2. **Verify Environment Variables** - Make sure all 4 are set correctly
3. **Check Discord Token** - Regenerate if needed
4. **Review Start Command** - Must be `node bot/index.js`

---

## 🎉 Success!

Once deployed, your bot will:
- ✅ Run 24/7 automatically
- ✅ Auto-restart if it crashes
- ✅ Auto-deploy when you push to GitHub
- ✅ Stay within free tier limits

**Your bot is now professionally hosted!** 🚀

---

## 📝 Notes

- Keep your Discord token secret
- Monitor Railway usage monthly
- Update dependencies regularly
- Check logs if bot goes offline

**Enjoy your hosted Discord bot!** 🎊
