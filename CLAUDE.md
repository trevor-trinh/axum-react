# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a fullstack Rust + React application built with Turborepo for monorepo management. The project is specifically focused on token minting functionality for stock tokens with an orderbook system.

### Architecture

- **Backend**: Rust with Axum web framework, providing REST API with OpenAPI documentation
- **Frontend**: React 18 with Vite, TanStack Start (SSR), and Tailwind CSS v4
- **Build System**: Turborepo with Bun as the package manager
- **Type Sharing**: Automatic type generation from Rust structs to TypeScript via OpenAPI
- **Current API**: `/api/health` (health check) and `/api/mint` (token minting with ticker validation)

## Development Commands

### Setup & Installation
```bash
bun install                    # Install all dependencies
bun run backend:build          # Build Rust backend (required first time)
```

### Development
```bash
bun run dev                    # Start all services (frontend + backend)
bun run frontend:dev           # Frontend only (port 3000)
bun run backend:dev            # Backend only (port 3001)
```

### Building
```bash
bun run build                  # Build all apps
bun run backend:build          # Build backend only
```

### Code Quality
```bash
bun run lint                   # Lint all code
bun run format                 # Format frontend code
bun run typecheck              # TypeScript type checking
bun run test                   # Run all tests
```

### Backend-Specific Commands
```bash
bun run backend:test           # Run Rust tests
cargo clippy                   # Rust linting (in apps/backend/)
cargo check                    # Rust type checking (in apps/backend/)
```

### Type Generation
```bash
bun run generate:types         # Generate TypeScript types from Rust backend
# This runs:
# 1. backend#generate:openapi (generates openapi.json from Rust code)
# 2. openapi-typescript (converts openapi.json to TypeScript types)
```

## Key Directories

- `apps/backend/` - Rust Axum API server
  - `src/routes/` - API route handlers
  - `src/services/` - Business logic
  - `src/models.rs` - Data models with OpenAPI schema derivation
  - `scripts/generate_openapi.rs` - OpenAPI spec generation
- `apps/frontend/` - React frontend
  - `src/routes/` - TanStack Router route components
  - `src/lib/` - Shared utilities
- `packages/api-types/` - Generated TypeScript types from backend

## Important Patterns

### Backend Development
- All API models must derive `ToSchema` for OpenAPI generation
- Routes are organized in `src/routes/` with a `mod.rs` file that exports route handlers
- Services contain business logic and are imported in `src/services/mod.rs`
- The main application is configured in `src/lib.rs` with CORS and Swagger UI
- Route handlers use `#[utoipa::path]` macro for OpenAPI documentation
- Services return `Result<T, E>` for error handling
- Models use Serde for JSON serialization/deserialization

### Frontend Development
- Uses TanStack Start (SSR framework) with TanStack Router for routing
- Tailwind CSS v4 for styling with automatic route generation
- Types are imported from `@repo/api-types` workspace package
- Vite configuration includes path aliases (`@/` points to frontend root)
- Frontend demonstrates API integration with health check and type-safe API calls

### Type Sharing Workflow
1. Define Rust struct with `#[derive(ToSchema)]` in `src/models.rs`
2. Add struct to OpenAPI components in `src/lib.rs` (in the `#[openapi]` macro)
3. Run `bun run generate:types` to update TypeScript types
4. Import types in frontend: `import type { components } from "@repo/api-types"`
5. Use types: `components["schemas"]["ModelName"]`

## Development URLs

- Frontend: http://localhost:3000
- Backend API: http://localhost:3001
- Swagger UI: http://localhost:3001/api/docs
- OpenAPI JSON: http://localhost:3001/api/openapi.json

## Testing

- Backend tests: `bun run backend:test` or `cargo test` in `apps/backend/`
- The project uses Rust's built-in testing framework for backend
- No frontend tests are currently set up
- No existing test files found in the project yet