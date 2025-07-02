import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

// Import theme files
import materialTheme from '$lib/registry/themes/material.json';
import minimalTheme from '$lib/registry/themes/minimal.json';
import corporateTheme from '$lib/registry/themes/corporate.json';
import twitterTheme from '$lib/registry/themes/twitter.json';
import bubblegumTheme from '$lib/registry/themes/bubblegum.json';
import catppuccinTheme from '$lib/registry/themes/catppuccin.json';
import graphiteTheme from '$lib/registry/themes/graphite.json';

export const prerender = true;

// Registry items map
const registryItems: Record<string, any> = {
	'material-theme': materialTheme,
	'minimal-theme': minimalTheme,
	'corporate-theme': corporateTheme,
	'twitter-theme': twitterTheme,
	'bubblegum-theme': bubblegumTheme,
	'catppuccin-theme': catppuccinTheme,
	'graphite-theme': graphiteTheme
};

export const GET: RequestHandler = async ({ params }) => {
	const { item } = params;
	
	if (!item || !registryItems[item]) {
		throw error(404, 'Registry item not found');
	}
	
	return json(registryItems[item]);
};

// Define which routes should be prerendered
export function entries() {
	return Object.keys(registryItems).map(item => ({ item }));
}
