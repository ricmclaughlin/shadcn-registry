<script lang="ts">
	import { onMount } from 'svelte';
	import { base } from '$app/paths';
	import { themeStore, themes } from '$lib/stores/theme';
	import { Button } from '$lib/components/ui/button';
	import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Badge } from '$lib/components/ui/badge';
	import { Alert, AlertTitle, AlertDescription } from '$lib/components/ui/alert';
	import { ModeToggle } from '$lib/components/ui/mode-toggle';
	
	// Icon imports
	import InfoIcon from '@lucide/svelte/icons/info';
	import DownloadIcon from '@lucide/svelte/icons/download';
	
	let currentTheme = 'default';
	
	// Subscribe to theme store
	$: currentTheme = $themeStore;
	
	// Get the registry base URL
	$: registryBaseUrl = typeof window !== 'undefined' ? window.location.origin + base : '';
	
	// Featured themes
	const featuredThemes = [
		themes.find(t => t.id === 'graphite'),
		themes.find(t => t.id === 'twitter'),
		themes.find(t => t.id === 'bubblegum'),
		themes.find(t => t.id === 'corporate')
	].filter(Boolean);
	
	function switchTheme(themeId: string) {
		themeStore.setTheme(themeId);
	}
	
	// Load saved theme on mount
	onMount(() => {
		themeStore.loadTheme();
	});
</script>

<svelte:head>
	<title>UI Registry</title>
	<meta name="description" content="A collection of shadcn-svelte components with beautiful themes" />
</svelte:head>

