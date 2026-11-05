import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitepress";

// The site title and description come from the deployed data file so a fork's link previews name
// its owner; the example file stands in when no data has been copied in yet.
function ownerName(): string {
  for (const file of ["daemon-data.json", "daemon-data.example.json"]) {
    const path = fileURLToPath(new URL(`../public/${file}`, import.meta.url));
    if (!existsSync(path)) continue;
    try {
      const name = JSON.parse(readFileSync(path, "utf8")).owner_name;
      if (typeof name === "string" && name.trim()) return name.trim();
    } catch {}
  }
  return "its owner";
}

const owner = ownerName();

export default defineConfig({
  title: "Daemon",
  description: `A live, machine-readable broadcast of what ${owner} is doing, building, and thinking`,
  cleanUrls: true,
  appearance: false,
  themeConfig: {},
});
