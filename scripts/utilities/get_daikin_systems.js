#!/usr/bin/env node

import { Agentset } from 'agentset';
import { promises as fs } from 'fs';

const AGENTSET_API_KEY = 'agentset_reLRQJoRvkJbhXLV';
const AGENTSET_NAMESPACE_ID = 'ns_cmhg84aeu0001js04skomqbwk';

const agentset = new Agentset({ apiKey: AGENTSET_API_KEY });
const ns = agentset.namespace(AGENTSET_NAMESPACE_ID);

async function getAllDaikinMultizone() {
  console.log('Retrieving all Daikin multi-zone AHRI certified systems...\n');

  const systems = [];

  // Search for  specific AHRI certifications with complete system info
  const outdoorModels = [
    '2MXLH18WVJU',
    '3MXLH24WVJU',
    '4MXL36TVJU',
    '4MXLH36WVJU',
    '2MXL18QMVJUA',
    '3MXL24RMVJUA'
  ];

  for (const outdoor of outdoorModels) {
    console.log(`\nSearching: ${outdoor}...`);
    const results = await ns.search(`Daikin ${outdoor} AHRI certified complete system configuration indoor units`, {
      topK: 100,
      rerank: true
    });

    const detailedResults = results.filter(r =>
      r.text.includes('AHRI Ref') && r.text.length > 400
    );

    console.log(`  Found ${detailedResults.length} detailed certifications`);

    if (detailedResults.length > 0) {
      systems.push({
        outdoor: outdoor,
        certifications: detailedResults.slice(0, 10).map(r => r.text)
      });
    }
  }

  return systems;
}

async function main() {
  const systems = await getAllDaikinMultizone();

  // Save full results
  await fs.writeFile(
    '/Users/christopherparent/Documents/GitHub/emco-mcp/daikin_multizone_systems.json',
    JSON.stringify(systems, null, 2)
  );

  // Create a summary
  console.log('\n' + '='.repeat(80));
  console.log('SUMMARY OF FOUND SYSTEMS');
  console.log('='.repeat(80));

  for (const system of systems) {
    console.log(`\n${system.outdoor}: ${system.certifications.length} certifications found`);

    // Extract AHRI numbers and indoor configurations
    system.certifications.forEach((cert, idx) => {
      const ahriMatch = cert.match(/AHRI Ref(?:erence)?:\s*(\d+)/);
      const indoorMatch = cert.match(/Indoor configuration:\s*([^\n]+)/);

      if (ahriMatch && indoorMatch) {
        console.log(`  ${idx + 1}. AHRI ${ahriMatch[1]} - ${indoorMatch[1]}`);
      }

      // Try to extract specific indoor unit models
      const indoorModels = cert.match(/Model Number:\s*((?:FTX|CTX)[^\n,]+)/g);
      if (indoorModels && indoorModels.length > 1) {
        console.log(`     Indoor units: ${indoorModels.slice(1).map(m => m.replace('Model Number: ', '')).join(', ')}`);
      }
    });
  }

  console.log(`\n\nFull details saved to: /Users/christopherparent/Documents/GitHub/emco-mcp/daikin_multizone_systems.json`);
}

main().catch(console.error);
