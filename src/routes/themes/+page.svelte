<script lang="ts">
	import { onMount } from 'svelte';
	import { base } from '$app/paths';
	import { themeStore, themes as allThemes } from '$lib/stores/theme';
	
	const themes = [
		{
			id: 'material',
			name: 'Material Theme',
			description: 'Inspired by Google\'s Material Design with vibrant colors and rounded corners',
			features: ['Roboto font family', 'Larger border radius (0.75rem)', 'Vibrant primary colors', 'Material Design principles'],
			colors: {
				primary: 'oklch(0.492 0.201 264.052)',
				secondary: 'oklch(0.96 0.006 285.82)',
				accent: 'oklch(0.96 0.006 285.82)'
			},
			category: 'Original'
		},
		{
			id: 'minimal',
			name: 'Minimal Theme',
			description: 'Clean and minimal design with sharp edges and subtle colors',
			features: ['Inter font family', 'Small border radius (0.25rem)', 'Monochromatic colors', 'Clean aesthetics'],
			colors: {
				primary: 'oklch(0.1 0 0)',
				secondary: 'oklch(0.97 0 0)',
				accent: 'oklch(0.97 0 0)'
			},
			category: 'Original'
		},
		{
			id: 'corporate',
			name: 'Corporate Theme',
			description: 'Professional corporate styling with conservative colors',
			features: ['System font stack', 'Medium border radius (0.375rem)', 'Conservative colors', 'Professional appearance'],
			colors: {
				primary: 'oklch(0.25 0.05 220)',
				secondary: 'oklch(0.95 0.01 220)',
				accent: 'oklch(0.95 0.01 220)'
			},
			category: 'Original'
		},
		{
			id: 'twitter',
			name: 'Twitter Theme',
			description: 'A theme inspired by Twitter\'s design with rounded corners and blue accents',
			features: ['Open Sans font family', 'Large border radius (1.3rem)', 'Twitter blue primary', 'Social media aesthetic'],
			colors: {
				primary: 'oklch(0.67 0.16 245.00)',
				secondary: 'oklch(0.19 0.01 248.51)',
				accent: 'oklch(0.94 0.02 250.85)'
			},
			category: 'TweakCN-Inspired'
		},
		{
			id: 'bubblegum',
			name: 'Bubblegum Theme',
			description: 'A playful theme with pink and pastel colors inspired by bubblegum',
			features: ['Poppins font family', 'Small border radius (0.4rem)', 'Pink and pastel colors', 'Playful aesthetic'],
			colors: {
				primary: 'oklch(0.62 0.18 348.14)',
				secondary: 'oklch(0.81 0.07 198.19)',
				accent: 'oklch(0.92 0.08 87.67)'
			},
			category: 'TweakCN-Inspired'
		},
		{
			id: 'catppuccin',
			name: 'Catppuccin Theme',
			description: 'A soothing pastel theme inspired by the popular Catppuccin color palette',
			features: ['Montserrat font family', 'Small border radius (0.35rem)', 'Pastel purple accents', 'Soothing colors'],
			colors: {
				primary: 'oklch(0.55 0.25 297.02)',
				secondary: 'oklch(0.86 0.01 268.48)',
				accent: 'oklch(0.68 0.14 235.38)'
			},
			category: 'TweakCN-Inspired'
		},
		{
			id: 'graphite',
			name: 'Graphite Theme',
			description: 'A sleek monochromatic theme with subtle grays and clean aesthetics',
			features: ['Inter font family', 'Small border radius (0.35rem)', 'Monochromatic grays', 'Professional minimalism'],
			colors: {
				primary: 'oklch(0.49 0 0)',
				secondary: 'oklch(0.91 0 0)',
				accent: 'oklch(0.81 0 0)'
			},
			category: 'TweakCN-Inspired'
		}
	];
	
	let selectedTheme = 'material';
	let currentTheme = 'default';
	
	// Subscribe to theme store
	$: currentTheme = $themeStore;
	$: selectedTheme = $themeStore === 'default' ? 'material' : $themeStore;
	
	// Get the registry base URL
	$: registryBaseUrl = typeof window !== 'undefined' ? window.location.origin + base : '';
	
	function selectTheme(themeId: string) {
		selectedTheme = themeId;
		themeStore.setTheme(themeId);
	}
	
	// Load theme on mount
	onMount(() => {
		themeStore.loadTheme();
	});
	
	// Group themes by category
	$: originalThemes = themes.filter(t => t.category === 'Original');
	$: tweakCNThemes = themes.filter(t => t.category === 'TweakCN-Inspired');
