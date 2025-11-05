# AHRI Namespace – Usage Guide

## Overview

The AHRI namespace (`ns_cmhg84aeu0001js04skomqbwk`) stores 1,123+ certified heating and cooling combinations. Use it whenever you need AHRI reference numbers, ducted vs non-ducted configuration details, or efficiency ratings. Pricing and item numbers live in the separate EMCO products namespace (`ns_cmftzdig10001l104zw9nzll3`).

### What the Dataset Contains
- AHRI reference numbers and designated tested combinations
- Outdoor/indoor model numbers plus brand and series data
- Indoor configuration tags (ducted, non-ducted, mixed)
- SEER2, HSPF2, EER2, COP, and capacity ratings (95°F, 47°F, 17°F, 5°F)
- Refrigerant type and phase information
- Certifications (Energy Star, Cold Climate, IRA eligibility)
- Regional availability (USA / Canada) and model status

## Common Search Prompts

| Intent | Example Prompt |
|--------|----------------|
| Model lookup | “Show AHRI specs for Daikin RXT18AVJU9” |
| Efficiency | “Find heat pumps with SEER2 above 20 and Cold Climate designation” |
| Configuration | “List multi-zone systems with non-ducted indoor units” |
| Certification | “Which Samsung combinations are IRA tax credit eligible?” |
| Refrigerant | “Give me all R-32 mini-split certificates” |

## Sample Result (for Samsung AR15DXDACWKXCV)
- AHRI Ref: 215222778
- Outdoor Model: Samsung AR15DXDACWKX (WindFree Max Heat)
- Indoor Model: Samsung AR15DXDABWKN
- Indoor Configuration: Non-ducted
- Cooling: 15,000 BTU/h @ 95°F
- Heating: 15,000 BTU/h @ 47°F · 14,000 BTU/h @ 17°F · 15,600 BTU/h @ 5°F
- SEER2: 23 · HSPF2: 11 · EER2: 14.55 · COP 5°F: 2.50
- Certifications: Energy Star, Cold Climate, IRA eligible
- Refrigerant: R-32 · Status: Active

## Integration with MCP

Add the AHRI server entry to Claude Desktop (see `claude-desktop-config.example.json`):

```json
"agentset-ahri": {
  "description": "AHRI-certified HVAC product information",
  "command": "node",
  "args": ["/Users/christopherparent/Documents/GitHub/agentset-mcp/dist/index.js"],
  "env": {
    "AGENTSET_API_KEY": "agentset_reLRQJoRvkJbhXLV",
    "AGENTSET_NAMESPACE_ID": "ns_cmhg84aeu0001js04skomqbwk"
  }
}
```

Once connected you can invoke the tool `mcp__agentset-ahri__knowledge-base-retrieve` directly:

```
/mcp mcp__agentset-ahri__knowledge-base-retrieve query="List AHRI refs for Mainline ducted indoor units"
```

## Best Practices

1. **Pick the right namespace** – use AHRI for certification questions, EMCO for pricing.
2. **Include model numbers** – e.g., “RXL15WMVJU9 AHRI certificate” returns the exact combination.
3. **State the metric** – asking for “cooling capacity at 95°F” or “SEER2” yields structured highlights.
4. **Filter by configuration** – mention “ducted”, “non-ducted”, or “mixed” to leverage the new tags.
5. **Cite outputs** – the tool response includes the AHRI reference number for downstream documentation.

For a side-by-side comparison of all namespaces, see [NAMESPACES_OVERVIEW.md](./NAMESPACES_OVERVIEW.md).
