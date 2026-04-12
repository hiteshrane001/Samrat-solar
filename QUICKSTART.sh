#!/bin/bash
# Quick Start Script for Samrat Solar Platform
# Run this script from the project root directory

echo "🚀 Samrat Solar - Quick Start Setup"
echo "===================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
  echo "❌ Node.js is not installed. Please install Node.js v16+ first."
  exit 1
fi

echo "✅ Node.js found: $(node --version)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install
cd server
npm install
cd ..

echo ""
echo "✅ Dependencies installed!"
echo ""

# Create .env if it doesn't exist
if [ ! -f server/.env ]; then
  echo "📝 Creating .env from template..."
  cp server/.env.example server/.env
  echo "⚠️  Edit server/.env with your Razorpay keys before running!"
fi

echo ""
echo "✨ Setup complete! Next steps:"
echo ""
echo "1. Edit server/.env:"
echo "   - Add your Razorpay keys from https://dashboard.razorpay.com"
echo "   - Adjust MONGO_URI if not using localhost"
echo ""
echo "2. Ensure MongoDB is running:"
echo "   mongosh"
echo ""
echo "3. Seed database (one time only):"
echo "   cd server && npm run seed"
echo ""
echo "4. In one terminal, start backend:"
echo "   cd server && npm run dev"
echo ""
echo "5. In another terminal, start frontend:"
echo "   npm run dev"
echo ""
echo "6. Open http://localhost:5173 in your browser"
echo ""
echo "Default login credentials:"
echo "  Email: demo@samratsolar.com"
echo "  Password: solar123"
echo ""
echo "📖 For detailed docs, see README.md"
