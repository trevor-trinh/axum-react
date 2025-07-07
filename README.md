# Axum-React Turborepo Template

A modern fullstack application template built with Turborepo, featuring React frontend with TanStack Start (SSR) and Rust backend with Axum.

## Project Structure

```
apps/
├── frontend/          # React + TanStack Start (SSR) frontend
├── backend/           # Axum Rust API

packages/
└── api-types/         # Shared TypeScript types
```

## 🚀 Getting Started

```bash
git clone git@github.com:trevor-trinh/axum-react.git
cd axum-react

bun install
bun run backend:build

bun run dev
```

**Customize for your project:**

1. Update `package.json` files with your project details
2. Build your API endpoints in `apps/backend/src/routes/`
3. Create your UI in `apps/frontend/src/`
4. Add shared types and run `bun run generate:types`

## 🏗️ Architecture

| Layer        | Technology                        | Purpose                                     |
| ------------ | --------------------------------- | ------------------------------------------- |
| **Frontend** | React 18 + TanStack Start (SSR)  | Modern, fast UI with server-side rendering |
| **Backend**  | Rust + Axum + Serde               | High-performance API with type safety       |
| **Types**    | OpenAPI → TypeScript              | Automatic type sharing across stack         |
| **Build**    | Turborepo + Bun                   | Efficient monorepo with intelligent caching |

## Improvements

- [ ] ssr

## Prerequisites

### Frontend

```bash
# Install Node.js (via nvm - recommended)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc
nvm install --lts
nvm use --lts

# Install Bun
curl -fsSL https://bun.sh/install | bash
```

### Backend

```bash
# Install Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source ~/.cargo/env

# Install cargo-watch for hot reloading
cargo install cargo-watch
```

## Quick Start

```bash
# Clone the template
git clone git@github.com:trevor-trinh/axum-react.git
cd axum-react
bun install

# Build backend (required first time)
bun run backend:build

# Start development
bun run dev
```

Access the app at:

- Frontend (SSR): `http://localhost:3000`
- Backend API: `http://localhost:3001`
- Swagger UI: `http://localhost:3001/api/docs`

## Development Commands

```bash
# Development
bun run dev                    # Start all services
bun run frontend:dev          # Frontend only
bun run backend:dev           # Backend only

# Building
bun run build                 # Build all apps
bun run build --filter=frontend  # Build specific app

# Testing & Quality
bun run test                  # Run all tests
bun run lint                  # Lint code
bun run format                # Format code

# Type Generation
bun run generate:types        # Generate TypeScript types from backend
```

## Type Sharing

Types are automatically shared between Rust backend and TypeScript frontend:

```
Rust structs → OpenAPI spec → TypeScript types
```

### Usage:

```typescript
// Import generated types
import type { components } from "@repo/api-types";
type ApiResponse = components["schemas"]["ApiResponse"];
```

### Adding Types:

1. Define Rust struct with `#[derive(ToSchema)]`
2. Add to `generate_openapi.rs`
3. Run `bun run generate:types`

## License

MIT License - feel free to use this template for your projects!
