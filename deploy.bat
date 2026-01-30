@echo off
echo ========================================
echo   KV Shok.wav Bot - GitHub Deployment
echo ========================================
echo.

echo Checking if Git is installed...
git --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Git is not installed!
    echo Please install Git from: https://git-scm.com/download/win
    echo Then run this script again.
    pause
    exit /b 1
)

echo Git is installed! ✓
echo.

echo Initializing Git repository...
git init

echo Adding all files...
git add .

echo Creating first commit...
git commit -m "Initial commit - KV Shok.wav Bot & Dashboard"

echo.
echo ========================================
echo   NEXT STEPS:
echo ========================================
echo 1. Go to https://github.com/new
echo 2. Create a new repository named: kv-shokwav-bot
echo 3. Make it PUBLIC (required for free GitHub Pages)
echo 4. Don't initialize with README
echo 5. Copy the repository URL
echo 6. Come back and run: deploy-step2.bat
echo ========================================
echo.
pause