#!/bin/bash
# BeVivia Startup Script - All-in-one setup

echo "🚀 BeVivia - Customer Churn Intelligence Platform"
echo "=================================================="
echo ""

# Check Python
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 not found. Please install Python 3.11+"
    exit 1
fi

# Check Node
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Please install Node.js 18+"
    exit 1
fi

echo "✅ Python and Node.js detected"
echo ""

# Install dependencies
echo "📦 Installing Python dependencies..."
pip install -q -r requirements.txt

echo "📦 Installing Node dependencies..."
cd frontend
npm install --quiet
cd ..

echo ""
echo "🔄 Training ML models..."
python src/train.py

echo ""
echo "✅ Setup complete!"
echo ""
echo "Starting services..."
echo "  Backend API: http://localhost:8000"
echo "  Frontend: http://localhost:3000"
echo "  API Docs: http://localhost:8000/docs"
echo ""

# Start backend
echo "🚀 Starting Backend API..."
python -m uvicorn api.main:app --host 0.0.0.0 --port 8000 &

# Wait for backend to start
sleep 3

# Start frontend
cd frontend
echo "🚀 Starting Frontend..."
npm run dev