</script>

<svelte:head>
	<title>Themes - shadcn-svelte Themed Registry</title>
</svelte:head>

<div class="min-h-screen bg-background">
	<!-- Header -->
	<header class="border-b border-border bg-background/95 backdrop-blur">
		<div class="container mx-auto px-4 py-4">
			<div class="flex items-center justify-between">
				<div class="flex items-center space-x-4">
					<a href="{base}/" class="text-2xl font-bold text-foreground hover:text-primary transition-colors">
						shadcn-svelte
					</a>
					<nav class="hidden md:flex space-x-6">
						<a href="{base}/" class="text-muted-foreground hover:text-foreground transition-colors">Home</a>
						<a href="{base}/components" class="text-muted-foreground hover:text-foreground transition-colors">Components</a>
						<a href="{base}/themes" class="text-foreground font-medium">Themes</a>
					</nav>
				</div>
				
				<!-- Theme Switcher -->
				<div class="flex items-center space-x-2">
					<span class="text-sm text-muted-foreground">Current:</span>
					<select 
						bind:value={currentTheme} 
						on:change={(e) => themeStore.setTheme(e.target.value)}
						class="px-3 py-1 text-sm border border-border rounded-md bg-background text-foreground"
					>
						<option value="default">Default</option>
						{#each allThemes.filter(t => t.id !== 'default') as theme}
							<option value={theme.id}>{theme.name}</option>
						{/each}
					</select>
				</div>
			</div>
		</div>
	</header>

	<div class="container mx-auto px-4 py-8">
		<div class="mb-8">
			<h1 class="text-4xl font-bold text-foreground mb-4">Theme Gallery</h1>
			<p class="text-xl text-muted-foreground">
				Explore our collection of professionally designed themes. Click on any theme to preview it, or use the dropdown above to switch themes.
			</p>
		</div>

		<!-- Original Themes Section -->
		<section class="mb-12">
			<h2 class="text-2xl font-semibold text-foreground mb-6">Original Themes</h2>
			<div class="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
				{#each originalThemes as theme}
					<div 
						class="bg-card border border-border rounded-lg overflow-hidden cursor-pointer transition-all hover:shadow-lg {selectedTheme === theme.id ? 'ring-2 ring-primary' : ''}"
						on:click={() => selectTheme(theme.id)}
						role="button"
						tabindex="0"
						on:keydown={(e) => e.key === 'Enter' && selectTheme(theme.id)}
					>
						<!-- Theme Preview Header -->
						<div class="p-6 border-b border-border">
							<div class="flex items-center justify-between mb-4">
								<h3 class="text-xl font-semibold text-card-foreground">{theme.name}</h3>
								{#if selectedTheme === theme.id}
									<span class="px-2 py-1 bg-primary text-primary-foreground text-xs rounded-full">Active</span>
								{/if}
							</div>
							<p class="text-muted-foreground mb-4">{theme.description}</p>
							
							<!-- Color Palette -->
							<div class="flex space-x-2 mb-4">
								<div class="w-8 h-8 rounded-full border border-border" style="background-color: {theme.colors.primary}"></div>
								<div class="w-8 h-8 rounded-full border border-border" style="background-color: {theme.colors.secondary}"></div>
								<div class="w-8 h-8 rounded-full border border-border" style="background-color: {theme.colors.accent}"></div>
							</div>
						</div>
						
						<!-- Theme Features -->
						<div class="p-6">
							<h4 class="font-medium text-card-foreground mb-3">Features:</h4>
							<ul class="space-y-1 mb-4">
								{#each theme.features as feature}
									<li class="text-sm text-muted-foreground flex items-center">
										<span class="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
										{feature}
									</li>
								{/each}
							</ul>
							
							<!-- Installation Command -->
							<div class="p-3 bg-muted rounded-md">
								<p class="text-xs text-muted-foreground mb-1">Installation:</p>
								<code class="text-xs font-mono text-foreground break-all">
									npx shadcn-svelte@latest add {registryBaseUrl}/api/r/{theme.id}-theme
								</code>
							</div>
						</div>
					</div>
				{/each}
			</div>
		</section>

		<!-- TweakCN-Inspired Themes Section -->
		<section class="mb-12">
			<div class="flex items-center justify-between mb-6">
				<h2 class="text-2xl font-semibold text-foreground">TweakCN-Inspired Themes</h2>
				<a 
					href="https://tweakcn.com" 
					target="_blank" 
					rel="noopener noreferrer"
					class="text-sm text-muted-foreground hover:text-foreground transition-colors"
				>
					Inspired by TweakCN ↗
				</a>
			</div>
			<div class="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
				{#each tweakCNThemes as theme}
					<div 
						class="bg-card border border-border rounded-lg overflow-hidden cursor-pointer transition-all hover:shadow-lg {selectedTheme === theme.id ? 'ring-2 ring-primary' : ''}"
						on:click={() => selectTheme(theme.id)}
						role="button"
						tabindex="0"
						on:keydown={(e) => e.key === 'Enter' && selectTheme(theme.id)}
					>
						<!-- Theme Preview Header -->
						<div class="p-6 border-b border-border">
							<div class="flex items-center justify-between mb-4">
								<h3 class="text-xl font-semibold text-card-foreground">{theme.name}</h3>
								{#if selectedTheme === theme.id}
									<span class="px-2 py-1 bg-primary text-primary-foreground text-xs rounded-full">Active</span>
								{/if}
							</div>
							<p class="text-muted-foreground mb-4">{theme.description}</p>
							
							<!-- Color Palette -->
							<div class="flex space-x-2 mb-4">
								<div class="w-8 h-8 rounded-full border border-border" style="background-color: {theme.colors.primary}"></div>
								<div class="w-8 h-8 rounded-full border border-border" style="background-color: {theme.colors.secondary}"></div>
								<div class="w-8 h-8 rounded-full border border-border" style="background-color: {theme.colors.accent}"></div>
							</div>
						</div>
						
						<!-- Theme Features -->
						<div class="p-6">
							<h4 class="font-medium text-card-foreground mb-3">Features:</h4>
							<ul class="space-y-1 mb-4">
								{#each theme.features as feature}
									<li class="text-sm text-muted-foreground flex items-center">
										<span class="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
										{feature}
									</li>
								{/each}
							</ul>
							
							<!-- Installation Command -->
							<div class="p-3 bg-muted rounded-md">
								<p class="text-xs text-muted-foreground mb-1">Installation:</p>
								<code class="text-xs font-mono text-foreground break-all">
									npx shadcn-svelte@latest add {registryBaseUrl}/api/r/{theme.id}-theme
								</code>
							</div>
						</div>
					</div>
				{/each}
			</div>
		</section>

		<!-- Live Preview Section -->
		<section class="bg-card border border-border rounded-lg p-6">
			<h2 class="text-2xl font-semibold text-card-foreground mb-6">Live Preview</h2>
			<p class="text-muted-foreground mb-6">
				The current page is using the <strong>{themes.find(t => t.id === selectedTheme)?.name || 'Default'}</strong> theme. 
				All components below will reflect the selected theme's styling.
			</p>
			
			<!-- Sample Components -->
			<div class="space-y-8">
				<!-- Buttons -->
				<div>
					<h3 class="text-lg font-medium text-card-foreground mb-3">Buttons</h3>
					<div class="flex flex-wrap gap-3">
						<button class="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
							Primary
						</button>
						<button class="px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 transition-colors">
							Secondary
						</button>
						<button class="px-4 py-2 border border-border text-foreground rounded-md hover:bg-accent hover:text-accent-foreground transition-colors">
							Outline
						</button>
						<button class="px-4 py-2 bg-destructive text-destructive-foreground rounded-md hover:bg-destructive/90 transition-colors">
							Destructive
						</button>
					</div>
				</div>
				
				<!-- Form -->
				<div>
					<h3 class="text-lg font-medium text-card-foreground mb-3">Form Elements</h3>
					<div class="grid md:grid-cols-2 gap-4 max-w-2xl">
						<div class="space-y-3">
							<input 
								type="text" 
								placeholder="Sample input"
								class="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
							>
							<select class="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground">
								<option>Select option</option>
								<option>Option 1</option>
								<option>Option 2</option>
							</select>
						</div>
						<div>
							<textarea 
								placeholder="Sample textarea"
								rows="3"
								class="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
							></textarea>
						</div>
					</div>
				</div>
				
				<!-- Cards -->
				<div>
					<h3 class="text-lg font-medium text-card-foreground mb-3">Cards & Badges</h3>
					<div class="grid md:grid-cols-2 gap-4 max-w-2xl mb-4">
						<div class="bg-card border border-border rounded-lg p-4">
							<h4 class="font-medium text-card-foreground mb-2">Sample Card</h4>
							<p class="text-muted-foreground text-sm">This card demonstrates the theme's styling with proper contrast and spacing.</p>
						</div>
						<div class="bg-muted rounded-lg p-4">
							<h4 class="font-medium text-foreground mb-2">Muted Card</h4>
							<p class="text-muted-foreground text-sm">Using muted background colors for subtle emphasis.</p>
						</div>
					</div>
					<div class="flex flex-wrap gap-2">
						<span class="px-2 py-1 bg-primary text-primary-foreground text-xs rounded-full">Primary</span>
						<span class="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-full">Secondary</span>
						<span class="px-2 py-1 bg-accent text-accent-foreground text-xs rounded-full">Accent</span>
						<span class="px-2 py-1 border border-border text-foreground text-xs rounded-full">Outline</span>
					</div>
				</div>
			</div>
		</section>
	</div>
</div>

<style>
	/* Theme-specific CSS variables */
	:global(.theme-material) {
		--radius: 0.75rem;
		--background: oklch(0.99 0.005 106.423);
		--foreground: oklch(0.15 0.006 285.82);
		--primary: oklch(0.492 0.201 264.052);
		--primary-foreground: oklch(0.99 0.005 106.423);
		--muted: oklch(0.96 0.006 285.82);
		--muted-foreground: oklch(0.45 0.006 285.82);
		--card: oklch(1 0 0);
		--card-foreground: oklch(0.15 0.006 285.82);
		--border: oklch(0.92 0.006 285.82);
		--secondary: oklch(0.96 0.006 285.82);
		--secondary-foreground: oklch(0.15 0.006 285.82);
		--accent: oklch(0.96 0.006 285.82);
		--accent-foreground: oklch(0.15 0.006 285.82);
		--destructive: oklch(0.576 0.196 17.38);
		--destructive-foreground: oklch(0.99 0.005 106.423);
		--input: oklch(0.92 0.006 285.82);
		--ring: oklch(0.492 0.201 264.052);
	}
	
	:global(.theme-minimal) {
		--radius: 0.25rem;
		--background: oklch(1 0 0);
		--foreground: oklch(0.1 0 0);
		--primary: oklch(0.1 0 0);
		--primary-foreground: oklch(1 0 0);
		--muted: oklch(0.97 0 0);
		--muted-foreground: oklch(0.5 0 0);
		--card: oklch(1 0 0);
		--card-foreground: oklch(0.1 0 0);
		--border: oklch(0.9 0 0);
		--secondary: oklch(0.97 0 0);
		--secondary-foreground: oklch(0.1 0 0);
		--accent: oklch(0.97 0 0);
		--accent-foreground: oklch(0.1 0 0);
		--destructive: oklch(0.576 0.196 17.38);
		--destructive-foreground: oklch(1 0 0);
		--input: oklch(0.9 0 0);
		--ring: oklch(0.1 0 0);
	}
	
	:global(.theme-corporate) {
		--radius: 0.375rem;
		--background: oklch(0.99 0.002 247.839);
		--foreground: oklch(0.15 0.01 220);
		--primary: oklch(0.25 0.05 220);
		--primary-foreground: oklch(0.99 0.002 247.839);
		--muted: oklch(0.95 0.01 220);
		--muted-foreground: oklch(0.45 0.02 220);
		--card: oklch(1 0 0);
		--card-foreground: oklch(0.15 0.01 220);
		--border: oklch(0.9 0.01 220);
		--secondary: oklch(0.95 0.01 220);
		--secondary-foreground: oklch(0.15 0.01 220);
		--accent: oklch(0.95 0.01 220);
		--accent-foreground: oklch(0.15 0.01 220);
		--destructive: oklch(0.576 0.196 17.38);
		--destructive-foreground: oklch(0.99 0.002 247.839);
		--input: oklch(0.9 0.01 220);
		--ring: oklch(0.25 0.05 220);
	}
	
	:global(.theme-twitter) {
		--radius: 1.3rem;
		--background: oklch(1.00 0 0);
		--foreground: oklch(0.19 0.01 248.51);
		--primary: oklch(0.67 0.16 245.00);
		--primary-foreground: oklch(1.00 0 0);
		--muted: oklch(0.92 0.00 286.37);
		--muted-foreground: oklch(0.19 0.01 248.51);
		--card: oklch(0.98 0.00 197.14);
		--card-foreground: oklch(0.19 0.01 248.51);
		--border: oklch(0.93 0.01 231.66);
		--secondary: oklch(0.19 0.01 248.51);
		--secondary-foreground: oklch(1.00 0 0);
		--accent: oklch(0.94 0.02 250.85);
		--accent-foreground: oklch(0.67 0.16 245.00);
		--destructive: oklch(0.62 0.24 25.77);
		--destructive-foreground: oklch(1.00 0 0);
		--input: oklch(0.98 0.00 228.78);
		--ring: oklch(0.68 0.16 243.35);
	}
	
	:global(.theme-bubblegum) {
		--radius: 0.4rem;
		--background: oklch(0.94 0.02 345.70);
		--foreground: oklch(0.47 0 0);
		--primary: oklch(0.62 0.18 348.14);
		--primary-foreground: oklch(1.00 0 0);
		--muted: oklch(0.88 0.05 212.10);
		--muted-foreground: oklch(0.58 0 0);
		--card: oklch(0.95 0.05 86.89);
		--card-foreground: oklch(0.47 0 0);
		--border: oklch(0.62 0.18 348.14);
		--secondary: oklch(0.81 0.07 198.19);
		--secondary-foreground: oklch(0.32 0 0);
		--accent: oklch(0.92 0.08 87.67);
		--accent-foreground: oklch(0.32 0 0);
		--destructive: oklch(0.71 0.17 21.96);
		--destructive-foreground: oklch(1.00 0 0);
		--input: oklch(0.92 0 0);
		--ring: oklch(0.70 0.16 350.75);
	}
	
	:global(.theme-catppuccin) {
		--radius: 0.35rem;
		--background: oklch(0.96 0.01 264.53);
		--foreground: oklch(0.44 0.04 279.33);
		--primary: oklch(0.55 0.25 297.02);
		--primary-foreground: oklch(1.00 0 0);
		--muted: oklch(0.91 0.01 264.51);
		--muted-foreground: oklch(0.55 0.03 279.08);
		--card: oklch(1.00 0 0);
		--card-foreground: oklch(0.44 0.04 279.33);
		--border: oklch(0.81 0.02 271.20);
		--secondary: oklch(0.86 0.01 268.48);
		--secondary-foreground: oklch(0.44 0.04 279.33);
		--accent: oklch(0.68 0.14 235.38);
		--accent-foreground: oklch(1.00 0 0);
		--destructive: oklch(0.55 0.22 19.81);
		--destructive-foreground: oklch(1.00 0 0);
		--input: oklch(0.86 0.01 268.48);
		--ring: oklch(0.55 0.25 297.02);
	}
	
	:global(.theme-graphite) {
		--radius: 0.35rem;
		--background: oklch(0.96 0 0);
		--foreground: oklch(0.32 0 0);
		--primary: oklch(0.49 0 0);
		--primary-foreground: oklch(1.00 0 0);
		--muted: oklch(0.89 0 0);
		--muted-foreground: oklch(0.51 0 0);
		--card: oklch(0.97 0 0);
		--card-foreground: oklch(0.32 0 0);
		--border: oklch(0.86 0 0);
		--secondary: oklch(0.91 0 0);
		--secondary-foreground: oklch(0.32 0 0);
		--accent: oklch(0.81 0 0);
		--accent-foreground: oklch(0.32 0 0);
		--destructive: oklch(0.56 0.19 25.86);
		--destructive-foreground: oklch(1.00 0 0);
		--input: oklch(0.91 0 0);
		--ring: oklch(0.49 0 0);
	}
</style>
