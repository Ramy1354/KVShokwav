# 🚀 Option 1: Setup Steps - Bot Only Repository

Follow these exact steps to separate your bot and website code.

---

## Step 1: Create New GitHub Repository

1. Go to https://github.com/new
2. Fill in:
   - **Repository name**: `KVShokwav-Bot`
   - **Description**: `Discord Bot with Economy, Tickets, Moderation, and AI Features`
   - **Visibility**: Select **Public** (so Railway can access it)
   - **Initialize**: Leave unchecked (don't add README)
3. Click **Create repository**

You'll see a page with commands. **Copy the HTTPS URL** (looks like `https://github.com/yourusername/KVShokwav-Bot.git`)

---

## Step 2: Create Bot-Only Folder on Your Computer

1. Open File Explorer
2. Create a new folder: `KVShokwav-Bot` (anywhere on your computer)
3. Inside that folder, create these subfolders:
   - `bot`
   - `supabase`

---

## Step 3: Copy Bot Files

Copy these files/folders from your current `project` folder to the new `KVShokwav-Bot` folder:

### Copy entire folders:
- `project/bot/` → `KVShokwav-Bot/bot/`
- `project/supabase/migrations/` → `KVShokwav-Bot/supabase/migrations/`

### Copy individual files:
- `project/.gitignore` → `KVShokwav-Bot/.gitignore` (or use the one provided)
- `project/Procfile` → `KVShokwav-Bot/Procfile`
- `project/.env.example` → `KVShokwav-Bot/.env.example`

---

## Step 4: Add New Files to Bot Folder

In the `KVShokwav-Bot` folder, create these new files:

### File 1: `package.json`
Copy the content from `project/BOT_REPO_PACKAGE.json` and save as `KVShokwav-Bot/package.json`

### File 2: `README.md`
Copy the content from `project/BOT_REPO_README.md` and save as `KVShokwav-Bot/README.md`

### File 3: `.gitignore`
Copy the content from `project/BOT_REPO_GITIGNORE.txt` and save as `KVShokwav-Bot/.gitignore`

---

## Step 5: Verify Folder Structure

Your `KVShokwav-Bot` folder should look like this:

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
│       ├── 20260127190158_create_bot_tables.sql
│       ├── 20260129000000_add_new_tables.sql
│       └── 20260130000000_create_ticket_tables.sql
├── .env.example
├── .gitignore
├── package.json
├── Procfile
└── README.md
```

---

## Step 6: Initialize Git in Bot Folder

1. Open Command Prompt or PowerShell
2. Navigate to your `KVShokwav-Bot` folder:
   ```bash
   cd C:\path\to\KVShokwav-Bot
   ```
3. Run these commands one by one:

```bash
git init
git add .
git commit -m "Initial bot commit"
git branch -M main
git remote add origin https://github.com/yourusername/KVShokwav-Bot.git
git push -u origin main
```

**Replace `yourusername` with your actual GitHub username!**

---

## Step 7: Verify on GitHub

1. Go to https://github.com/yourusername/KVShokwav-Bot
2. You should see all your bot files uploaded
3. Check that `.env` is NOT there (it's in .gitignore)

---

## Step 8: Deploy to Railway

1. Go to https://railway.app/
2. Sign in with GitHub
3. Click **New Project**
4. Select **Deploy from GitHub repo**
5. Find and select `KVShokwav-Bot` repository
6. Click **Deploy**

Railway will ask for environment variables. Add these 4:

| Variable | Value |
|----------|-------|
| `DISCORD_TOKEN` | Your Discord bot token |
| `DISCORD_CLIENT_ID` | `1465779916518723796` |
| `VITE_SUPABASE_URL` | Your Supabase URL |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anon key |

7. Click **Deploy**
8. Wait 1-2 minutes
9. Your bot is now online 24/7! 🎉

---

## Step 9: Make Original Repository Private

1. Go to your original repository: https://github.com/yourusername/KVShokwav-Website
2. Click **Settings**
3. Scroll down to **Danger Zone**
4. Click **Make private**
5. Confirm by typing the repository name
6. Click **I understand, make this repository private**

Your website code is now private! ✅

---

## Step 10: Verify Everything Works

### Check Bot is Online:
1. Go to your Discord server
2. Look for your bot in the member list
3. It should show as online with status "Well Developed by KVA"

### Test a Command:
1. Type `/test` in any channel
2. Bot should respond with a test message

### Check Railway Dashboard:
1. Go to https://railway.app/dashboard
2. Click your project
3. Check logs for any errors
4. Verify CPU and memory usage

---

## 🎉 You're Done!

Your setup is now complete:

✅ **Public Bot Repository** - `KVShokwav-Bot`
- Hosted on GitHub
- Deployed to Railway
- Running 24/7

✅ **Private Website Repository** - `KVShokwav-Website`
- Hosted on GitHub (private)
- Deployed to Netlify
- Only you can see it

---

## 📝 Next Steps

### To Update Your Bot:
1. Make changes in your local `KVShokwav-Bot` folder
2. Run:
   ```bash
   git add .
   git commit -m "Your message here"
   git push
   ```
3. Railway automatically redeploys! 🚀

### To Update Your Website:
1. Make changes in your local `project` folder
2. Push to GitHub
3. Netlify automatically redeploys! 🚀

---

## 🆘 Troubleshooting

### Bot Not Showing Online?
- Check Railway logs for errors
- Verify all 4 environment variables are set
- Check Discord token is valid
- Restart deployment manually

### Git Commands Not Working?
- Make sure you're in the correct folder
- Check Git is installed: `git --version`
- Replace `yourusername` with your actual GitHub username

### Can't Find Repository on GitHub?
- Refresh the page
- Check you're logged in to the correct account
- Verify repository name is `KVShokwav-Bot`

---

## 💡 Pro Tips

1. **Keep your Discord token secret** - Never share it!
2. **Monitor Railway usage** - Free tier has limits
3. **Update dependencies regularly** - Keep bot secure
4. **Test before pushing** - Run bot locally first
5. **Keep backups** - GitHub is your backup

---

## 🔗 Quick Links

- **GitHub**: https://github.com/yourusername/KVShokwav-Bot
- **Railway Dashboard**: https://railway.app/dashboard
- **Discord Developer Portal**: https://discord.com/developers/applications
- **Supabase Dashboard**: https://supabase.com/dashboard

---

**Questions? Check the troubleshooting section or review the deployment guides!**

**Your bot is production-ready!** 🚀
