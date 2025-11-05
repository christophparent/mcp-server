# Agentset MCP

MCP server for Agentset, an open-source platform for Retrieval-Augmented Generation (RAG). Designed for developers who want to build intelligent, document-based applications quickly and efficiently.

[![npm version][npm-badge]][npm]
[![License][license-badge]][license]
[![Build Status][build-badge]][build]
[![Downloads][downloads-badge]][npm]
[![Size][size-badge]][npm]

## Installation

using npm:

```sh
AGENTSET_API_KEY=your-api-key npx @agentset/mcp --ns your-namespace-id
```

using yarn:

```sh
AGENTSET_API_KEY=your-api-key yarn dlx @agentset/mcp --ns your-namespace-id
```

using pnpm:

```sh
AGENTSET_API_KEY=your-api-key pnpm dlx @agentset/mcp --ns your-namespace-id
```

## Local development

1. Use `nvm use` (reads `.nvmrc`) or manually install Node.js 20.18.0, then run `corepack enable` to activate pnpm.
2. Install dependencies with `pnpm install`.
3. Copy `.env.local.example` to `.env.local` and fill in your Agentset credentials.
4. Start a watch build with `pnpm dev`, or produce a production bundle with `pnpm build`.
5. Lint, format, or smoke-test the project via `pnpm lint`, `pnpm format`/`pnpm format:write`, and `pnpm test`.

Codex and Claude Code can both rely on the same scripts. For example, `pnpm dev` keeps a hot build running for Codex, and `pnpm build` followed by the MCP command refreshes Claude Code.

### Reconnect checklist

When Claude Code or Codex disconnects from the server:

1. Run `pnpm build` (or let `pnpm prepare` do this during install).
2. Run `pnpm mcp` locally, or use the Claude config entry.
3. In the IDE, execute `/mcp` to reconnect.
4. If tools changed, run `pnpm inspect` to verify the schema via MCP Inspector.

## Adding to Claude

```json
{
  "mcpServers": {
    "agentset-mcp": {
      "command": "npx",
      "args": ["-y", "@agentset/mcp@latest"],
      "env": {
        "AGENTSET_API_KEY": "agentset_xxx",
        "AGENTSET_NAMESPACE_ID": "ns_xxx"
      }
    }
  }
}
```

## Multiple Namespace Setup

This project ships with two helper scripts so you can run each knowledge base in its own MCP server. Use `pnpm run mcp` (or `pnpm run mcp:emco`) for the EMCO product catalog and `pnpm run mcp:ahri` for the AHRI certification dataset. Configure them as separate servers in Claude Desktop if you routinely switch between pricing and AHRI lookups.

## Tips

Passing namespace id as an environment variable

```sh
AGENTSET_API_KEY=your-api-key AGENTSET_NAMESPACE_ID=your-namespace-id npx @agentset/mcp
```

Passing a custom tool description

```sh
AGENTSET_API_KEY=your-api-key npx @agentset/mcp --ns your-namespace-id -d "Your custom tool description"
```

Passing a tenant id:

```sh
AGENTSET_API_KEY=your-api-key npx @agentset/mcp --ns your-namespace-id -t your-tenant-id
```

## API Reference

Visit the [full documentation](https://docs.agentset.ai) for more details.

<!-- Links -->

[docs]: https://docs.agentset.ai/
[build-badge]: https://github.com/agentset-ai/mcp-server/actions/workflows/release.yml/badge.svg
[build]: https://github.com/agentset-ai/mcp-server/actions/workflows/release.yml
[license-badge]: https://badgen.net/github/license/agentset-ai/mcp-server
[license]: https://github.com/agentset-ai/mcp-server/blob/main/LICENSE
[npm]: https://www.npmjs.com/package/@agentset/mcp
[npm-badge]: https://badgen.net/npm/v/@agentset/mcp
[downloads-badge]: https://img.shields.io/npm/dm/@agentset/mcp.svg
[size-badge]: https://badgen.net/packagephobia/publish/@agentset/mcp

## Local Usage

1. Copy the environment template and set your credentials:
   ```sh
   cp .env.local.example .env.local
   # edit .env.local and set AGENTSET_API_KEY / AGENTSET_NAMESPACE_ID
   ```
2. Build the project (only needed after dependency changes):
   ```sh
   pnpm build
   ```
3. Start the MCP server:
   ```sh
   pnpm run mcp
   ```
   The script loads `.env.local` and launches `npx @agentset/mcp`. Leave the process running while Codex or other MCP clients connect; stop with `Ctrl+C`.

> Tip: `.env.local` is ignored by git, so your keys stay local.
