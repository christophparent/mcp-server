#!/usr/bin/env node

/**
 * Search AHRI namespace for Daikin multi-zone system combinations
 * Uses the agentset SDK to query the AHRI certification database
 */

import { Agentset } from 'agentset';

// AHRI credentials from agentset-mcp/.env.ahri
const AGENTSET_API_KEY = 'agentset_reLRQJoRvkJbhXLV';
const AGENTSET_NAMESPACE_ID = 'ns_cmhg84aeu0001js04skomqbwk';

const agentset = new Agentset({ apiKey: AGENTSET_API_KEY });
const ns = agentset.namespace(AGENTSET_NAMESPACE_ID);

// Daikin outdoor units from submittals
const outdoorUnits = [
  { model: '2MXL18QMVJUA', zones: 2, capacity: '18,000 BTU' },
  { model: '3MXL24RMVJUA', zones: 3, capacity: '24,000 BTU' },
  { model: '4MXL36TVJU', zones: 4, capacity: '36,000 BTU' }
];

// Daikin indoor units from submittals
const indoorUnits = [
  { model: 'CTXS07LVJU', capacity: '7,000 BTU' },
  { model: 'FTXS09LVJU', capacity: '9,000 BTU' },
  { model: 'FTXS12LVJU', capacity: '12,000 BTU' },
  { model: 'FTXS15LVJU', capacity: '15,000 BTU' },
  { model: 'FTXS18LVJU', capacity: '18,000 BTU' },
  { model: 'FTXS24LVJU', capacity: '24,000 BTU' }
];

async function searchAHRI(query, topK = 20) {
  try {
    console.log(`\nSearching: ${query}`);
    const results = await ns.search(query, { topK, rerank: true });
    return results;
  } catch (error) {
    console.error(`Error searching AHRI: ${error.message}`);
    return [];
  }
}

async function main() {
  console.log('='.repeat(80));
  console.log('AHRI Multi-Zone System Search');
  console.log('='.repeat(80));

  const allResults = {};

  // Search for each outdoor unit
  for (const outdoor of outdoorUnits) {
    console.log(`\n${'='.repeat(80)}`);
    console.log(`Outdoor Unit: ${outdoor.model} (${outdoor.zones}-zone, ${outdoor.capacity})`);
    console.log('='.repeat(80));

    allResults[outdoor.model] = {};

    // Search for the outdoor unit with various indoor combinations
    const queries = [
      `${outdoor.model} FTXS12LVJU certified`,
      `${outdoor.model} FTXS09LVJU certified`,
      `${outdoor.model} FTXS07LVJU certified`,
      `${outdoor.model} FTXS15LVJU certified`,
      `${outdoor.model} FTXS18LVJU certified`,
      `${outdoor.model} FTXS24LVJU certified`,
      `${outdoor.model} multi-zone AHRI`,
      `Daikin ${outdoor.model} system`
    ];

    for (const query of queries) {
      const results = await searchAHRI(query, 10);

      if (results.length > 0) {
        console.log(`\nFound ${results.length} results for: ${query}`);
        results.slice(0, 3).forEach((result, idx) => {
          console.log(`\n  Result ${idx + 1}:`);
          console.log(`  ${result.text.substring(0, 500)}${result.text.length > 500 ? '...' : ''}`);
        });
      }

      // Store results
      if (!allResults[outdoor.model][query]) {
        allResults[outdoor.model][query] = results;
      }
    }
  }

  // Write results to file
  const fs = await import('fs');
  const outputPath = '/Users/christopherparent/Documents/GitHub/emco-mcp/ahri_multizone_results.json';
  fs.writeFileSync(outputPath, JSON.stringify(allResults, null, 2));
  console.log(`\n${'='.repeat(80)}`);
  console.log(`Results saved to: ${outputPath}`);
  console.log('='.repeat(80));
}

main().catch(console.error);
