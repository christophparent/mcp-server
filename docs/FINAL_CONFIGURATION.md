# Agentset MCP - Final Namespace Configuration

**Date**: 2025-11-01  
**Status**: ✅ Dual-namespace setup confirmed

## Namespaces Configured

### 1. EMCO Products Namespace
- **Namespace ID**: `ns_cmftzdig10001l104zw9nzll3`
- **API Key**: `agentset_slRwPLavVLwOMerv`
- **Env File**: `.env.local`
- **Startup**: `pnpm run mcp` (alias `pnpm run mcp:emco`)
- **Script**: `scripts/start-mcp-emco-products.sh`
- **Tool Name**: `mcp__agentset-emco__knowledge-base-retrieve`
- **Focus**: Pricing, item numbers, catalog descriptions

### 2. AHRI Namespace
- **Namespace ID**: `ns_cmhg84aeu0001js04skomqbwk`
- **API Key**: `agentset_reLRQJoRvkJbhXLV`
- **Env File**: `.env.ahri`
- **Startup**: `pnpm run mcp:ahri`
- **Script**: `scripts/start-mcp-ahri.sh`
- **Tool Name**: `mcp__agentset-ahri__knowledge-base-retrieve`
- **Focus**: AHRI-certified HVAC combinations, ducted vs non-ducted pairings, SEER2/HSPF2/EER2 ratings

## Key Principle

Keep each namespace in its own MCP entry. That way, Codex/Claude can query pricing and certification data independently without mixing contexts.

## File Structure

```
agentset-mcp/
├── .env.local                    # EMCO products credentials
├── .env.ahri                     # AHRI credentials
├── scripts/
│   ├── start-mcp-emco-products.sh
│   └── start-mcp-ahri.sh
├── claude-desktop-config.example.json
└── docs… (README_NAMESPACES.md, NAMESPACE_SETUP.md, etc.)
```

## Quick Start

```bash
cd /Users/christopherparent/Documents/GitHub/agentset-mcp
pnpm build

# Products namespace
pnpm run mcp          # or pnpm run mcp:emco

# AHRI namespace
pnpm run mcp:ahri
```

## Claude Desktop Snippet

```json
{
  "mcpServers": {
    "agentset-emco": {
      "description": "EMCO products knowledge base",
      "command": "node",
      "args": ["/Users/christopherparent/Documents/GitHub/agentset-mcp/dist/index.js"],
      "env": {
        "AGENTSET_API_KEY": "agentset_slRwPLavVLwOMerv",
        "AGENTSET_NAMESPACE_ID": "ns_cmftzdig10001l104zw9nzll3"
      }
    },
    "agentset-ahri": {
      "description": "AHRI-certified HVAC product information",
      "command": "node",
      "args": ["/Users/christopherparent/Documents/GitHub/agentset-mcp/dist/index.js"],
      "env": {
        "AGENTSET_API_KEY": "agentset_reLRQJoRvkJbhXLV",
        "AGENTSET_NAMESPACE_ID": "ns_cmhg84aeu0001js04skomqbwk"
      }
    }
  }
}
```

## Usage Examples

- **Products**: “What’s the price on item 6890190?” · “List MAINLINE hydronic pumps.”
- **AHRI**: “Find AHRI combos for RXT18AVJU9.” · “Show multi-zone certificates with non-ducted indoor units.”

## Verification Checklist

- [x] `.env.local` and `.env.ahri` exist with the correct credentials
- [x] `pnpm run mcp` launches products namespace
- [x] `pnpm run mcp:ahri` launches AHRI namespace
- [x] Claude Desktop config contains two MCP entries
- [x] Documentation (README_NAMESPACES, NAMESPACE_SETUP, AHRI_NAMESPACE_USAGE) updated

You’re ready to ingest new data into each namespace independently and keep MCP sessions scoped to the correct knowledge base.
