import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// Use static adapter for GitHub Pages
		adapter: adapter({
			// Default options for GitHub Pages
			pages: 'build',
			assets: 'build',
			fallback: undefined,
			precompress: false,
			strict: true
		}),
		
		// Configure paths for GitHub Pages
		paths: {
			// Set this to your repository name if deploying to username.github.io/repository-name
			// Leave empty if deploying to username.github.io
			base: process.argv.includes('dev') ? '' : process.env.BASE_PATH || ''
		},
		
		// Prerender all pages for static hosting
		prerender: {
			handleHttpError: 'warn',
			handleMissingId: 'warn'
		}
	}
};

export default config;
