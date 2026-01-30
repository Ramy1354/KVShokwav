# 🔧 Option 1 Troubleshooting Guide

Having issues? Find your problem below and follow the solution.

---

## 🚨 Git & GitHub Issues

### Problem: "git: command not found"

**Cause**: Git is not installed on your computer

**Solution**:
1. Go to https://git-scm.com/download/win
2. Download Git for Windows
3. Run the installer
4. Accept all defaults
5. Restart Command Prompt
6. Try git command again

---

### Problem: "fatal: not a git repository"

**Cause**: You're not in the correct folder

**Solution**:
1. Open Command Prompt
2. Navigate to your `KVShokwav-Bot` folder:
   ```bash
   cd C:\Users\YourName\KVShokwav-Bot
   ```
3. Verify you see the bot files:
   ```bash
   dir
   ```
4. Try git command again

---

### Problem: "fatal: remote origin already exists"

**Cause**: You already added the remote

**Solution**:
1. Remove the existing remote:
   ```bash
   git remote remove origin
   ```
2. Add it again:
   ```bash
   git remote add origin https://github.com/yourusername/KVShokwav-Bot.git
   ```
3. Try push again

---

### Problem: "Permission denied (publickey)"

**Cause**: GitHub SSH key not configured

**Solution**:
1. Use HTTPS instead of SSH
2. Make sure your remote URL is:
   ```
   https://github.com/yourusername/KVShokwav-Bot.git
   ```
   (NOT `git@github.com:...`)
3. Check with:
   ```bash
   git remote -v
   ```
4. If wrong, fix it:
   ```bash
   git remote set-url origin https://github.com/yourusername/KVShokwav-Bot.git
   ```

---

### Problem: "fatal: Authentication failed"

**Cause**: Wrong GitHub credentials

**Solution**:
1. Make sure you're logged into GitHub in your browser
2. Try pushing again
3. If still fails, generate a Personal Access Token:
   - Go to https://github.com/settings/tokens
   - Click "Generate new token"
   - Select `repo` scope
   - Copy the token
4. When prompted for password, paste the token instead

---

### Problem: "Repository not found"

**Cause**: Wrong repository URL or repository doesn't exist

**Solution**:
1. Verify repository exists on GitHub
2. Check the URL is correct:
   ```bash
   git remote -v
   ```
3. Should show:
   ```
   origin  https://github.com/yourusername/KVShokwav-Bot.git
   ```
4. If wrong, fix it:
   ```bash
   git remote set-url origin https://github.com/yourusername/KVShokwav-Bot.git
   ```

---

## 📁 File & Folder Issues

### Problem: "Cannot find bot files"

**Cause**: Files weren't copied correctly

**Solution**:
1. Check your folder structure:
   ```
   KVShokwav-Bot/
   ├── bot/
   ├── supabase/
   ├── package.json
   ├── README.md
   ├── .gitignore
   ├── Procfile
   └── .env.example
   ```
2. If missing, copy from `project/` folder
3. Verify all files are there before pushing

---

### Problem: ".env file is being tracked by Git"

**Cause**: `.env` wasn't in `.gitignore`

**Solution**:
1. Check `.gitignore` contains:
   ```
   .env
   .env.local
   ```
2. If not, add it
3. Remove `.env` from Git:
   ```bash
   git rm --cached .env
   ```
4. Commit:
   ```bash
   git commit -m "Remove .env from tracking"
   ```
5. Push:
   ```bash
   git push
   ```

---

### Problem: "node_modules folder is huge"

**Cause**: `node_modules/` wasn't in `.gitignore`

**Solution**:
1. Check `.gitignore` contains:
   ```
   node_modules/
   ```
2. If not, add it
3. Remove from Git:
   ```bash
   git rm -r --cached node_modules/
   ```
4. Commit:
   ```bash
   git commit -m "Remove node_modules from tracking"
   ```
5. Push:
   ```bash
   git push
   ```

---

## 🚀 Railway Issues

### Problem: "Bot not starting on Railway"

**Cause**: Missing or incorrect environment variables

**Solution**:
1. Go to Railway dashboard
2. Click your project
3. Click "Variables"
4. Verify all 4 variables are set:
   - `DISCORD_TOKEN` ✅
   - `DISCORD_CLIENT_ID` ✅
   - `VITE_SUPABASE_URL` ✅
   - `VITE_SUPABASE_ANON_KEY` ✅
5. Check values are correct (no extra spaces)
6. Click "Redeploy" button
7. Wait 1-2 minutes

---

### Problem: "Build failed on Railway"

**Cause**: Missing dependencies or syntax error

**Solution**:
1. Check Railway logs for error message
2. Common issues:
   - Missing `package.json` ❌
   - Wrong Node.js version ❌
   - Syntax error in code ❌
3. Fix locally:
   ```bash
   npm install
   npm start
   ```
4. Test bot runs locally
5. Push to GitHub
6. Railway auto-redeploys

---

### Problem: "Bot goes offline after 1 hour"

**Cause**: Railway free tier has memory limits

**Solution**:
1. Check Railway dashboard for crashes
2. Review logs for errors
3. Options:
   - Upgrade to paid plan
   - Optimize bot code
   - Use different hosting (Render, Replit)
4. For now, restart manually:
   - Go to Railway dashboard
   - Click "Redeploy"

---

### Problem: "Can't see Railway logs"

**Cause**: Logs not loading

**Solution**:
1. Go to Railway dashboard
2. Click your project
3. Click "Deployments" tab
4. Click latest deployment
5. Scroll down to see logs
6. Or click "View Logs" button

