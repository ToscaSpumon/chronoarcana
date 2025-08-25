#!/bin/bash
# Setup script for ChronoArcana project

echo "🔮 Setting up ChronoArcana project..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Not in ChronoArcana project directory"
    echo "Please run this script from the chronoarcana folder"
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo "⚠️  Warning: .env.local file not found"
    echo "Please create .env.local with your Supabase and Stripe credentials"
    echo "See .env.local.example for the required variables"
else
    echo "✅ Environment file found"
fi

# Check Node.js version
NODE_VERSION=$(node --version)
echo "📋 Node.js version: $NODE_VERSION"

# Run type checking
echo "🔍 Running type check..."
npm run type-check

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Set up your Supabase project and database"
echo "2. Configure your Stripe account"
echo "3. Update .env.local with your credentials"
echo "4. Run 'npm run seed' to populate the database"
echo "5. Run 'npm run dev' to start development"
echo ""
echo "📚 Check docs/DEVELOPMENT.md for detailed setup instructions"
