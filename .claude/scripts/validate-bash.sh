#!/bin/bash
set -euo pipefail

payload=$(cat)

command_present=$(printf '%s' "$payload" | jq -e '.tool_input | has("command")') || exit 0

joined_command=$(printf '%s' "$payload" | jq -r '
  .tool_input.command |
  if type == "array" then
    map(tostring) | join(" ")
  elif type == "string" then
    .
  else
    empty
  end
')

if [[ -z "$joined_command" ]]; then
  exit 0
fi

mapfile -t args < <(printf '%s' "$payload" | jq -r '
  .tool_input.command |
  if type == "array" then .[] | tostring else empty end
')

blocked_patterns=(
  'node_modules'
  '/\.git'
  '/\.env'
  '__pycache__'
  '/coverage'
  '/tmp'
)

for pattern in "${blocked_patterns[@]}"; do
  if printf '%s' "$joined_command" | grep -qE "$pattern"; then
    echo "ERROR: Blocked directory pattern detected in command" >&2
    exit 2
  fi
done

if [[ ${#args[@]} -gt 0 ]]; then
  first_arg=${args[0]}
  case "$first_arg" in
    rg|grep|find)
      allowed_paths=("src/" "scripts/" "dist/" "README" "CHANGELOG" "LICENSE")
      match_found=false
      for arg in "${args[@]}"; do
        for allowed in "${allowed_paths[@]}"; do
          if [[ "$arg" == "$allowed"* || "$arg" == "./$allowed"* ]]; then
            match_found=true
            break 2
          fi
        done
      done
      if [[ $match_found == false ]]; then
        echo "ERROR: Search command must target a specific project directory" >&2
        exit 3
      fi
      ;;
    *) ;;
  esac
fi

exit 0
