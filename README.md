# Draw App & Connect - Monorepo

A full-stack monorepo containing collaborative drawing and real-time messaging applications built with Next.js, TypeScript, and WebSockets.

## 🌐 Live Applications

- **Drawsheet**: [https://drawsheet.yatindora.xyz/](https://drawsheet.yatindora.xyz/) - Collaborative virtual whiteboard for sketching and diagrams
- **Connect**: [https://connect.yatindora.xyz/](https://connect.yatindora.xyz/) - Real-time messaging platform for teams and friends

## 📦 What's Inside?

This Turborepo monorepo includes the following applications and packages:

### Applications

- **`draw-sheet`**: Next.js application for collaborative drawing and diagramming
  - Port: `3003`
  - Features: Real-time collaboration, hand-drawn feel, export options
  
- **`chat-app-frontend`**: Next.js application for real-time messaging (Connect)
  - Port: `3000`
  - Features: Real-time messaging, typing indicators, file sharing

- **`web`**: Additional Next.js application

- **`http-server`**: Express.js REST API server
  - Handles authentication, user management, and API endpoints

- **`ws-server`**: WebSocket server for real-time communication
  - Manages WebSocket connections for both Drawsheet and Connect

- **`worker1`** & **`worker2`**: Background worker services

### Packages

- **`@repo/ui`**: Shared React component library
- **`@repo/db`**: Prisma database package with shared models
- **`@repo/backend-common`**: Shared backend utilities and types
- **`@repo/config`**: Shared configuration files
- **`@repo/eslint-config`**: ESLint configurations for the monorepo
- **`@repo/typescript-config`**: TypeScript configurations

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Backend**: Express.js, WebSocket (ws)
- **Database**: Prisma ORM
- **Monorepo**: Turborepo
- **Package Manager**: pnpm
- **Authentication**: JWT (jose)
- **Real-time**: WebSockets

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18
- pnpm 10.15.0
- Database (configured via environment variables)

### Installation

```bash
# Install dependencies
pnpm install
```

### Environment Setup

Create `.env` files in each application directory with the required environment variables. Refer to each app's documentation for specific requirements.

### Development

Start all applications in development mode:

```bash
pnpm dev
```

Start individual services:

```bash
# Start WebSocket server
pnpm start:ws

# Start HTTP server
pnpm start:http

# Start Connect app (chat-app-frontend)
pnpm start:connect

# Start Drawsheet app
pnpm start:drawsheet
```

### Build

Build all apps and packages:

```bash
pnpm build
```

### Lint

Lint all applications:

```bash
pnpm lint
```

### Format

Format code with Prettier:

```bash
pnpm format
```

## 📁 Project Structure

```
.
├── apps/
│   ├── draw-sheet/          # Drawsheet application
│   ├── chat-app-frontend/   # Connect messaging app
│   ├── web/                  # Additional web app
│   ├── http-server/          # REST API server
│   ├── ws-server/            # WebSocket server
│   ├── worker1/              # Worker service 1
│   └── worker2/              # Worker service 2
├── packages/
│   ├── ui/                   # Shared UI components
│   ├── db/                   # Database package (Prisma)
│   ├── backend-common/       # Shared backend utilities
│   ├── config/               # Shared configurations
│   ├── eslint-config/        # ESLint configurations
│   └── typescript-config/    # TypeScript configurations
└── turbo.json                # Turborepo configuration
```

## 🔧 Useful Commands

### Port Management (Windows)

If you need to kill a process using a specific port:

```bash
# Find process using port
netstat -ano | findstr :PORT

# Kill process by PID
taskkill /PID Number /F
```

### Database

Generate Prisma client:

```bash
cd packages/db
npx prisma generate
```

Run migrations:

```bash
cd packages/db
npx prisma migrate dev
```

## 🔐 Remote Caching

> [!TIP]
> Vercel Remote Cache is free for all plans. Get started today at [vercel.com](https://vercel.com/signup?utm_source=remote-cache-sdk&utm_campaign=free_remote_cache).

Turborepo supports [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching) to share build caches across machines.

To enable Remote Caching:

```bash
# Login to Vercel
npx turbo login

# Link your Turborepo
npx turbo link
```

## 📚 Additional Resources

### Turborepo Documentation

- [Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)

## 📝 License

ISC

