# Agentset MCP - Namespaces Overview

This repository maintains two MCP entry points so you can choose between the EMCO product pricing dataset and the AHRI certification dataset.

## 1. EMCO Products Namespace

- **Namespace ID**: `ns_cmftzdig10001l104zw9nzll3`
- **API Key**: `agentset_slRwPLavVLwOMerv`
- **Env File**: `.env.local`
- **Startup Script**: `pnpm run mcp` (alias `pnpm run mcp:emco`)
- **Tool Name**: `mcp__agentset-emco__knowledge-base-retrieve`
- **Use For**: Pricing, item numbers, catalog names, marketing copy

## 2. AHRI Namespace

- **Namespace ID**: `ns_cmhg84aeu0001js04skomqbwk`
- **API Key**: `agentset_reLRQJoRvkJbhXLV`
- **Env File**: `.env.ahri`
- **Startup Script**: `pnpm run mcp:ahri`
- **Tool Name**: `mcp__agentset-ahri__knowledge-base-retrieve`
- **Use For**: AHRI-certified heating/cooling combinations, ducted vs non-ducted pairings, SEER2/HSPF2/EER2 ratings, IRA eligibility

> The AHRI namespace is intentionally separate so certification answers never leak pricing data (and vice versa).

## Claude Desktop Example

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

## Typical Queries

| Namespace | Example Prompts |
|-----------|----------------|
| EMCO Products | `"What is the list price for item 6890190?"`<br>`"Show me all EMCO tankless heaters in stock."` |
| AHRI | `"Find AHRI combinations for RXT18AVJU9."`<br>`"List multi-zone systems with non-ducted indoor units."` |

## Related Docs

- [NAMESPACE_SETUP.md](./NAMESPACE_SETUP.md)
- [README_NAMESPACES.md](./README_NAMESPACES.md)
- [AHRI_NAMESPACE_USAGE.md](./AHRI_NAMESPACE_USAGE.md)
- [FINAL_CONFIGURATION.md](./FINAL_CONFIGURATION.md)
