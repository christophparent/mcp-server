# Namespace Setup Summary

**Date**: 2025-11-01

## What Was Configured

### Products Namespace (EMCO catalog)
- Env file: `.env.local`
- API key: `agentset_slRwPLavVLwOMerv`
- Namespace ID: `ns_cmftzdig10001l104zw9nzll3`
- Startup script: `scripts/start-mcp-emco-products.sh`
- npm scripts: `pnpm run mcp`, `pnpm run mcp:emco`

### AHRI Namespace (certifications)
- Env file: `.env.ahri`
- API key: `agentset_reLRQJoRvkJbhXLV`
- Namespace ID: `ns_cmhg84aeu0001js04skomqbwk`
- Startup script: `scripts/start-mcp-ahri.sh`
- npm script: `pnpm run mcp:ahri`

### Claude Desktop Example
- File: `claude-desktop-config.example.json`
- Contains two MCP server entries (`agentset-emco`, `agentset-ahri`)

### Documentation Produced
- `README_NAMESPACES.md` – quick reference
- `NAMESPACES_OVERVIEW.md` – detailed comparison
- `NAMESPACE_SETUP.md` – configuration how-to
- `AHRI_NAMESPACE_USAGE.md` – search examples for the AHRI dataset
- `FINAL_CONFIGURATION.md` – this setup snapshot

## Quick Start Commands

```bash
# Build once
pnpm build

# Launch products namespace
pnpm run mcp          # or pnpm run mcp:emco

# Launch AHRI namespace
pnpm run mcp:ahri
```

## Claude Desktop Steps

1. Open `~/Library/Application Support/Claude/claude_desktop_config.json`
2. Copy the two entries from `claude-desktop-config.example.json`
3. Restart Claude Desktop to load both MCP servers

## Available Tools

- `mcp__agentset-emco__knowledge-base-retrieve`
- `mcp__agentset-ahri__knowledge-base-retrieve`

## Next Actions

- [ ] Add any additional namespaces following the same pattern
- [ ] Re-run `pnpm build` after dependency or source changes
- [ ] Keep `.env.*` files out of version control (already covered by .gitignore)

With two discrete MCP servers you can decide, per conversation, whether to pull EMCO pricing data or AHRI certification data.
