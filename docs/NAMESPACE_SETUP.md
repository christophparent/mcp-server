# Multiple Namespace Configuration

This guide explains how to configure and run the two Agentset namespaces that ship with this repository. Each namespace has its own environment file, startup script, and Claude configuration so you can keep product pricing data separate from AHRI certification data.

## Namespaces at a Glance

| Namespace | Purpose | Namespace ID | Env file | npm script |
|-----------|---------|--------------|----------|------------|
| Products | EMCO products knowledge base (pricing, item numbers, descriptions) | `ns_cmftzdig10001l104zw9nzll3` | `.env.local` | `pnpm run mcp` (alias `pnpm run mcp:emco`)
| AHRI | AHRI-certified HVAC combinations (not tied to EMCO pricing) | `ns_cmhg84aeu0001js04skomqbwk` | `.env.ahri` | `pnpm run mcp:ahri`

> Tip: keep each namespace in its own MCP server entry (or Claude Desktop profile) so you can decide which knowledge base to consult per task.

## Configure Environment Files

Create the two env files – the product namespace uses `.env.local` (already in gitignore) and AHRI uses `.env.ahri`.

```bash
# .env.local – EMCO products
AGENTSET_API_KEY=agentset_slRwPLavVLwOMerv
AGENTSET_NAMESPACE_ID=ns_cmftzdig10001l104zw9nzll3

# .env.ahri – AHRI certifications
AGENTSET_API_KEY=agentset_reLRQJoRvkJbhXLV
AGENTSET_NAMESPACE_ID=ns_cmhg84aeu0001js04skomqbwk
```

## Start Each Namespace Locally

```bash
# Products (EMCO)
pnpm run mcp          # loads .env.local
# or explicitly
pnpm run mcp:emco

# AHRI
pnpm run mcp:ahri     # loads .env.ahri
```

Both scripts source the corresponding env file and exec `npx @agentset/mcp`, so you can run them side-by-side if you supply distinct ports in your MCP client configuration.

## Claude Desktop Configuration

Add two MCP servers so Claude can choose the right knowledge base. The example file `claude-desktop-config.example.json` already contains the structure below – copy the entries into your real config and adjust the paths if needed.

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

## Tool Names in Claude

- `mcp__agentset-emco__knowledge-base-retrieve` – queries the EMCO product namespace
- `mcp__agentset-ahri__knowledge-base-retrieve` – queries the AHRI certification namespace

Keeping both tools available lets you route pricing/spec questions to the right dataset without cross-contaminating answers.

## Development Workflow

1. Build once: `pnpm build`
2. Launch whichever namespace you need (`pnpm run mcp` for products, `pnpm run mcp:ahri` for certifications)
3. Use `pnpm run inspect` to explore the default namespace, or set `AGENTSET_NAMESPACE_ID`/`AGENTSET_API_KEY` inline to inspect AHRI:

   ```bash
   AGENTSET_API_KEY=agentset_reLRQJoRvkJbhXLV    AGENTSET_NAMESPACE_ID=ns_cmhg84aeu0001js04skomqbwk    pnpm dlx @modelcontextprotocol/inspector node dist/index.js
   ```

## Adding More Namespaces

If you need a third knowledge base, follow the same pattern:

1. Create `.env.<name>` with the new credentials
2. Copy `scripts/start-mcp-ahri.sh` to `scripts/start-mcp-<name>.sh`
3. Add a `"mcp:<name>"` script entry to `package.json`
4. Append another MCP server entry in your Claude Desktop config

This keeps every namespace isolated and easy to swap in and out.
