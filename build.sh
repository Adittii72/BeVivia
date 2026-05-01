#!/bin/bash

echo "🚀 Building BeVivia Production Application..."

echo "📦 Installing backend dependencies..."
pip install -r requirements.txt

echo "📦 Installing frontend dependencies..."
cd frontend
npm install

echo "🏗️  Building frontend for production..."
npm run build

echo "✅ Build complete!"
echo "📂 Frontend build output: frontend/dist"
echo ""
echo "To start the application:"
echo "  Backend: uvicorn api.main:app --host 0.0.0.0 --port 8000"
echo "  Frontend: Serve the frontend/dist directory"
