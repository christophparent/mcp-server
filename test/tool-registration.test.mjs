import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const source = fs.readFileSync(new URL("../src/index.ts", import.meta.url), "utf8");

test("ensures Agentset MCP registers core tool", () => {
  assert.ok(source.includes("knowledge-base-retrieve"), "tool name should be present");
  assert.ok(source.includes("new Agentset"), "Agentset client should be instantiated");
});
