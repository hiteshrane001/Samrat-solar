@echo off
REM Quick Start Script for Samrat Solar Platform (Windows)
REM Run this script from the project root directory

echo.
echo 🚀 Samrat Solar - Quick Start Setup
echo ====================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
  echo ❌ Node.js is not installed. Please install Node.js v16+ first.
  pause
  exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo ✅ Node.js found: %NODE_VERSION%
echo.

REM Install dependencies
echo 📦 Installing dependencies...
call npm.cmd install
cd server
call npm.cmd install
cd ..

echo.
echo ✅ Dependencies installed!
echo.

REM Create .env if it doesn't exist
if not exist "server\.env" (
  echo 📝 Creating .env from template...
  copy server\.env.example server\.env
  echo ⚠️  Edit server\.env with your Razorpay keys before running!
  echo    Open server\.env and fill in RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET
)

echo.
echo ✨ Setup complete! Next steps:
echo.
echo 1. Edit server\.env:
echo    - Get Razorpay keys from https://dashboard.razorpay.com/app/settings/api-keys
echo    - Update RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET
echo    - Adjust MONGO_URI if not using localhost
echo.
echo 2. Ensure MongoDB is running:
echo    mongosh
echo.
echo 3. Seed database (one time only):
echo    cd server ^&^& npm run seed
echo.
echo 4. Open two terminals. In first, start backend:
echo    cd server ^&^& npm run dev
echo.
echo 5. In second terminal, start frontend:
echo    npm run dev
echo.
echo 6. Open http://localhost:5173 in your browser
echo.
echo Default login credentials:
echo   Email: demo@samratsolar.com
echo   Password: solar123
echo.
echo 📖 For detailed docs, see README.md
echo.
pause
