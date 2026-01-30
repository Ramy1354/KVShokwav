@echo off
echo ========================================
echo   KV Shok.wav Bot - GitHub Upload
echo ========================================
echo.

set /p REPO_URL="Enter your GitHub repository URL: "

if "%REPO_URL%"=="" (
    echo ERROR: No repository URL provided!
    pause
    exit /b 1
)

echo Adding remote repository...
git remote add origin %REPO_URL%

echo Setting main branch...
git branch -M main

echo Pushing to GitHub...
git push -u origin main

echo.
echo ========================================
echo   SUCCESS! Your code is now on GitHub!
echo ========================================
echo.
echo Next steps:
echo 1. Go to your repository on GitHub
echo 2. Click Settings tab
echo 3. Click Pages in left sidebar
echo 4. Under Source, select "GitHub Actions"
echo 5. Your website will be live in a few minutes!
echo.
echo Your website URL will be:
echo https://YOUR_USERNAME.github.io/kv-shokwav-bot/
echo ========================================
echo.
pause