<div class="min-h-screen bg-background">
	<!-- Header -->
	<header class="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
		<div class="container mx-auto px-4 py-4">
			<div class="flex items-center justify-between">
				<div class="flex items-center space-x-4">
					<h1 class="text-2xl font-bold text-foreground">UI Registry</h1>
					<nav class="hidden md:flex space-x-6 ml-8">
						<a href="{base}/" class="text-foreground font-medium">Home</a>
						<a href="{base}/components" class="text-muted-foreground hover:text-foreground transition-colors">Components</a>
						<a href="{base}/themes" class="text-muted-foreground hover:text-foreground transition-colors">Themes</a>
					</nav>
				</div>
				
				<!-- Theme Switcher -->
				<div class="flex items-center space-x-4">
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
					<ModeToggle />
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
		</div>
	</section>

	<!-- Select Components Section -->
	<section class="py-16 px-4">
		<div class="container mx-auto">
			<h3 class="text-3xl font-bold text-foreground mb-8 text-center">Select Components</h3>
			
			<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
				<!-- Alert Component -->
				<Card>
					<CardHeader>
						<CardTitle>Alert</CardTitle>
						<CardDescription>Display important messages with icons</CardDescription>
					</CardHeader>
					<CardContent>
						<Alert variant="default" icon={InfoIcon}>
							<AlertTitle>Information</AlertTitle>
							<AlertDescription>This is an alert message.</AlertDescription>
						</Alert>
					</CardContent>
				</Card>

				<!-- Badge Component -->
				<Card>
					<CardHeader>
						<CardTitle>Badge</CardTitle>
						<CardDescription>Display status, tags, and notifications</CardDescription>
					</CardHeader>
					<CardContent>
						<div class="flex flex-wrap gap-2">
							<Badge variant="default">Default</Badge>
							<Badge variant="secondary">Secondary</Badge>
							<Badge variant="outline">Outline</Badge>
						</div>
					</CardContent>
				</Card>

				<!-- Button Component -->
				<Card>
					<CardHeader>
						<CardTitle>Button</CardTitle>
						<CardDescription>Versatile buttons with multiple variants</CardDescription>
					</CardHeader>
					<CardContent>
						<div class="flex flex-wrap gap-2">
							<Button variant="default" icon={DownloadIcon}>Download</Button>
							<Button variant="outline">Outline</Button>
							<Button size="icon" icon={DownloadIcon} />
						</div>
					</CardContent>
				</Card>

				<!-- Card Component -->
				<Card>
					<CardHeader>
						<CardTitle>Card</CardTitle>
						<CardDescription>Flexible container with sections</CardDescription>
					</CardHeader>
					<CardContent>
						<Card class="mb-4">
							<CardHeader>
								<CardTitle class="text-sm">Sample Card</CardTitle>
							</CardHeader>
							<CardContent class="pt-0">
								<p class="text-xs text-muted-foreground">Card content goes here.</p>
							</CardContent>
						</Card>
					</CardContent>
				</Card>

				<!-- Input Component -->
				<Card>
					<CardHeader>
						<CardTitle>Input</CardTitle>
						<CardDescription>Form inputs with various types</CardDescription>
					</CardHeader>
					<CardContent>
						<div class="space-y-2">
							<Input placeholder="Enter text..." />
							<Input type="email" placeholder="Enter email..." />
						</div>
					</CardContent>
				</Card>

				<!-- View All Components -->
				<Card class="border-dashed">
					<CardContent class="flex flex-col items-center justify-center h-full py-8">
						<h4 class="text-lg font-semibold text-foreground mb-2">View All Components</h4>
						<p class="text-muted-foreground text-center mb-4">Explore our complete collection of components</p>
						<Button href="{base}/components">Browse Components</Button>
					</CardContent>
				</Card>
			</div>
		</div>
	</section>

	<!-- Select Themes Section -->
	<section class="py-16 px-4 bg-muted/30">
		<div class="container mx-auto">
			<h3 class="text-3xl font-bold text-foreground mb-8 text-center">Select Themes</h3>
			
			<div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
				{#each featuredThemes as theme}
					<div class="theme-{theme.id}">
						<Card class="hover:shadow-lg transition-shadow">
							<CardHeader>
								<CardTitle>{theme.name}</CardTitle>
								<CardDescription>{theme.description}</CardDescription>
							</CardHeader>
							<CardContent>
								<!-- Theme preview with actual theme styling -->
								<div class="space-y-3 mb-4">
									<Button class="w-full">Primary Button</Button>
									<div class="flex gap-2">
										<Badge variant="default">Default</Badge>
										<Badge variant="outline">Outline</Badge>
									</div>
									<Input placeholder="Sample input..." />
								</div>
								
								<div class="space-y-2">
									<Button 
										variant="outline"
										class="w-full"
										on:click={() => switchTheme(theme.id)}
									>
										Preview Theme
									</Button>
									<code class="text-xs bg-muted px-2 py-1 rounded font-mono block text-center">
										{theme.id}-theme
									</code>
								</div>
							</CardContent>
						</Card>
					</div>
				{/each}
			</div>
			
			<div class="text-center mt-8">
				<Button href="{base}/themes" variant="outline">View All Themes</Button>
			</div>
		</div>
	</section>

	<!-- Features Section -->
	<section class="py-16 px-4">
		<div class="container mx-auto">
			<h3 class="text-3xl font-bold text-foreground mb-8 text-center">Why Use Our Registry?</h3>
			
			<div class="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
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
					<p class="text-muted-foreground">Install components with a single CLI command using shadcn-svelte.</p>
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
	/* Theme-specific styling for theme preview cards */
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
		--secondary: oklch(0.91 0 0);
		--secondary-foreground: oklch(0.32 0 0);
		--accent: oklch(0.81 0 0);
		--accent-foreground: oklch(0.32 0 0);
		--destructive: oklch(0.56 0.19 25.86);
		--destructive-foreground: oklch(1.00 0 0);
		--input: oklch(0.91 0 0);
		--ring: oklch(0.49 0 0);
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
		--secondary: oklch(0.95 0.01 220);
		--secondary-foreground: oklch(0.15 0.01 220);
		--accent: oklch(0.95 0.01 220);
		--accent-foreground: oklch(0.15 0.01 220);
		--destructive: oklch(0.576 0.196 17.38);
		--destructive-foreground: oklch(0.99 0.002 247.839);
		--input: oklch(0.9 0.01 220);
		--ring: oklch(0.25 0.05 220);
	}
	
	:global(.theme-zinc) {
		--radius: 0.5rem;
		--background: oklch(0.98 0 0);
		--foreground: oklch(0.25 0 0);
		--primary: oklch(0.45 0.02 240);
		--primary-foreground: oklch(0.98 0 0);
		--secondary: oklch(0.85 0.01 240);
		--secondary-foreground: oklch(0.25 0 0);
		--muted: oklch(0.92 0 0);
		--muted-foreground: oklch(0.55 0 0);
		--accent: oklch(0.75 0.03 240);
		--accent-foreground: oklch(0.25 0 0);
		--card: oklch(0.99 0 0);
		--card-foreground: oklch(0.25 0 0);
		--border: oklch(0.88 0 0);
		--destructive: oklch(0.60 0.20 25);
		--destructive-foreground: oklch(0.98 0 0);
		--input: oklch(0.88 0 0);
		--ring: oklch(0.45 0.02 240);
	}
	
	:global(.theme-slate) {
		--radius: 0.3rem;
		--background: oklch(0.97 0 0);
		--foreground: oklch(0.20 0 0);
		--primary: oklch(0.40 0.03 250);
		--primary-foreground: oklch(0.97 0 0);
		--secondary: oklch(0.80 0.02 250);
		--secondary-foreground: oklch(0.20 0 0);
		--muted: oklch(0.90 0.01 250);
		--muted-foreground: oklch(0.50 0 0);
		--accent: oklch(0.60 0.05 250);
		--accent-foreground: oklch(0.20 0 0);
		--card: oklch(0.98 0 0);
		--card-foreground: oklch(0.20 0 0);
		--border: oklch(0.85 0.01 250);
		--destructive: oklch(0.58 0.18 25);
		--destructive-foreground: oklch(0.97 0 0);
		--input: oklch(0.85 0.01 250);
		--ring: oklch(0.40 0.03 250);
	}
	
	:global(.theme-rose) {
		--radius: 0.5rem;
		--background: oklch(0.99 0 0);
		--foreground: oklch(0.22 0 0);
		--primary: oklch(0.65 0.15 10);
		--primary-foreground: oklch(0.99 0 0);
		--secondary: oklch(0.90 0.05 10);
		--secondary-foreground: oklch(0.22 0 0);
		--muted: oklch(0.95 0.02 10);
		--muted-foreground: oklch(0.52 0 0);
		--accent: oklch(0.75 0.10 10);
		--accent-foreground: oklch(0.22 0 0);
		--card: oklch(1.00 0 0);
		--card-foreground: oklch(0.22 0 0);
		--border: oklch(0.92 0.02 10);
		--destructive: oklch(0.62 0.22 25);
		--destructive-foreground: oklch(0.99 0 0);
		--input: oklch(0.92 0.02 10);
		--ring: oklch(0.65 0.15 10);
	}
	
	:global(.theme-emerald) {
		--radius: 0.4rem;
		--background: oklch(0.98 0 0);
		--foreground: oklch(0.23 0 0);
		--primary: oklch(0.55 0.15 150);
		--primary-foreground: oklch(0.98 0 0);
		--secondary: oklch(0.85 0.05 150);
		--secondary-foreground: oklch(0.23 0 0);
		--muted: oklch(0.92 0.03 150);
		--muted-foreground: oklch(0.53 0 0);
		--accent: oklch(0.70 0.10 150);
		--accent-foreground: oklch(0.23 0 0);
		--card: oklch(0.99 0 0);
		--card-foreground: oklch(0.23 0 0);
		--border: oklch(0.88 0.03 150);
		--destructive: oklch(0.59 0.21 25);
		--destructive-foreground: oklch(0.98 0 0);
		--input: oklch(0.88 0.03 150);
		--ring: oklch(0.55 0.15 150);
	}
</style>
