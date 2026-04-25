@echo off
REM BeVivia Startup Script for Windows

echo.
echo 🚀 BeVivia - Customer Churn Intelligence Platform
echo ==================================================
echo.

REM Check Python
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Python not found. Please install Python 3.11+
    pause
    exit /b 1
)

REM Check Node
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js not found. Please install Node.js 18+
    pause
    exit /b 1
)

echo ✅ Python and Node.js detected
echo.

REM Install dependencies
echo 📦 Installing Python dependencies...
pip install -q -r requirements.txt

echo 📦 Installing Node dependencies...
cd frontend
call npm install --quiet
cd ..

echo.
echo 🔄 Training ML models...
python src\train.py

echo.
echo ✅ Setup complete!
echo.
echo Starting services...
echo   Backend API: http://localhost:8000
echo   Frontend: http://localhost:3000
echo   API Docs: http://localhost:8000/docs
echo.

REM Start backend in new window
echo 🚀 Starting Backend API...
start "BeVivia Backend" python -m uvicorn api.main:app --host 0.0.0.0 --port 8000

REM Wait for backend to start
timeout /t 3 /nobreak

REM Start frontend
echo 🚀 Starting Frontend...
cd frontend
call npm run dev
