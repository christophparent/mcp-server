#!/usr/bin/env node

import { Agentset } from 'agentset';
import { promises as fs } from 'fs';

const AGENTSET_API_KEY = 'agentset_reLRQJoRvkJbhXLV';
const AGENTSET_NAMESPACE_ID = 'ns_cmhg84aeu0001js04skomqbwk';

const agentset = new Agentset({ apiKey: AGENTSET_API_KEY });
const ns = agentset.namespace(AGENTSET_NAMESPACE_ID);

// Search for specific FTX indoor units combinations
const searches = [
  'AHRI Reference FTXS09LVJU FTXS09LVJU outdoor indoor units complete',
  'AHRI Reference FTXS12LVJU FTXS12LVJU outdoor indoor units complete',
  'AHRI Reference FTXS09LVJU FTXS12LVJU outdoor indoor units complete',
  'AHRI FTXS09LVJU 2-zone Daikin certified',
  'AHRI FTXS12LVJU 2-zone Daikin certified',
  'AHRI FTXS09LVJU 3-zone Daikin certified',
  'AHRI FTXS12LVJU 3-zone Daikin certified',
  'AHRI FTXS09LVJU 4-zone Daikin certified',
  'AHRI FTXS12LVJU 4-zone Daikin certified'
];

async function main() {
  const results = {};

  for (const query of searches) {
    console.log(`\nSearching: ${query}`);
    const searchResults = await ns.search(query, { topK: 30, rerank: true });

    const detailed = searchResults.filter(r =>
      r.text.includes('AHRI Ref') &&
      r.text.includes('Indoor Units:') &&
      r.text.length > 400
    );

    console.log(`Found ${detailed.length} results with indoor unit details`);

    if (detailed.length > 0) {
      console.log('\nFirst result:\n');
      console.log(detailed[0].text.substring(0, 2000));
      console.log('\n' + '='.repeat(80));
      results[query] = detailed.slice(0, 5);
    }
  }

  await fs.writeFile(
    '/Users/christopherparent/Documents/GitHub/emco-mcp/ftxs_combinations.json',
    JSON.stringify(results, null, 2)
  );

  console.log(`\n\nResults saved to: /Users/christopherparent/Documents/GitHub/emco-mcp/ftxs_combinations.json`);
}

main().catch(console.error);
