#!/usr/bin/env node

import { Agentset } from 'agentset';

const AGENTSET_API_KEY = 'agentset_reLRQJoRvkJbhXLV';
const AGENTSET_NAMESPACE_ID = 'ns_cmhg84aeu0001js04skomqbwk';

const agentset = new Agentset({ apiKey: AGENTSET_API_KEY });
const ns = agentset.namespace(AGENTSET_NAMESPACE_ID);

const outdoorUnits = [
  '2MXL18QMVJUA',
  '3MXL24RMVJUA',
  '4MXL36TVJU'
];

async function searchOutdoorUnit(modelNumber) {
  console.log(`\n${'='.repeat(80)}`);
  console.log(`Searching for: ${modelNumber}`);
  console.log('='.repeat(80));

  const results = await ns.search(modelNumber, { topK: 100, rerank: true });

  const detailedResults = results.filter(r => r.text.length > 200);

  console.log(`Found ${results.length} total results, ${detailedResults.length} with details`);

  if (detailedResults.length > 0) {
    console.log(`\nFirst 5 detailed results:\n`);
    detailedResults.slice(0, 5).forEach((result, idx) => {
      console.log(`\n--- Result ${idx + 1} ---`);
      console.log(result.text.substring(0, 1200));
      if (result.text.length > 1200) console.log('...[truncated]');
    });
  }

  return detailedResults;
}

async function main() {
  const allResults = {};

  for (const outdoor of outdoorUnits) {
    const results = await searchOutdoorUnit(outdoor);
    allResults[outdoor] = results;
  }

  const fs = await import('fs');
  const outputPath = '/Users/christopherparent/Documents/GitHub/emco-mcp/outdoor_units_ahri.json';
  fs.writeFileSync(outputPath, JSON.stringify(allResults, null, 2));
  console.log(`\n\nResults saved to: ${outputPath}`);
}

main().catch(console.error);
