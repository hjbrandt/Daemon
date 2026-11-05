import { bindings, defineConfig, triggers } from "cf/config";

// Template for deploying with Cloudflare's `cf` CLI instead of wrangler.toml.
// Copy to your PRIVATE instance repo as cloudflare.config.ts, fill in the values, and let your
// deploy script copy it in next to daemon-data.json at build time (cloudflare.config.ts is git-ignored here).
export default defineConfig({
	accountId: "YOUR_ACCOUNT_ID",
	worker: {
		name: "daemon",
		entrypoint: "./src/worker.ts",
		compatibilityDate: "2026-08-20",
		// The custom domain is the only origin once it is attached.
		workersDev: false,
		previewUrls: false,
		domains: ["daemon.example.com"],
		assets: {
			runWorkerFirst: ["/daemon-data.json", "/feed.json"],
		},
		triggers: [triggers.scheduled({ schedule: "*/30 * * * *" })],
		env: {
			ASSETS: bindings.assets(),
			FEED_KV: bindings.kv({ id: "YOUR_KV_NAMESPACE_ID" }),
		},
	},
});
