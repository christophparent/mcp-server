# Quick Reference: Multiple Namespaces

## Available Namespaces

### 1. EMCO Products Namespace
- **Purpose**: EMCO products knowledge base
- **Namespace ID**: `ns_cmftzdig10001l104zw9nzll3`
- **Run**: `pnpm run mcp` or `pnpm run mcp:emco`
- **Config**: `.env.local`

### 2. AHRI Namespace
- **Purpose**: AHRI-certified HVAC product information (NOT associated with EMCO)
- **Namespace ID**: `ns_cmhg84aeu0001js04skomqbwk`
- **Run**: `pnpm run mcp:ahri`
- **Config**: `.env.ahri`
- **Data**: 1,123+ AHRI certifications with specifications, ratings, and compatibility

## Common Commands

```bash
# Build the project (required after code changes)
pnpm build

# Start EMCO products namespace
pnpm run mcp
# or
pnpm run mcp:emco

# Start AHRI namespace
pnpm run mcp:ahri

# Inspect EMCO namespace
pnpm run inspect

# Inspect AHRI namespace
AGENTSET_API_KEY=agentset_reLRQJoRvkJbhXLV \
AGENTSET_NAMESPACE_ID=ns_cmhg84aeu0001js04skomqbwk \
pnpm dlx @modelcontextprotocol/inspector node dist/index.js
```

## Claude Desktop Setup

Copy the configuration from `claude-desktop-config.example.json` to your Claude Desktop config to enable both namespaces simultaneously.

For detailed setup instructions, see [NAMESPACE_SETUP.md](./NAMESPACE_SETUP.md).
