#!/usr/bin/env node

/**
 * Search for specific Daikin multi-zone AHRI certified combinations
 */

import { Agentset } from 'agentset';

const AGENTSET_API_KEY = 'agentset_reLRQJoRvkJbhXLV';
const AGENTSET_NAMESPACE_ID = 'ns_cmhg84aeu0001js04skomqbwk';

const agentset = new Agentset({ apiKey: AGENTSET_API_KEY });
const ns = agentset.namespace(AGENTSET_NAMESPACE_ID);

async function searchAHRI(query, topK = 50) {
  try {
    const results = await ns.search(query, { topK, rerank: true });
    return results;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    return [];
  }
}

async function main() {
  console.log('Searching for Daikin multi-zone AHRI certified systems...\n');

  // Search for specific model combinations
  const searches = [
    // 2-zone systems
    '2MXL18QMVJUA FTXS12LVJU FTXS12LVJU AHRI',
    '2MXL18QMVJUA FTXS09LVJU FTXS09LVJU AHRI',
    '2MXL18QMVJUA FTXS09LVJU FTXS12LVJU AHRI',

    // 3-zone systems
    '3MXL24RMVJUA FTXS09LVJU FTXS09LVJU FTXS09LVJU AHRI',
    '3MXL24RMVJUA FTXS12LVJU FTXS12LVJU FTXS12LVJU AHRI',
    '3MXL24RMVJUA FTXS09LVJU FTXS09LVJU FTXS12LVJU AHRI',

    // 4-zone systems
    '4MXL36TVJU FTXS09LVJU FTXS09LVJU FTXS09LVJU FTXS09LVJU AHRI',
    '4MXL36TVJU FTXS09LVJU FTXS09LVJU FTXS09LVJU FTXS12LVJU AHRI',
    '4MXL36TVJU FTXS09LVJU FTXS09LVJU FTXS12LVJU FTXS12LVJU AHRI',
    '4MXL36TVJU FTXS12LVJU FTXS12LVJU FTXS12LVJU FTXS12LVJU AHRI',

    // Also search by outdoor unit alone to find all combinations
    '2MXL18QMVJUA',
    '3MXL24RMVJUA',
    '4MXL36TVJU',

    // Search for indoor units
    'FTXS09LVJU Daikin',
    'FTXS12LVJU Daikin',
    'FTXS15LVJU Daikin',
    'FTXS18LVJU Daikin',
    'CTXS07LVJU Daikin'
  ];

  const results = {};

  for (const query of searches) {
    console.log(`\nSearching: ${query}`);
    const searchResults = await searchAHRI(query, 50);

    if (searchResults.length > 0) {
      console.log(`Found ${searchResults.length} results`);

      // Filter for results that have AHRI reference numbers and full system info
      const detailedResults = searchResults.filter(r =>
        r.text.includes('AHRI Reference:') ||
        r.text.includes('AHRI Ref') ||
        r.text.length > 100
      );

      if (detailedResults.length > 0) {
        console.log(`  ${detailedResults.length} detailed results with AHRI info`);
        detailedResults.slice(0, 3).forEach((result, idx) => {
          console.log(`\n  === Result ${idx + 1} ===`);
          console.log(result.text.substring(0, 800));
          if (result.text.length > 800) console.log('...[truncated]');
        });
      }

      results[query] = detailedResults.length > 0 ? detailedResults : searchResults.slice(0, 10);
    } else {
      console.log('No results found');
    }
  }

  // Save results
  const fs = await import('fs');
  const outputPath = '/Users/christopherparent/Documents/GitHub/emco-mcp/ahri_detailed_results.json';
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
  console.log(`\n\nResults saved to: ${outputPath}`);
}

main().catch(console.error);
