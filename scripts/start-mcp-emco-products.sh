#!/usr/bin/env bash
# EMCO Products Knowledge Base Namespace
set -euo pipefail
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
ENV_FILE="$REPO_ROOT/.env.local"
if [[ ! -f "$ENV_FILE" ]]; then
  echo "Missing .env.local; copy .env.local.example and set credentials." >&2
  exit 1
fi
# shellcheck disable=SC1090
source "$ENV_FILE"
if [[ -z "${AGENTSET_API_KEY:-}" || -z "${AGENTSET_NAMESPACE_ID:-}" ]]; then
  echo "AGENTSET_API_KEY or AGENTSET_NAMESPACE_ID not set in .env.local" >&2
  exit 1
fi
export AGENTSET_API_KEY AGENTSET_NAMESPACE_ID
exec npx @agentset/mcp "$@"
