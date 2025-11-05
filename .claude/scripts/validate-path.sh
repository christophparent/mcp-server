#!/bin/bash
set -euo pipefail

payload=$(cat)

mapfile -t paths < <(printf '%s' "$payload" | jq -r '
  .tool_input |
  (if has("paths") then .paths[] else empty end),
  (if has("path") then .path else empty end)
' 2>/dev/null | sed '/^$/d')

if [[ ${#paths[@]} -eq 0 ]]; then
  exit 0
fi

blocked_patterns=(
  '/node_modules(/|$)'
  '/\.git(/|$)'
  '/\.env'
  '/__pycache__(/|$)'
  '/coverage(/|$)'
  '/tmp(/|$)'
)

for path in "${paths[@]}"; do
  for pattern in "${blocked_patterns[@]}"; do
    if [[ "$path" =~ $pattern ]]; then
      echo "ERROR: Read/List request targets blocked path: $path" >&2
      exit 2
    fi
  done
done

exit 0
