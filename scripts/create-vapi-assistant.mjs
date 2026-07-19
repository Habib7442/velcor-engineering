// One-time (or re-run-after-editing-the-config) setup script that
// applies vapi/assistant-config.mjs to your Vapi account. Safe to
// re-run: it looks for an existing assistant named "Sarah" and updates
// it in place instead of creating a duplicate every time.
//
// Usage: node scripts/create-vapi-assistant.mjs
// Requires VAPI_PRIVATE_API_KEY in .env.local.

import dotenv from "dotenv";
import { assistantConfig } from "../vapi/assistant-config.mjs";

dotenv.config({ path: "./.env.local" });

const API_KEY = process.env.VAPI_PRIVATE_API_KEY;
const BASE_URL = "https://api.vapi.ai";

if (!API_KEY) {
  console.error("Missing VAPI_PRIVATE_API_KEY in .env.local. Get it from your Vapi dashboard first.");
  process.exit(1);
}

async function vapiFetch(path, options = {}) {
  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Vapi API error ${response.status} on ${path}: ${body}`);
  }

  return response.json();
}

async function main() {
  console.log(`Looking for an existing assistant named "${assistantConfig.name}"...`);
  const existing = await vapiFetch("/assistant");
  const match = Array.isArray(existing) ? existing.find((a) => a.name === assistantConfig.name) : null;

  let assistant;
  if (match) {
    console.log(`Found existing assistant (id: ${match.id}) -- updating it.`);
    assistant = await vapiFetch(`/assistant/${match.id}`, {
      method: "PATCH",
      body: JSON.stringify(assistantConfig),
    });
  } else {
    console.log("No existing assistant found -- creating a new one.");
    assistant = await vapiFetch("/assistant", {
      method: "POST",
      body: JSON.stringify(assistantConfig),
    });
  }

  console.log("\nDone. Assistant id:");
  console.log(assistant.id);
  console.log("\nAdd this to .env.local:");
  console.log(`NEXT_PUBLIC_VAPI_ASSISTANT_ID=${assistant.id}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
