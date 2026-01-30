@echo off
echo ========================================
echo   KV Shok.wav Bot - Surge.sh Deployment
echo ========================================
echo.

echo Installing Surge.sh globally...
npm install -g surge

echo.
echo Deploying to Surge.sh...
cd dist
surge . kv-shokwav.surge.sh

echo.
echo ========================================
echo   SUCCESS! Your website is now live at:
echo   https://kv-shokwav.surge.sh
echo ========================================
echo.
pause