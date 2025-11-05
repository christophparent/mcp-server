# Code Style & Conventions - Agentset MCP

## Module System
- **Type:** ES Modules (ESM)
- **Import syntax:** Use `import`/`export` (not `require`)
- **File extensions:** `.ts` for source, `.mjs` for test files

## TypeScript Configuration
### Compiler Options
- **Target:** ES2022
- **Module:** Preserve (for bundler)
- **Module Resolution:** Bundler
- **Strict mode:** Enabled
- **noUncheckedIndexedAccess:** true (strict array/object access)
- **checkJs:** true (type-check JavaScript files)
- **isolatedModules:** true (each file can be transpiled independently)

### Build Settings
- **Declaration:** true (generate .d.ts files)
- **declarationMap:** true (sourcemaps for declarations)
- **emitDeclarationOnly:** true (tsup handles transpilation)
- **Output:** dist/ directory

## Code Style
### Linting & Formatting
- **ESLint:** TypeScript-ESLint with strict rules
- **Prettier:** Opinionated code formatting with import sorting plugin
- **Import plugin:** @ianvs/prettier-plugin-sort-imports

### TypeScript Style
- **Strict type checking** - All strict options enabled
- **Explicit types** - Prefer explicit over inferred when public API
- **Const assertions** - Use `as const` for literal types
- **Zod schemas** - Use for runtime validation

## Naming Conventions
### Variables & Functions
- **camelCase** for variables and functions
  - Examples: `parseOptions`, `getVersion`, `apiKey`
- **PascalCase** for classes and types
  - Examples: `Agentset`, `McpServer`, `Command`

### Constants
- **UPPER_SNAKE_CASE** for environment-derived constants
  - Examples: `API_KEY`, `NAMESPACE_ID`

### Files
- **kebab-case** for config files: `tsconfig.json`, `eslint-types.d.ts`
- **camelCase** for source: `index.ts`, `utils.ts`

## Code Organization
### Project Structure
```
src/
├── index.ts        # Main MCP server entry point
└── utils.ts        # Helper functions (getVersion, parseOptions)
```

### Function Structure
- Utility functions in separate files
- Main server setup in index.ts
- CLI argument parsing with commander
- Async/await for all async operations

### Error Handling
- Try-catch in main() with process.exit(1)
- Descriptive error messages
- Fatal errors logged to stderr

### Logging
- All logs go to stderr
- Use console.error() for logging
- Server status messages on startup

## Documentation Style
- **README.md:** Installation, usage, examples, badges
- **CHANGELOG.md:** Changesets-based versioning
- **Namespace docs:** Multiple markdown files for namespace setup
- **TSDoc:** Use for public APIs and exported functions

## Build Process
- **tsup** - TypeScript bundler (replaces tsc)
- **Outputs:** dist/ directory with .js and .d.ts files
- **Watch mode:** `pnpm dev` for development
- **Prepare hook:** Auto-build on install

## Package Publishing
- **Registry:** npm public
- **Scope:** @agentset
- **Changesets:** For version management
- **Bin entries:** agentset-mcp and agentset-mcp-server executables
