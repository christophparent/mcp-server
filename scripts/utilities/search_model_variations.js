#!/usr/bin/env node

import { Agentset } from 'agentset';

const AGENTSET_API_KEY = 'agentset_reLRQJoRvkJbhXLV';
const AGENTSET_NAMESPACE_ID = 'ns_cmhg84aeu0001js04skomqbwk';

const agentset = new Agentset({ apiKey: AGENTSET_API_KEY });
const ns = agentset.namespace(AGENTSET_NAMESPACE_ID);

async function searchVariations() {
  const searches = [
    // Try variations of the 2-zone model
    '2MXL18Q',
    '2MXL18QMVJU',
    'Daikin 2-zone 18000',
    'Daikin 2 zone 18,000',

    // Try variations of the 3-zone model
    '3MXL24R',
    '3MXL24RMVJU',
    'Daikin 3-zone 24000',
    'Daikin 3 zone 24,000',

    // Try variations of the 4-zone model
    '4MXL36T',
    '4MXL36',
    'Daikin 4-zone 36000',
    'Daikin 4 zone 36,000'
  ];

  for (const query of searches) {
    console.log(`\n${'='.repeat(80)}`);
    console.log(`Searching: ${query}`);
    console.log('='.repeat(80));

    const results = await ns.search(query, { topK: 20, rerank: true });

    // Filter for AHRI references and detailed info
    const ahriResults = results.filter(r =>
      r.text.includes('AHRI Ref') && r.text.length > 300
    );

    if (ahriResults.length > 0) {
      console.log(`Found ${ahriResults.length} AHRI certified systems\n`);

      // Show unique outdoor models
      const outdoorModels = new Set();
      ahriResults.forEach(r => {
        const match = r.text.match(/Model Number: ([^\n]+)/);
        if (match) outdoorModels.add(match[1].trim());
      });

      console.log('Outdoor models found:');
      outdoorModels.forEach(m => console.log(`  - ${m}`));

      // Show first result details
      console.log(`\nFirst result details:`);
      console.log(ahriResults[0].text.substring(0, 1500));
      if (ahriResults[0].text.length > 1500) console.log('...[truncated]');
    } else {
      console.log('No AHRI certified results found');
    }
  }
}

searchVariations().catch(console.error);