---

## 🤖 Discord Bot Issues

### Problem: "Bot not showing online"

**Cause**: Bot not connected to Discord

**Solution**:
1. Check Railway logs for errors
2. Verify Discord token is valid:
   - Go to Discord Developer Portal
   - Check token hasn't expired
   - Regenerate if needed
3. Update Railway environment variable
4. Redeploy
5. Wait 1-2 minutes

---

### Problem: "Commands not working"

**Cause**: Bot doesn't have permissions

**Solution**:
1. Check bot role in Discord server
2. Verify bot role has permissions:
   - Send Messages ✅
   - Embed Links ✅
   - Attach Files ✅
   - Manage Messages ✅
   - Manage Channels ✅
3. Move bot role above other roles
4. Try command again

---

### Problem: "Bot responds with 'Unknown interaction'"

**Cause**: Command took too long to respond

**Solution**:
1. Check Railway logs for errors
2. Verify Supabase connection
3. Check database is accessible
4. Optimize command code
5. Redeploy

---

### Problem: "Bot keeps crashing"

**Cause**: Error in bot code

**Solution**:
1. Check Railway logs for error message
2. Fix error locally:
   ```bash
   npm start
   ```
3. Test bot locally
4. Push to GitHub
5. Railway auto-redeploys

---

## 🔐 Environment Variable Issues

### Problem: "DISCORD_TOKEN is undefined"

**Cause**: Environment variable not set

**Solution**:
1. Go to Railway dashboard
2. Click your project
3. Click "Variables"
4. Add `DISCORD_TOKEN` with your bot token
5. Make sure there are no extra spaces
6. Click "Redeploy"

---

### Problem: "Supabase connection failed"

**Cause**: Wrong Supabase credentials

**Solution**:
1. Go to Supabase dashboard
2. Copy correct URL and key
3. Go to Railway dashboard
4. Update variables:
   - `VITE_SUPABASE_URL` = Your URL
   - `VITE_SUPABASE_ANON_KEY` = Your key
5. Make sure no extra spaces
6. Click "Redeploy"

---

### Problem: "Environment variables not loading"

**Cause**: Variables not set in Railway

**Solution**:
1. Go to Railway dashboard
2. Click your project
3. Click "Variables" tab
4. Verify all 4 variables are there
5. Check for typos in variable names
6. Make sure values are correct
7. Click "Redeploy"

---

## 🌐 GitHub Issues

### Problem: "Repository is private but should be public"

**Cause**: Wrong visibility setting

**Solution**:
1. Go to repository settings
2. Click "Settings"
3. Scroll to "Danger Zone"
4. Click "Change visibility"
5. Select "Public"
6. Confirm

---

### Problem: "Can't see files on GitHub"

**Cause**: Files weren't pushed

**Solution**:
1. Check git status:
   ```bash
   git status
   ```
2. If files are unstaged, add them:
   ```bash
   git add .
   ```
3. Commit:
   ```bash
   git commit -m "Add files"
   ```
4. Push:
   ```bash
   git push
   ```
5. Refresh GitHub page

---

### Problem: "Made original repo private but can't undo"

**Cause**: Accidentally made wrong repo private

**Solution**:
1. Go to repository settings
2. Click "Settings"
3. Scroll to "Danger Zone"
4. Click "Change visibility"
5. Select "Public"
6. Confirm

---

## 📊 Verification Issues

### Problem: "Bot shows offline in Discord"

**Cause**: Bot not connected

**Solution**:
1. Check Railway logs
2. Verify Discord token
3. Check bot is in server
4. Restart bot:
   - Go to Railway dashboard
   - Click "Redeploy"
5. Wait 1-2 minutes

---

### Problem: "Can't test /test command"

**Cause**: Bot not responding

**Solution**:
1. Verify bot is online
2. Check bot has permissions
3. Try different command
4. Check Railway logs for errors
5. Restart bot

---

## 🆘 Still Having Issues?

### Check These Resources:
1. **OPTION_1_SETUP_STEPS.md** - Detailed guide
2. **BOT_HOSTING_GUIDE.md** - Hosting help
3. **DEPLOY_TO_RAILWAY.md** - Railway help
4. **Railway Docs** - https://docs.railway.app/
5. **Discord.js Docs** - https://discord.js.org/

### Common Mistakes:
- ❌ Copying `.env` file (never do this!)
- ❌ Wrong GitHub URL
- ❌ Missing environment variables
- ❌ Bot role not above other roles
- ❌ Typos in variable names

### Pro Tips:
- ✅ Test locally before pushing
- ✅ Check logs first
- ✅ Verify all variables are set
- ✅ Use HTTPS for Git (not SSH)
- ✅ Keep Discord token secret

---

## 📞 Getting Help

If you're still stuck:

1. **Check the error message** - It usually tells you what's wrong
2. **Review the logs** - Railway and Discord.js logs are helpful
3. **Search online** - Most issues have solutions
4. **Ask in Discord communities** - Discord.js server is helpful
5. **Review the guides** - All answers are in the documentation

---

## ✅ Verification Checklist

After troubleshooting, verify:

- [ ] Git is installed
- [ ] Repository exists on GitHub
- [ ] All bot files are uploaded
- [ ] `.env` is NOT uploaded
- [ ] Railway has all 4 environment variables
- [ ] Bot is online in Discord
- [ ] `/test` command works
- [ ] No errors in Railway logs
- [ ] Original repo is private
- [ ] New repo is public

---

**You've got this! Most issues are easy to fix.** 💪

**Still stuck? Check the detailed guides or ask for help!** 🆘
