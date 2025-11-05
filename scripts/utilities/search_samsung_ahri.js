#!/usr/bin/env node

import { Agentset } from 'agentset';

const AGENTSET_API_KEY = 'agentset_reLRQJoRvkJbhXLV';
const AGENTSET_NAMESPACE_ID = 'ns_cmhg84aeu0001js04skomqbwk';

const agentset = new Agentset({ apiKey: AGENTSET_API_KEY });
const ns = agentset.namespace(AGENTSET_NAMESPACE_ID);

const outdoorUnits = [
  { model: 'AJ020DXJ2CG', capacity: '20,000 BTU', zones: 2 },
  { model: 'AJ024DXJ3CG', capacity: '24,000 BTU', zones: 3 },
  { model: 'AJ036DXJ4CG', capacity: '36,000 BTU', zones: 4 },
  { model: 'AJ048DXJ5CG', capacity: '48,000 BTU', zones: 5 }
];

async function getAHRINumber(model) {
  console.log(`\n${'='.repeat(80)}`);
  console.log(`Searching AHRI for: Samsung ${model} (non-ducted)`);
  console.log('='.repeat(80));

  const results = await ns.search(`Samsung ${model} non-ducted AHRI Reference`, {
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
  console.log('SUMMARY - Samsung Outdoor Units');
  console.log('='.repeat(80));

  for (const [model, data] of Object.entries(results)) {
    console.log(`${model} (${data.zones}-zone, ${data.capacity}): AHRI ${data.ahriNumber || 'NOT FOUND'}`);
  }
}

main().catch(console.error);
