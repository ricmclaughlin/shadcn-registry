import { json } from '@sveltejs/kit';
import registryData from '$lib/registry.json';

export const prerender = true;

export async function GET() {
	return json(registryData);
}
