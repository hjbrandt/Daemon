import { defineWranglerConfig } from "wrangler/experimental-config";

// Build configuration for `cf-wrangler build` when deploying with cloudflare.config.ts (the cf CLI):
// it names the VitePress output as the static assets directory. wrangler.toml stays for classic wrangler deploys.
export default defineWranglerConfig({
	types: {
		generate: false,
	},
	assetsDirectory: "./cms/.vitepress/dist",
});
