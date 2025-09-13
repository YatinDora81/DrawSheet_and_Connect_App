#!/bin/bash

# Render build script for worker1
echo "🚀 Starting Worker1 build process..."

# Install dependencies from root (monorepo setup)
echo "📦 Installing dependencies..."
pnpm install --no-frozen-lockfile

# Generate Prisma client
echo "🔧 Generating Prisma client..."
cd packages/db && npx prisma generate && cd ../../apps/worker1

# Build the worker
echo "🏗️ Building Worker1..."
npx tsc -b

echo "✅ Worker1 build completed!"
