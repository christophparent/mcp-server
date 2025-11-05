# Suggested Commands - Agentset MCP

## Setup Commands
```bash
# Load correct Node version from .nvmrc
nvm use

# Enable corepack for pnpm
corepack enable

# Install dependencies (auto-runs pnpm build via prepare)
pnpm install
```

## Development Commands
```bash
# Build for production
pnpm build

# Development mode with watch
pnpm dev

# Run MCP server with EMCO namespace
pnpm mcp
# or
pnpm mcp:emco

# Run MCP server with AHRI namespace
pnpm mcp:ahri

# Inspect MCP server with MCP Inspector
pnpm inspect

# Clean build artifacts and dependencies
pnpm clean
```

## Code Quality Commands
```bash
# Run linter
pnpm lint

# Check code formatting
pnpm format

# Format code (write changes)
pnpm format:write

# Run tests
pnpm test
```

## Version Management
```bash
# Create a changeset (for version bumps)
pnpm changeset

# Version packages based on changesets
pnpm version-packages

# Publish to npm
pnpm release
```

## Running Standalone
```bash
# With namespace as CLI arg
AGENTSET_API_KEY=your-api-key npx @agentset/mcp --ns your-namespace-id

# With environment variable
AGENTSET_API_KEY=your-api-key AGENTSET_NAMESPACE_ID=your-namespace-id npx @agentset/mcp

# With custom description
AGENTSET_API_KEY=your-api-key npx @agentset/mcp --ns your-namespace-id -d "Custom description"

# With tenant ID
AGENTSET_API_KEY=your-api-key npx @agentset/mcp --ns your-namespace-id -t your-tenant-id
```

## Claude Desktop Usage
```bash
# Edit Claude Desktop config
~/Library/Application Support/Claude/claude_desktop_config.json

# Example config entry in claude-desktop-config.example.json
```

## Package Management
```bash
# Add dependency
pnpm add <package>

# Add dev dependency
pnpm add -D <package>

# Update dependencies
pnpm update

# Remove dependency
pnpm remove <package>
```

## Git & Publishing
```bash
# Check version
node -p "require('./package.json').version"

# Build and publish
pnpm build && pnpm release
```

## Testing & Debugging
```bash
# Run tests
pnpm test

# Inspect with dotenv
pnpm dlx dotenv-cli -- pnpm dlx @modelcontextprotocol/inspector node dist/index.js
```

## Node Version Management
```bash
# Use Node version from .nvmrc (20.18.0)
nvm use

# Install Node version from .nvmrc
nvm install

# Check current Node version
node --version
```
