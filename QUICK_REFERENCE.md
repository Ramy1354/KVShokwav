# ⚡ Quick Reference - Option 1 Setup

## 🎯 The Goal
Separate bot (public) and website (private) into different GitHub repositories.

---

## 📋 10-Step Process

### Step 1️⃣: Create GitHub Repo
```
https://github.com/new
Name: KVShokwav-Bot
Visibility: Public
Initialize: No
```

### Step 2️⃣: Create Local Folder
```
Create: C:\Users\YourName\KVShokwav-Bot
Subfolders: bot/, supabase/
```

### Step 3️⃣: Copy Bot Files
```
From: project/bot/          → To: KVShokwav-Bot/bot/
From: project/supabase/     → To: KVShokwav-Bot/supabase/
From: project/.gitignore    → To: KVShokwav-Bot/.gitignore
From: project/Procfile      → To: KVShokwav-Bot/Procfile
From: project/.env.example  → To: KVShokwav-Bot/.env.example
```

### Step 4️⃣: Add New Files
```
BOT_REPO_PACKAGE.json   → KVShokwav-Bot/package.json
BOT_REPO_README.md      → KVShokwav-Bot/README.md
BOT_REPO_GITIGNORE.txt  → KVShokwav-Bot/.gitignore
```

### Step 5️⃣: Verify Structure
```
KVShokwav-Bot/
├── bot/commands/
├── supabase/migrations/
├── package.json
├── README.md
├── .gitignore
├── Procfile
└── .env.example
```

### Step 6️⃣: Git Init & Push
```bash
cd C:\Users\YourName\KVShokwav-Bot
git init
git add .
git commit -m "Initial bot commit"
git branch -M main
git remote add origin https://github.com/yourusername/KVShokwav-Bot.git
git push -u origin main
```

### Step 7️⃣: Verify on GitHub
```
https://github.com/yourusername/KVShokwav-Bot
✅ All bot files uploaded
✅ .env NOT there
✅ README.md visible
```

### Step 8️⃣: Deploy to Railway
```
1. https://railway.app/
2. New Project → Deploy from GitHub
3. Select: KVShokwav-Bot
4. Add 4 environment variables:
   - DISCORD_TOKEN
   - DISCORD_CLIENT_ID = 1465779916518723796
   - VITE_SUPABASE_URL
   - VITE_SUPABASE_ANON_KEY
5. Click Deploy
6. Wait 1-2 minutes
```

### Step 9️⃣: Make Original Private
```
1. https://github.com/yourusername/KVShokwav-Website
2. Settings → Danger Zone
3. Make private
4. Confirm
```

### Step 🔟: Verify Everything
```
✅ Bot online in Discord
✅ /test command works
✅ Railway logs show no errors
✅ Original repo is private
✅ New repo is public
```

---

## 🔑 Key Files

| File | Purpose | From |
|------|---------|------|
| `package.json` | Dependencies | `BOT_REPO_PACKAGE.json` |
| `README.md` | Documentation | `BOT_REPO_README.md` |
| `.gitignore` | Git rules | `BOT_REPO_GITIGNORE.txt` |
| `Procfile` | Railway config | `project/Procfile` |
| `.env.example` | Env template | `project/.env.example` |

---

## 🔐 Environment Variables (Railway)

```
DISCORD_TOKEN=your_bot_token
DISCORD_CLIENT_ID=1465779916518723796
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_key
```

---

## 📁 What to Copy

### ✅ Copy:
- `bot/` folder
- `supabase/migrations/` folder
- `.gitignore`
- `Procfile`
- `.env.example`

### ❌ Don't Copy:
- `src/` (website)
- `netlify/` (website)
- `vite.config.js` (website)
- `index.html` (website)
- `.env` (secrets!)
- `node_modules/` (reinstalls)

---

## 🚀 Git Commands

```bash
# Initialize
git init

# Add all files
git add .

# Commit
git commit -m "Initial bot commit"

# Rename branch
git branch -M main

# Add remote
git remote add origin https://github.com/yourusername/KVShokwav-Bot.git

# Push
git push -u origin main
```

---

## 🔗 Important URLs

| Service | URL |
|---------|-----|
| GitHub New Repo | https://github.com/new |
| Your Bot Repo | https://github.com/yourusername/KVShokwav-Bot |
| Your Website Repo | https://github.com/yourusername/KVShokwav-Website |
| Railway Dashboard | https://railway.app/dashboard |
| Discord Dev Portal | https://discord.com/developers/applications |
| Supabase Dashboard | https://supabase.com/dashboard |

---

## ✅ Success Checklist

- [ ] GitHub repo created (public)
- [ ] Local folder created
- [ ] Bot files copied
- [ ] New files added
- [ ] Git initialized
- [ ] Pushed to GitHub
- [ ] Deployed to Railway
- [ ] Original repo made private
- [ ] Bot online in Discord
- [ ] Commands working

---

## 🆘 Troubleshooting

| Problem | Solution |
|---------|----------|
| Git not found | Install Git from git-scm.com |
| Can't push | Check GitHub credentials |
| Bot not online | Check Railway logs |
| Commands not working | Check bot permissions |
| Can't find repo | Refresh GitHub page |

---

## 📚 Full Guides

- **OPTION_1_SETUP_STEPS.md** - Detailed step-by-step
- **OPTION_1_CHECKLIST.md** - Track progress
- **OPTION_1_SUMMARY.md** - Overview
- **BOT_HOSTING_GUIDE.md** - Hosting options
- **DEPLOY_TO_RAILWAY.md** - Railway details

---

## 💡 Remember

✅ Keep Discord token secret
✅ Never commit `.env` to GitHub
✅ Test locally before pushing
✅ Monitor Railway usage
✅ Update dependencies regularly

---

## 🎉 Result

After completing all steps:

✅ **Public Bot Repository**
- GitHub: `KVShokwav-Bot`
- Hosting: Railway
- Status: 24/7 Online

✅ **Private Website Repository**
- GitHub: `KVShokwav-Website`
- Hosting: Netlify
- Status: Live

---

**Ready to start? Follow OPTION_1_SETUP_STEPS.md!** 🚀
