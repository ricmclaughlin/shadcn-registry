<script lang="ts">
	import { onMount } from 'svelte';
	import { base } from '$app/paths';
	import { themeStore, themes } from '$lib/stores/theme';
	
	let currentTheme = 'default';
	
	// Subscribe to theme store
	$: currentTheme = $themeStore;
	
	// Get the registry base URL
	$: registryBaseUrl = typeof window !== 'undefined' ? window.location.origin + base : '';
	
	function switchTheme(themeId: string) {
		themeStore.setTheme(themeId);
	}
	
	// Load saved theme on mount
	onMount(() => {
		themeStore.loadTheme();
	});
</script>

<svelte:head>
	<title>shadcn-svelte Themed Registry</title>
	<meta name="description" content="A collection of themed shadcn-svelte components" />
</svelte:head>

<div class="min-h-screen bg-background">
	<!-- Header -->
	<header class="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
		<div class="container mx-auto px-4 py-4">
			<div class="flex items-center justify-between">
				<div class="flex items-center space-x-4">
					<h1 class="text-2xl font-bold text-foreground">shadcn-svelte</h1>
					<span class="text-sm text-muted-foreground">Themed Registry</span>
					<nav class="hidden md:flex space-x-6 ml-8">
						<a href="{base}/" class="text-foreground font-medium">Home</a>
						<a href="{base}/components" class="text-muted-foreground hover:text-foreground transition-colors">Components</a>
						<a href="{base}/themes" class="text-muted-foreground hover:text-foreground transition-colors">Themes</a>
					</nav>
				</div>
				
				<!-- Theme Switcher -->
				<div class="flex items-center space-x-2">
					<span class="text-sm text-muted-foreground">Theme:</span>
					<select 
						bind:value={currentTheme} 
						on:change={(e) => switchTheme(e.target.value)}
						class="px-3 py-1 text-sm border border-border rounded-md bg-background text-foreground"
					>
						{#each themes as theme}
							<option value={theme.id}>{theme.name}</option>
						{/each}
					</select>
				</div>
			</div>
		</div>
	</header>

	<!-- Hero Section -->
	<section class="py-20 px-4">
		<div class="container mx-auto text-center">
			<h2 class="text-4xl md:text-6xl font-bold text-foreground mb-6">
				Beautiful Components,<br />
				<span class="text-primary">Multiple Themes</span>
			</h2>
			<p class="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
				A curated collection of shadcn-svelte components with professionally designed themes. 
				Install components with your preferred styling in seconds.
			</p>
			
			<!-- Installation Example -->
			<div class="bg-card border border-border rounded-lg p-6 max-w-2xl mx-auto mb-8">
				<div class="text-left">
					<p class="text-sm text-muted-foreground mb-2">Install a themed component:</p>
					<code class="text-sm font-mono bg-muted px-3 py-2 rounded text-foreground block break-all">
						npx shadcn-svelte@latest add {registryBaseUrl}/api/r/material-theme
					</code>
				</div>
			</div>
		</div>
	</section>

	<!-- Themes Grid -->
	<section class="py-16 px-4">
		<div class="container mx-auto">
			<h3 class="text-3xl font-bold text-foreground mb-8 text-center">Available Themes</h3>
			
			<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
				{#each themes.slice(1) as theme}
					<div class="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
						<h4 class="text-xl font-semibold text-foreground mb-2">{theme.name}</h4>
						<p class="text-muted-foreground mb-4">{theme.description}</p>
						
						<!-- Preview buttons with theme styling -->
						<div class="space-y-2">
							<button 
								class="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
								on:click={() => switchTheme(theme.id)}
							>
								Preview Theme
							</button>
							<button 
								class="w-full px-4 py-2 border border-border text-foreground rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
								on:click={() => {
									switchTheme(theme.id);
									window.location.href = `${base}/components`;
								}}
							>
								View Components
							</button>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Features Section -->
	<section class="py-16 px-4 bg-muted/50">
		<div class="container mx-auto">
			<h3 class="text-3xl font-bold text-foreground mb-8 text-center">Why Use Our Registry?</h3>
			
			<div class="grid md:grid-cols-3 gap-8">
				<div class="text-center">
					<div class="w-12 h-12 bg-primary rounded-lg mx-auto mb-4 flex items-center justify-center">
						<span class="text-primary-foreground font-bold">🎨</span>
					</div>
					<h4 class="text-lg font-semibold text-foreground mb-2">Multiple Themes</h4>
					<p class="text-muted-foreground">Choose from carefully crafted themes that suit your project's aesthetic.</p>
				</div>
				
				<div class="text-center">
					<div class="w-12 h-12 bg-primary rounded-lg mx-auto mb-4 flex items-center justify-center">
						<span class="text-primary-foreground font-bold">⚡</span>
					</div>
					<h4 class="text-lg font-semibold text-foreground mb-2">Easy Installation</h4>
					<p class="text-muted-foreground">Install themed components with a single CLI command.</p>
				</div>
				
				<div class="text-center">
					<div class="w-12 h-12 bg-primary rounded-lg mx-auto mb-4 flex items-center justify-center">
						<span class="text-primary-foreground font-bold">🔧</span>
					</div>
					<h4 class="text-lg font-semibold text-foreground mb-2">Fully Customizable</h4>
					<p class="text-muted-foreground">Built on CSS variables for easy customization and theming.</p>
				</div>
			</div>
		</div>
	</section>

	<!-- Footer -->
	<footer class="border-t border-border py-8 px-4">
		<div class="container mx-auto text-center">
			<p class="text-muted-foreground">
				Built with ❤️ using SvelteKit and shadcn-svelte
			</p>
		</div>
	</footer>
</div>

<style>
	/* Theme-specific CSS variables will be injected here */
	:global(.theme-material) {
		--radius: 0.75rem;
		--background: oklch(0.99 0.005 106.423);
		--foreground: oklch(0.15 0.006 285.82);
		--primary: oklch(0.492 0.201 264.052);
		--primary-foreground: oklch(0.99 0.005 106.423);
		--muted: oklch(0.96 0.006 285.82);
		--muted-foreground: oklch(0.45 0.006 285.82);
		--card: oklch(1 0 0);
		--border: oklch(0.92 0.006 285.82);
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
		--border: oklch(0.9 0 0);
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
		--border: oklch(0.9 0.01 220);
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
		--border: oklch(0.93 0.01 231.66);
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
		--border: oklch(0.62 0.18 348.14);
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
		--border: oklch(0.81 0.02 271.20);
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
		--border: oklch(0.86 0 0);
	}
</style>
