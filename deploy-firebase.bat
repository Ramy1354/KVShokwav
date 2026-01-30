@echo off
echo ========================================
echo   KV Shok.wav Bot - Firebase Deployment
echo ========================================
echo.

echo Installing Firebase CLI...
npm install -g firebase-tools

echo.
echo Logging into Firebase...
firebase login

echo.
echo Initializing Firebase project...
firebase init hosting

echo.
echo Deploying to Firebase...
firebase deploy

echo.
echo ========================================
echo   SUCCESS! Your website is now live!
echo ========================================
echo.
pause