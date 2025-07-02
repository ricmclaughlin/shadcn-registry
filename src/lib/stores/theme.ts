import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// Available themes
export const themes = [
	{ id: 'default', name: 'Default', description: 'The default shadcn-svelte theme' },
	{ id: 'material', name: 'Material', description: 'Material Design inspired theme' },
	{ id: 'minimal', name: 'Minimal', description: 'Clean and minimal design' },
	{ id: 'corporate', name: 'Corporate', description: 'Professional corporate styling' },
	{ id: 'twitter', name: 'Twitter', description: 'Twitter-inspired blue theme with rounded corners' },
	{ id: 'bubblegum', name: 'Bubblegum', description: 'Playful pink and pastel theme' },
	{ id: 'catppuccin', name: 'Catppuccin', description: 'Soothing pastel theme with purple accents' },
	{ id: 'graphite', name: 'Graphite', description: 'Sleek monochromatic gray theme' }
];

// Theme store
function createThemeStore() {
	const { subscribe, set, update } = writable('default');

	return {
		subscribe,
		
		// Set theme and persist to localStorage
		setTheme: (themeId: string) => {
			if (!browser) return;
			
			// Validate theme exists
			const themeExists = themes.some(theme => theme.id === themeId);
			if (!themeExists) {
				console.warn(`Theme "${themeId}" not found, falling back to default`);
				themeId = 'default';
			}
			
			// Update store
			set(themeId);
			
			// Apply to DOM
			if (themeId === 'default') {
				document.body.className = '';
			} else {
				document.body.className = `theme-${themeId}`;
			}
			
			// Persist to localStorage
			try {
				localStorage.setItem('selectedTheme', themeId);
			} catch (error) {
				console.warn('Failed to save theme to localStorage:', error);
			}
		},
		
		// Load theme from localStorage
		loadTheme: () => {
			if (!browser) return;
			
			try {
				const savedTheme = localStorage.getItem('selectedTheme');
				if (savedTheme) {
					// Use setTheme to ensure consistency
					themeStore.setTheme(savedTheme);
					return;
				}
			} catch (error) {
				console.warn('Failed to load theme from localStorage:', error);
			}
			
			// Check if theme is already applied to body (from previous page navigation)
			const bodyClass = document.body.className;
			if (bodyClass && bodyClass.startsWith('theme-')) {
				const themeFromBody = bodyClass.replace('theme-', '');
				set(themeFromBody);
				// Also save to localStorage for consistency
				try {
					localStorage.setItem('selectedTheme', themeFromBody);
				} catch (error) {
					console.warn('Failed to save theme to localStorage:', error);
				}
			} else {
				// Default theme
				set('default');
			}
		},
		
		// Get theme info by ID
		getThemeInfo: (themeId: string) => {
			return themes.find(theme => theme.id === themeId) || themes[0];
		}
	};
}

export const themeStore = createThemeStore();
