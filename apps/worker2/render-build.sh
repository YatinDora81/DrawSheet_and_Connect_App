#!/bin/bash

# Render build script for worker2
echo "🚀 Starting Worker2 build process..."

# Install dependencies from root (monorepo setup)
echo "📦 Installing dependencies..."
pnpm install --no-frozen-lockfile

# Generate Prisma client
echo "🔧 Generating Prisma client..."
cd packages/db && npx prisma generate && cd ../../apps/worker2

# Build the worker
echo "🏗️ Building Worker2..."
npx tsc -b

echo "✅ Worker2 build completed!"
