#!/bin/bash
# Automatic Git push script

# Set username/email (optional, if not already set)
git config user.name "martin-1998-dot"
git config user.email "sinathimpande32@gmail.com"

# Add all changes
git add .

# Commit with a message (use the first argument or default)
MESSAGE=${1:-"Automatic commit"}
git commit -m "$MESSAGE"

# Push to main branch
git push origin main

echo "✅ Changes pushed successfully!"
