#!/bin/bash

# Script to push code to GitHub repository
# Repository: https://github.com/daalodaalo123-bit/snapsuuq

echo "🚀 Pushing Snapsuuq Cargo Tracking System to GitHub..."
echo ""

# Navigate to project directory
cd "$(dirname "$0")"

# Initialize git (if not already done)
if [ ! -d .git ]; then
    echo "📦 Initializing git repository..."
    git init
fi

# Add all files
echo "➕ Adding files to git..."
git add .

# Commit
echo "💾 Creating commit..."
git commit -m "Initial commit: Snapsuuq Cargo Tracking System - Full stack application with React frontend and Node.js backend"

# Add remote (if not already added)
if ! git remote | grep -q origin; then
    echo "🔗 Adding remote repository..."
    git remote add origin https://github.com/daalodaalo123-bit/snapsuuq.git
else
    echo "🔗 Remote already exists, updating..."
    git remote set-url origin https://github.com/daalodaalo123-bit/snapsuuq.git
fi

# Set branch to main
echo "🌿 Setting branch to main..."
git branch -M main

# Push to GitHub
echo "📤 Pushing to GitHub..."
echo ""
echo "⚠️  You will be prompted for GitHub credentials:"
echo "   - Username: daalodaalo123-bit"
echo "   - Password: Use Personal Access Token (not your GitHub password)"
echo ""
git push -u origin main

echo ""
echo "✅ Done! Check your repository at: https://github.com/daalodaalo123-bit/snapsuuq"

