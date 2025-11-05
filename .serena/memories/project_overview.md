# Agentset MCP Server - Project Overview

## Purpose
MCP server for Agentset, an open-source platform for Retrieval-Augmented Generation (RAG). Provides knowledge base search and retrieval capabilities for document-based AI applications.

## Key Features
- **Knowledge base retrieval** - Search and retrieve documents from Agentset namespaces
- **RAG integration** - Seamless integration with Agentset platform
- **Multi-namespace support** - Configure different namespaces (EMCO products, AHRI certifications)
- **Reranking** - Optional result reranking for better relevance
- **Tenant support** - Multi-tenant knowledge base access

## Tech Stack
- **Runtime:** Node.js >= 20.18.0
- **Package Manager:** pnpm 9.15.4
- **Language:** TypeScript 5.7.3
- **Module System:** ES Modules (type: "module")
- **Build Tool:** tsup 8.0.2

## Dependencies
- **@modelcontextprotocol/sdk** (^1.12.3) - MCP server framework
- **agentset** (^1.3.0) - Agentset SDK for RAG
- **commander** (^13.1.0) - CLI argument parsing
- **node-fetch** (^3.3.2) - HTTP client
- **zod** (^3.24.2) - Schema validation

## Development Dependencies
- **typescript** (^5.7.3) - TypeScript compiler
- **typescript-eslint** (^8.21.0) - ESLint for TypeScript
- **eslint** (^9.19.0) - Linting
- **prettier** (^3.4.2) - Code formatting
- **@changesets/cli** (^2.27.1) - Version management
- **tsup** (^8.0.2) - TypeScript bundler

## MCP Tools Provided
### Knowledge Base Tools
- `knowledge-base-retrieve` - Search knowledge base with query, topK, and rerank parameters

## CLI Arguments
- `--ns, --namespace` - Agentset namespace ID to use
- `-t, --tenant` - Agentset tenant ID (optional)
- `-d, --description` - Override default tool description
- `-v, --version` - Show version

## Environment Variables
- `AGENTSET_API_KEY` - Required API key for Agentset
- `AGENTSET_NAMESPACE_ID` - Namespace ID (can be passed via CLI)

## Project Type
Open-source (MIT License)
Published to npm as @agentset/mcp
