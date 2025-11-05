#!/usr/bin/env node

import { Agentset } from 'agentset';

const AGENTSET_API_KEY = 'agentset_reLRQJoRvkJbhXLV';
const AGENTSET_NAMESPACE_ID = 'ns_cmhg84aeu0001js04skomqbwk';

const agentset = new Agentset({ apiKey: AGENTSET_API_KEY });
const ns = agentset.namespace(AGENTSET_NAMESPACE_ID);

const outdoorUnits = [
  { model: '2MXL18QMVJUA', capacity: '18,000 BTU', zones: 2 },
  { model: '3MXL24RMVJUA', capacity: '24,000 BTU', zones: 3 },
  { model: '4MXL36TVJU', capacity: '36,000 BTU', zones: 4 }
];

async function getAHRINumber(model) {
  console.log(`\n${'='.repeat(80)}`);
  console.log(`Searching AHRI for: ${model} (non-ducted)`);
  console.log('='.repeat(80));

  const results = await ns.search(`${model} non-ducted AHRI Reference`, {
    topK: 50,
    rerank: true
  });

  const ahriResults = results.filter(r =>
    r.text.includes('AHRI Ref') &&
    r.text.includes('non-ducted') &&
    r.text.length > 300
  );

  if (ahriResults.length > 0) {
    console.log(`\nFound ${ahriResults.length} AHRI certifications for non-ducted`);
    console.log(`\nTop result:\n`);
    console.log(ahriResults[0].text.substring(0, 1500));

    const ahriMatch = ahriResults[0].text.match(/AHRI Ref(?:erence)?:\s*(\d+)/);
    if (ahriMatch) {
      console.log(`\n>>> AHRI Number: ${ahriMatch[1]} <<<`);
      return ahriMatch[1];
    }
  } else {
    console.log('No AHRI certification found for non-ducted configuration');
  }

  return null;
}

async function main() {
  const results = {};

  for (const unit of outdoorUnits) {
    const ahriNumber = await getAHRINumber(unit.model);
    results[unit.model] = {
      capacity: unit.capacity,
      zones: unit.zones,
      ahriNumber: ahriNumber
    };
  }

  console.log('\n\n' + '='.repeat(80));
  console.log('SUMMARY');
  console.log('='.repeat(80));

  for (const [model, data] of Object.entries(results)) {
    console.log(`${model} (${data.zones}-zone, ${data.capacity}): AHRI ${data.ahriNumber || 'NOT FOUND'}`);
  }
}

main().catch(console.error);
